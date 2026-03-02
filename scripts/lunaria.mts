import { lunaria } from '@lunariajs/core';
import { validateConfig, type LunariaUserConfig } from '@lunariajs/core/config';
import { mkdirSync, writeFileSync } from 'node:fs';
import { Page, SvgSummary } from './lunaria/components.ts';
import rawConfig from '../lunaria.config.ts';

const userConfig = rawConfig as unknown as LunariaUserConfig;
const config = validateConfig(userConfig);
const status = await lunaria(userConfig);

const html = Page(config, status);
const svg = SvgSummary(config, status);

mkdirSync('dist/lunaria', { recursive: true });
writeFileSync('dist/lunaria/index.html', html);
writeFileSync('dist/lunaria/summary.svg', svg);
