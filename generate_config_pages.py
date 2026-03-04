import re
import sys
import os


def extract_properties_with_comments(yaml_file_path):
    properties = {}

    with open(yaml_file_path, 'r') as file:
        lines = file.readlines()
        index = 0
        key_level_map = {0: ''}
        parse_line('', '', key_level_map, 0, index, lines, properties)

    return properties


def parse_line(table_name, comment, key_level_map, parent_line_level, index, lines, properties):
    if index >= len(lines):
        return
    line = lines[index]
    line_level = (len(line) - len(line.lstrip())) if line.strip() else 0
    line = line.strip()
    # if line is empty - parse next line
    if not line:
        index = index + 1
        parse_line(table_name, comment, key_level_map, line_level, index, lines, properties)
    # if line is a comment - save comment and parse next line
    else:
        if line_level == 0:
            key_level_map = {0: ''}
        if line.startswith('#'):
            if line_level == 0:
                table_name = line.lstrip('#')
            elif line_level == parent_line_level:
                comment = comment + '\n' + line.lstrip('#') if comment else line.lstrip('#')
            else:
                comment = line.lstrip('#')
            index = index + 1
            parse_line(table_name, comment, key_level_map, line_level, index, lines, properties)
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
                    properties[current_key] = (value, comment, table_name)
                    comment = ''
                index = index + 1
                parse_line(table_name, comment, key_level_map, line_level, index, lines, properties)


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
        if match is not None:
            rows.append((property_name, match.group(1), match.group(2), comment, value[2]))
        else:
            rows.append((property_name, "", value[0].split('#')[0], comment, value[2]))
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


def generate_section(table_name, rows):
    html = f'## {table_name.strip()}\n\n'
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
        property_name, env_variable, default_value, comment, table_name = row

        if table_name not in property_groups:
            property_groups[table_name] = []

        property_groups[table_name].append(row)

    return property_groups


def update_page(input_file, output_file, sidebar_label):
    properties = extract_properties_with_comments(input_file)
    property_info = extract_property_info(properties)
    property_groups = group_properties_by_table(property_info)

    content = ''
    for group in property_groups:
        content += generate_section(group, property_groups[group]) + '\n'

    os.makedirs(os.path.dirname(os.path.abspath(output_file)), exist_ok=True)
    with open(output_file, 'w') as f:
        f.write(f'---\ntitle: {sidebar_label} Configuration\nsidebar:\n  label: {sidebar_label}\n---\n\n')
        f.write(content)

    print(f"Generated {output_file} from {input_file}")


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
    elif tb_repo_type.lower() == "tbmq":
        update_page(tb_repo_abs_path + "/application/src/main/resources/thingsboard-mqtt-broker.yml",
                    "src/content/docs/docs/mqtt-broker/installation/config.mdx",
                    "TBMQ Configuration")
        update_page(tb_repo_abs_path + "/integration/executor/src/main/resources/tbmq-integration-executor.yml",
                    "src/content/docs/docs/mqtt-broker/installation/ie-config.mdx",
                    "TBMQ Integration Executor Configuration")
    elif tb_repo_type.lower() == "tbmq-pe":
        update_page(tb_repo_abs_path + "/application/src/main/resources/thingsboard-mqtt-broker.yml",
                    "src/content/docs/docs/mqtt-broker/pe/installation/config.mdx",
                    "TBMQ PE Configuration")
        update_page(tb_repo_abs_path + "/integration/executor/src/main/resources/tbmq-integration-executor.yml",
                    "src/content/docs/docs/mqtt-broker/pe/installation/ie-config.mdx",
                    "TBMQ PE Integration Executor Configuration")
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
