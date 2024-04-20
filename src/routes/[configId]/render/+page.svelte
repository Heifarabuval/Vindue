<script lang="ts">
	import { Doc } from 'sveltefire';
	import { page } from '$app/stores';


	const handleClose = () => {
		window.parent.postMessage('close-modal', '*');
	}
</script>

<div class="h-[100vh] bg-primary-500 p-3">
	<button on:click|preventDefault={handleClose} id="close-modal" class="bg-primary-300 text-white p-2 rounded-md">Close</button>
	<Doc ref="configurations/{$page.params.configId}" let:data={configuration}>
		{configuration.title}
	</Doc>
</div>

