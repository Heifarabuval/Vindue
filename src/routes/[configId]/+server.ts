import * as fs from 'fs';

export async function GET({params}) {
	if (params.configId === 'favicon.ico') {
		return new Response(null, {
			status: 404
		});
	}
	const configId = params.configId;
	try {
		const data = await fs.promises.readFile(`./dist/${configId}/bundle.js`, 'utf8');
		return new Response(data, {
			headers: {
				'content-type': 'text/javascript'
			}
		});
	} catch (error) {
		console.error('Une erreur est survenue lors de la lecture du fichier :', error);
		return new Response('File not found', {
			status: 404
		});
	}
}
