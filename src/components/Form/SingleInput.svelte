<script lang="ts">
	import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/index.js';
	import { createEventDispatcher } from 'svelte';
	import Icon from '../Icon.svelte';

	export let inputValue = '';
	export let placeholder = 'New ...';
	const dispatch = createEventDispatcher();

	function handleSubmit() {
		if	(inputValue.trim() === '') return;
		dispatch('submit', {inputValue});
		inputValue = '';
	}

</script>

<form on:submit|preventDefault={handleSubmit} class="flex w-full justify-center m-2 gap-2">
	<label class="label w-1/3">
		<input bind:value={inputValue} class="input p-2" type="text" placeholder={placeholder} />
	</label>
	<button type="submit">
		<Icon icon={faPlusCircle} color="text-secondary-500" size="text-3xl"/>
	</button>
</form>
