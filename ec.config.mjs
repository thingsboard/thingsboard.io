import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections';
import { pluginMaxLines, pluginWrap } from './config/plugins/expressive-code-max-lines.ts';

export default {
	plugins: [pluginCollapsibleSections(), pluginMaxLines(), pluginWrap()],
};
