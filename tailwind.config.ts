
import { join } from 'path';
import type { Config } from 'tailwindcss';

import { skeleton } from '@skeletonlabs/tw-plugin';
import { myCustomTheme } from './my-custom-theme'
const colorsNumbers = Array.from({ length: 9 }, (_, i) => (i + 1) * 100);
const config = {
	darkMode: 'selector',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve(
				'@skeletonlabs/skeleton'),
			'../**/*.{html,js,svelte,ts}'
		)
	],
	theme: {
		extend: {},
	},
	safelist: ["hover:text-teal-600",...colorsNumbers.map((color) => `bg-secondary-${color}`)],
	plugins: [
		skeleton({
			themes: {
				preset:["modern"],
				custom: [
					myCustomTheme
				]
			}
		})
	]
} satisfies Config;

export default config;
