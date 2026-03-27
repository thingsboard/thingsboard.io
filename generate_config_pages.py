import re
import sys
import os


def extract_properties_with_comments(yaml_file_path):
    properties = {}

    with open(yaml_file_path, 'r') as file:
        lines = file.readlines()
        index = 0
        key_level_map = {0: ''}
        parse_line('', '', '', key_level_map, 0, index, lines, properties)

    return properties


def parse_line(table_name, table_description, comment, key_level_map, parent_line_level, index, lines, properties, has_section_properties=False, after_empty_comment=False):
    if index >= len(lines):
        return
    line = lines[index]
    line_level = (len(line) - len(line.lstrip())) if line.strip() else 0
    line = line.strip()
    # if line is empty - parse next line
    if not line:
        index = index + 1
        parse_line(table_name, table_description, comment, key_level_map, line_level, index, lines, properties, has_section_properties, after_empty_comment)
    # if line is a comment - save comment and parse next line
    else:
        if line_level == 0:
            key_level_map = {0: ''}
        if line.startswith('#'):
            if line_level == 0:
                comment_text = line.lstrip('#')
                if not comment_text.strip():
                    # Empty '#' line — next level-0 comment must start a new section
                    index = index + 1
                    parse_line(table_name, table_description, comment, key_level_map, line_level, index, lines, properties, has_section_properties, after_empty_comment=True)
                    return
                if has_section_properties or table_description or after_empty_comment:
                    # Properties already seen, description already set, or preceded by an empty
                    # comment line — this comment starts a new section
                    table_name = comment_text
                    table_description = ''
                    has_section_properties = False
                elif table_name:
                    # Name set, no description, no properties yet — this is the description
                    table_description = comment_text
                else:
                    # Nothing set yet — this line is the section name
                    table_name = comment_text
                after_empty_comment = False
            elif line_level == parent_line_level:
                comment = comment + '\n' + line.lstrip('#') if comment else line.lstrip('#')
            else:
                comment = line.lstrip('#')
            index = index + 1
            parse_line(table_name, table_description, comment, key_level_map, line_level, index, lines, properties, has_section_properties, after_empty_comment=False)
        else:
            # Check if it's a property line
            if ':' in line:
                # clean comment if level was changed
                if line_level != parent_line_level:
                    comment = ''
                key, value = line.split(':', 1)
                if key.startswith('- '):
                    key = key.lstrip('- ')
                key_level_map[line_level] = key
                value = value.strip()
                if value.split('#')[0]:
                    current_key = ''
                    for k in key_level_map.keys():
                        if k <= line_level:
                            current_key = ((current_key + '.') if current_key else '') + key_level_map[k]
                    properties[current_key] = (value, comment, table_name, table_description)
                    comment = ''
                    has_section_properties = True
                index = index + 1
                parse_line(table_name, table_description, comment, key_level_map, line_level, index, lines, properties, has_section_properties)


def extract_property_info(properties):
    rows = []
    for property_name, value in properties.items():
        if '#' in value[0]:
            value_parts = value[0].split('#')
            comment = value_parts[1]
        else:
            comment = value[1]
        pattern = r'\"\$\{(.*?)\:(.*?)\}\"'
        match = re.match(pattern, value[0])
        table_description = value[3]
        if match is not None:
            rows.append((property_name, match.group(1), match.group(2), comment, value[2], table_description))
        else:
            rows.append((property_name, "", value[0].split('#')[0], comment, value[2], table_description))
    return rows


_HTML_TAG_RE = re.compile(
    r'(</?(?:ul|ol|li|br|p|b|strong|em|i)(?:\s[^>]*)?>)',
    re.IGNORECASE,
)


def escape_cell(text):
    text = str(text).replace('\n', ' ').strip()
    # Normalize <br> to JSX-compatible self-closing form
    text = re.sub(r'<br\s*/?>', '<br />', text, flags=re.IGNORECASE)
    # Split on known safe HTML tags; preserve them, escape everything else
    parts = _HTML_TAG_RE.split(text)
    result = []
    for i, part in enumerate(parts):
        if i % 2 == 1:  # captured HTML tag — preserve as-is
            result.append(part)
        else:            # plain text — escape MDX-special characters
            result.append(
                part
                .replace('&', '&amp;')
                .replace('<', '&lt;')
                .replace('>', '&gt;')
                .replace('{', '&#123;')
                .replace('}', '&#125;')
                .replace('_', '&#95;')
                .replace('*', '&#42;')
            )
    return ''.join(result)


def generate_section(table_name, rows, product='ce'):
    if not any(row[1] for row in rows):
        return ''
    html = f'## {table_name.strip()}\n\n'
    table_description = rows[0][5].strip() if rows and len(rows[0]) > 5 else ''
    if table_description:
        html += f'<Banner variant="{product}">{escape_cell(table_description)}</Banner>\n\n'
    html += '<div class="config-def-list">\n'
    for row in rows:
        _, env_var, default_val, description = [escape_cell(c) for c in row[:4]]
        if not env_var:
            continue
        html += '  <div class="config-def-item">\n'
        meta_parts = []
        if env_var:
            meta_parts.append(f'<code class="config-def-env">{env_var}</code>')
        if default_val:
            meta_parts.append(f'<span class="config-def-label">Default</span> <code>{default_val}</code>')
        if meta_parts:
            html += f'    <p class="config-def-meta">{" · ".join(meta_parts)}</p>\n'
        if description:
            html += f'    <p class="config-def-desc">{description}</p>\n'
        html += '  </div>\n'
    html += '</div>\n'
    return html


def group_properties_by_table(data):
    property_groups = {}

    for row in data:
        table_name = row[4]

        if table_name not in property_groups:
            property_groups[table_name] = []

        property_groups[table_name].append(row)

    return property_groups


def _find_section(key, default_props):
    """Find the (table_name, table_description) for a key by checking ancestors then siblings in default_props."""
    parts = key.split('.')
    # Walk up the key hierarchy looking for a direct match
    for length in range(len(parts), 0, -1):
        prefix = '.'.join(parts[:length])
        if prefix in default_props:
            return default_props[prefix][2], default_props[prefix][3]
    # Fall back to any sibling under the same parent prefix
    for length in range(len(parts) - 1, 0, -1):
        prefix = '.'.join(parts[:length]) + '.'
        for k, v in default_props.items():
            if k.startswith(prefix):
                return v[2], v[3]
    return '', ''


def _detect_product(output_file):
    """Detect the Banner variant from the output file path."""
    if '/pe/' in output_file:
        return 'pe'
    if '/trendz/' in output_file:
        return 'trendz'
    return 'ce'


def update_page(input_file, output_file, sidebar_label):
    properties = extract_properties_with_comments(input_file)
    property_info = extract_property_info(properties)
    property_groups = group_properties_by_table(property_info)
    product = _detect_product(output_file)

    content = ''
    for group in property_groups:
        section = generate_section(group, property_groups[group], product)
        if section:
            content += section + '\n'

    os.makedirs(os.path.dirname(os.path.abspath(output_file)), exist_ok=True)
    with open(output_file, 'w') as f:
        f.write(f'---\ntitle: {sidebar_label} Configuration\nsidebar:\n  label: {sidebar_label}\n---\n\nimport Banner from \'~/components/Banner.astro\';\n\n')
        f.write(content)

    print(f"Generated {output_file} from {input_file}")


def update_page_from_config(config_dir, output_file, sidebar_label):
    """Like update_page, but reads from two separate node-config files:
    - default.yml: default values and descriptions (inline or block comments)
    - custom-environment-variables.yml: environment variable names
    """
    default_file = os.path.join(config_dir, 'default.yml')
    env_file = os.path.join(config_dir, 'custom-environment-variables.yml')

    default_props = extract_properties_with_comments(default_file)
    env_props = extract_properties_with_comments(env_file)

    rows = []
    for key, env_data in env_props.items():
        # env_data[0] is the raw value, e.g. '"TB_QUEUE_TYPE" #kafka (Apache Kafka)'
        env_var = env_data[0].split('#')[0].strip().strip('"')
        if not env_var:
            continue

        if key in default_props:
            def_raw, def_comment, table_name, table_description = default_props[key]
            if '#' in def_raw:
                val_part, desc_part = def_raw.split('#', 1)
                default_val = val_part.strip().strip('"')
                description = desc_part.strip()
            else:
                default_val = def_raw.strip().strip('"')
                description = def_comment
        else:
            default_val = ''
            description = ''
            table_name, table_description = _find_section(key, default_props)

        rows.append((key, env_var, default_val, description, table_name, table_description))

    property_groups = group_properties_by_table(rows)
    product = _detect_product(output_file)

    content = ''
    for group in property_groups:
        section = generate_section(group, property_groups[group], product)
        if section:
            content += section + '\n'

    os.makedirs(os.path.dirname(os.path.abspath(output_file)), exist_ok=True)
    with open(output_file, 'w') as f:
        f.write(f'---\ntitle: {sidebar_label} Configuration\nsidebar:\n  label: {sidebar_label}\n---\n\nimport Banner from \'~/components/Banner.astro\';\n\n')
        f.write(content)

    print(f"Generated {output_file} from {config_dir}")


if __name__ == '__main__':
    sys.setrecursionlimit(10000)
    tb_repo_type = sys.argv[1]
    tb_repo_rel_path = sys.argv[2]

    script_dir = os.path.dirname(__file__)
    tb_repo_abs_path = os.path.join(script_dir, tb_repo_rel_path)

    if tb_repo_type.lower() == "pe":
        update_page(tb_repo_abs_path + "/application/src/main/resources/thingsboard.yml",
                    "src/content/docs/docs/pe/reference/configuration/core-rule-engine-config.mdx",
                    "Core and Rule Engine")
        update_page(tb_repo_abs_path + "/transport/http/src/main/resources/tb-http-transport.yml",
                    "src/content/docs/docs/pe/reference/configuration/http-transport-config.mdx",
                    "HTTP Transport")
        update_page(tb_repo_abs_path + "/transport/mqtt/src/main/resources/tb-mqtt-transport.yml",
                    "src/content/docs/docs/pe/reference/configuration/mqtt-transport-config.mdx",
                    "MQTT Transport")
        update_page(tb_repo_abs_path + "/transport/coap/src/main/resources/tb-coap-transport.yml",
                    "src/content/docs/docs/pe/reference/configuration/coap-transport-config.mdx",
                    "CoAP Transport")
        update_page(tb_repo_abs_path + "/transport/lwm2m/src/main/resources/tb-lwm2m-transport.yml",
                    "src/content/docs/docs/pe/reference/configuration/lwm2m-transport-config.mdx",
                    "LwM2M Transport")
        update_page(tb_repo_abs_path + "/transport/snmp/src/main/resources/tb-snmp-transport.yml",
                    "src/content/docs/docs/pe/reference/configuration/snmp-transport-config.mdx",
                    "SNMP Transport")
        update_page(tb_repo_abs_path + "/msa/vc-executor/src/main/resources/tb-vc-executor.yml",
                    "src/content/docs/docs/pe/reference/configuration/vc-executor-config.mdx",
                    "VC Executor")
        update_page_from_config(tb_repo_abs_path + "/msa/js-executor/config",
                    "src/content/docs/docs/pe/reference/configuration/js-executor-config.mdx",
                    "JS Executor")
        update_page(tb_repo_abs_path + "/integration/executor/src/main/resources/tb-integration-executor.yml",
                    "src/content/docs/docs/pe/reference/configuration/ie-executor-config.mdx",
                    "Integration Executor")
        update_page(tb_repo_abs_path + "/report/src/main/resources/tb-report.yml",
                    "src/content/docs/docs/pe/reference/configuration/report-service-config.mdx",
                    "Report Service")
    elif tb_repo_type.lower() == "ce":
        update_page(tb_repo_abs_path + "/application/src/main/resources/thingsboard.yml",
                    "src/content/docs/docs/reference/configuration/core-rule-engine-config.mdx",
                    "Core and Rule Engine")
        update_page(tb_repo_abs_path + "/transport/http/src/main/resources/tb-http-transport.yml",
                    "src/content/docs/docs/reference/configuration/http-transport-config.mdx",
                    "HTTP Transport")
        update_page(tb_repo_abs_path + "/transport/mqtt/src/main/resources/tb-mqtt-transport.yml",
                    "src/content/docs/docs/reference/configuration/mqtt-transport-config.mdx",
                    "MQTT Transport")
        update_page(tb_repo_abs_path + "/transport/coap/src/main/resources/tb-coap-transport.yml",
                    "src/content/docs/docs/reference/configuration/coap-transport-config.mdx",
                    "CoAP Transport")
        update_page(tb_repo_abs_path + "/transport/lwm2m/src/main/resources/tb-lwm2m-transport.yml",
                    "src/content/docs/docs/reference/configuration/lwm2m-transport-config.mdx",
                    "LwM2M Transport")
        update_page(tb_repo_abs_path + "/transport/snmp/src/main/resources/tb-snmp-transport.yml",
                    "src/content/docs/docs/reference/configuration/snmp-transport-config.mdx",
                    "SNMP Transport")
        update_page(tb_repo_abs_path + "/msa/vc-executor/src/main/resources/tb-vc-executor.yml",
                    "src/content/docs/docs/reference/configuration/vc-executor-config.mdx",
                    "VC Executor")
        update_page_from_config(tb_repo_abs_path + "/msa/js-executor/config",
                    "src/content/docs/docs/reference/configuration/js-executor-config.mdx",
                    "JS Executor")
    elif tb_repo_type.lower() == "tbmq":
        update_page(tb_repo_abs_path + "/application/src/main/resources/thingsboard-mqtt-broker.yml",
                    "src/content/_includes/docs/mqtt-broker/install/config.mdx",
                    "TBMQ Configuration")
        update_page(tb_repo_abs_path + "/integration/executor/src/main/resources/tbmq-integration-executor.yml",
                    "src/content/_includes/docs/mqtt-broker/install/ie-config.mdx",
                    "Integration Executor Configuration")
    elif tb_repo_type.lower() == "tbmq-pe":
        update_page(tb_repo_abs_path + "/application/src/main/resources/thingsboard-mqtt-broker.yml",
                    "src/content/_includes/docs/mqtt-broker/pe/install/config.mdx",
                    "TBMQ Configuration")
        update_page(tb_repo_abs_path + "/integration/executor/src/main/resources/tbmq-integration-executor.yml",
                    "src/content/_includes/docs/mqtt-broker/pe/install/ie-config.mdx",
                    "Integration Executor Configuration")
    elif tb_repo_type.lower() == "edge":
        update_page(tb_repo_abs_path + "/application/src/main/resources/tb-edge.yml",
                    "src/content/docs/docs/edge/installation/config.mdx",
                    "Edge Configuration")
    elif tb_repo_type.lower() == "edge-pe":
        update_page(tb_repo_abs_path + "/application/src/main/resources/tb-edge.yml",
                    "src/content/docs/docs/edge/pe/installation/config.mdx",
                    "Edge PE Configuration")
    else:
        print("Invalid 'tb_repo_type'. Please provide 'ce', 'pe', 'tbmq', 'tbmq-pe', 'edge', or 'edge-pe' as the first argument.")
