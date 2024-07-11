<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { InputChip } from '@skeletonlabs/skeleton';
	import type { Field } from '$lib/interfaces/Field';

	const FIELD_TYPES = ['text', 'number', 'email', 'password', 'tel', 'button', 'radio'];
	const INPUT_TYPES = ['text', 'number', 'email', 'password', 'tel'];

	export let field:Field;
	export let index:number
	export let radioList: string[];

	let fieldTypes: string[] = FIELD_TYPES;
	let inputsTypes: string[] = INPUT_TYPES;

	const dispatch = createEventDispatcher();

	function handleRemove() {
		dispatch('remove', index);
	}

</script>

<div class="shadow-2xl min-w-52 w-full p-6 rounded-md m-4 flex-col flex justify-evenly gap-1 {field.type!=='button'?'bg-secondary-50':'bg-primary-300'}">
	<div>
		<label for="type-{index}" class="block font-bold">Type:</label>
		<select id="type-{index}" bind:value={field.type} class="block w-full mt-1 p-2 border border-gray-300 rounded">
			{#each fieldTypes as type}
				<option value={type}>{type}</option>
			{/each}
		</select>
	</div>

	<div>
		<label for="name-{index}" class="block font-bold">Name:</label>
		<input id="name-{index}" type="text" bind:value={field.name} class="block w-full mt-1 p-2 border border-gray-300 rounded" />
	</div>

	{#if inputsTypes.includes(field.type)}
		<div>
			<label for="placeholder-{index}" class="block font-bold">Placeholder:</label>
			<input id="placeholder-{index}" type="text" bind:value={field.placeholder} class="block w-full mt-1 p-2 border border-gray-300 rounded" />
		</div>

		<div class="flex items-center">
			<label for="required-{index}" class="block font-bold">Required:</label>
			<input id="required-{index}" type="checkbox" bind:checked={field.required} class="ml-2" />
		</div>

		<div>
			<label for="minLength-{index}" class="block font-bold">Min Length:</label>
			<input id="minLength-{index}" type="number" bind:value={field.minLength} class="block w-full mt-1 p-2 border border-gray-300 rounded" />
		</div>

		<div>
			<label for="maxLength-{index}" class="block font-bold">Max Length:</label>
			<input id="maxLength-{index}" type="number" bind:value={field.maxLength} class="block w-full mt-1 p-2 border border-gray-300 rounded" />
		</div>
	{:else if field.type === 'button'}
		<div>
			<label for="text-{index}" class="block font-bold">Text</label>
			<input id="text-{index}" type="text" bind:value={field.value} class="block w-full mt-1 p-2 border border-gray-300 rounded" />
		</div>
	{:else if field.type === 'radio'}
		<InputChip bind:value={radioList} name="chips" placeholder="Enter any value..." />
		<div>
			<label for="defaultRadio-{index}" class="block font-bold">Default Radio:</label>
			<select bind:value={field.defaultRadio} name="defaultRadio-{index}" class="block w-full mt-1 p-2 border border-gray-300 rounded">
				{#each radioList as radio}
					<option value={radio}>{radio}</option>
				{/each}
			</select>
		</div>
	{/if}
	<button type="button" on:click={handleRemove} class="btn bg-red-500 text-white py-2 px-4 rounded my-3">-</button>
</div>

<style>
    .btn {
        cursor: pointer;
    }
</style>
