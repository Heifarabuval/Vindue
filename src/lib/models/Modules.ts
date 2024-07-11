import type { Module } from './Module';
import FormVideoModule from '../../components/Form/modules/FormVideoModule.svelte';
import FormFormModule from '../../components/Form/modules/form/FormFormModule.svelte';
import FormCustomCode from '../../components/Form/modules/FormCustomCode.svelte';

export const formModule: Module = {
	name: 'Form',
	settings: {
		fields: [
			{ name: 'Email', placeholder: 'adresse mail', type: 'text', required: true },
			{ name: 'age', placeholder: 'Âge de l\'utilisateur', type: 'number', required: true }
		]
	}
};


export const videoModule: Module = {
	name: 'Video',
	settings: {
		url: 'https://www.youtube.com/watch?v=6n3pFFPSlW4',
		autoplay: true
	}
};

export const codeModule: Module = {
	name: 'Code',
	settings: {
		code: '<script>alert("Hello World")</script>',
	}
}


export const availableModules = {
	Video: { component: FormVideoModule, defaultData: videoModule },
	Form: { component: FormFormModule, defaultData: formModule },
	Code: { component: FormCustomCode, defaultData: codeModule }
};