import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections';
import { pluginMaxLines, pluginWrap, pluginDownload } from './config/plugins/expressive-code-max-lines.mjs';

export default {
	plugins: [pluginCollapsibleSections(), pluginMaxLines(), pluginWrap(), pluginDownload()],
};
