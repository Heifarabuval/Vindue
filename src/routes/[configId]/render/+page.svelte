<script lang="ts">
	import { Doc } from 'sveltefire';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import incrementCounter from '$lib/services/counter.js';


	const handleClose = () => {
		window.parent.postMessage('close-modal', '*');
	};

	onMount(() => {
		if ($page.params.configId) {
			incrementCounter($page.params.configId, 'views');
		}});

</script>

<Doc ref="configurations/{$page.params.configId}" let:data={configuration}>
	<div style={"background-color:"+configuration.color} class="h-[100vh] bg-primary-500 p-3">
		<button on:click|preventDefault={handleClose} id="close-modal" class="bg-primary-300 text-white p-2 rounded-md">
			<Doc ref="counter/{$page.params.configId}" let:data={counter}>
				{counter.views}
			</Doc>
		</button>
		{configuration.name}
	</div>
</Doc>

