<script lang="ts">

	import type { Module } from '$lib/models/Module';
	import { createEventDispatcher } from 'svelte';

	export let moduleIndex: string
	export let moduleSettings = {
		url: '',
		autoplay: true
	};

	let dispatch = createEventDispatcher();

	 let module: Module = {
		name: 'Video',
		settings: moduleSettings
	};

	 function save() {
		 dispatch('save', { module, moduleIndex });
	 }
</script>


<form style="display: flex !important;" on:change|preventDefault={save} class="flex-col justify-evenly h-full p-4">
	<label for="url" class="label">
		<span>URL:</span>
		<input id="url" type="text" bind:value={module.settings.url} class="input u-full-width" />
	</label>


	<label for="autoplay" class="label">
		<span>Autoplay:</span>
		<input id="autoplay" type="checkbox" bind:checked={module.settings.autoplay} class="u-pull-right" />
	</label>
</form>


<style>
	span {
		font-weight: bold;
	}
</style>
