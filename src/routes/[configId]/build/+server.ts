import { rollup, type OutputOptions, type RollupOptions, type InputPluginOption } from 'rollup';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';

async function build(configId: string) {
	const start = Date.now();
	const plugins = [
		typescript(),
		json(),
		terser()
	] as InputPluginOption[];

	const inputOptions = {
		input: 'src/main.ts',
		plugins: plugins,
	} as RollupOptions;

	const outputOptions = [
		{
			file: `dist/${configId}/bundle.js`,
			format: 'iife',
			sourcemap:false,
			plugins: [
				replace({
					__PROPS__: JSON.stringify({ __CONFIG_ID__: configId}),
				})
			]
		},
		{
			file: `dist/${configId}/bundle.min.js`,
			format: 'iife',
			name: 'version',
			sourcemap:false,
			plugins:
				[
					terser(),
					replace({
						CONFIG_ID: JSON.stringify(configId),
					})
				]
		},
	] as OutputOptions[];

	const bundle = await rollup(inputOptions);
	await Promise.all(outputOptions.map(options => bundle.write(options)));
	return 'Build successful in ' + (Date.now() - start) + 'ms';
}

export async function GET({ params }) {
	async function createIframeWrapper() {
		return await build(params.configId);
	}


	return new Response(await createIframeWrapper(), {
		headers: {
			'content-type': 'text/html'
		}
	});
}
