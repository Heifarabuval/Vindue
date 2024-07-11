<script lang="ts">

	import type { Module } from '$lib/models/Module';
	import { createEventDispatcher } from 'svelte';
	import CodeMirror from "svelte-codemirror-editor";
	import {html} from '@codemirror/lang-html';
	import { oneDark } from "@codemirror/theme-one-dark";


	export let moduleIndex: string
	export let moduleSettings = {
		code: ''
	};

	let dispatch = createEventDispatcher();

	let module: Module = {
		name: 'CustomCode',
		settings: moduleSettings
	};



	function save() {
		dispatch('save', { module, moduleIndex });
	}
</script>


<form style="display: flex !important;" on:change|preventDefault={save} class="flex-col justify-evenly h-full p-4">
	<label for="code" class="label">
		<span>HTML or JS code</span>
		<CodeMirror bind:value={moduleSettings.code} lang={html()} theme={oneDark} />
	</label>
</form>

