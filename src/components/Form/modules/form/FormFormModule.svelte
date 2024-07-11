<script lang="ts">
	import type { Module } from '$lib/models/Module';
	import type { Field } from '$lib/interfaces/Field';
	import { createEventDispatcher } from 'svelte';
	import FieldItem from './FieldItem.svelte';

	export let moduleSettings: { fields: Field[] } = { fields: [] };
	export let moduleIndex: string;

	let module: Module = {
		name: 'Form',
		settings: moduleSettings
	};

	let radioList: string[] = [];


	const dispatch = createEventDispatcher();

	function addField() {
		module.settings.fields = [
			...module.settings.fields,
			{
				name: '',
				placeholder: '',
				type: 'text',
				required: false,
				minLength: null,
				maxLength: null
			}
		];
	}

	function removeField(index: number) {
		module.settings.fields = module.settings.fields.filter((_, i) => i !== index);
	}

	function removeUselessData(types: string[], fields: Field[], properties: string[]) {
		fields.forEach(field => {
			if (types.includes(field.type)) {
				properties.forEach(property => {
					delete field[property];
				});
			}
		});
	}

	function save() {
		removeUselessData(['radio', 'button'], module.settings.fields, ['placeholder', 'required', 'minLength', 'maxLength']);

		module.settings.fields.forEach((field: any) => {
			if (field.type === 'radio') {
				field.radioList = radioList;
			}
		});

		dispatch('save', { module, moduleIndex });
	}

	$: {
		module = { name: 'Form', settings: moduleSettings };
		radioList = moduleSettings.fields?.find(field => field.type === 'radio')?.radioList || [];
	}
</script>

<div class="p-4 overflow-scroll">
	<button type="button" on:click={addField} class="btn mb-2 bg-blue-500 text-white py-2 px-4 rounded">+</button>
	<form on:change|preventDefault={save} class="flex overflow-scroll max-w-[70vw]">
		{#each module?.settings?.fields || [] as field, index}
			<FieldItem
				{field}
				{index}
				{radioList}
				on:remove={() => removeField(index)}
			/>
		{/each}
	</form>
</div>

<style>
    .btn {
        cursor: pointer;
    }
</style>
