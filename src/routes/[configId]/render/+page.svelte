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
		}
	});

	const calculateMargin = (align: string): string => {
		switch (align) {
			case 'top':
				return '0 auto auto auto';
			case 'bottom':
				return 'auto auto 0 auto';
			case 'left':
				return 'auto auto auto 0';
			case 'right':
				return 'auto 0 auto auto';
			case 'center':
				return 'auto';
			default:
				return 'auto';
		}
	};
</script>

<style>
    .dynamic-background {
        background-color: var(--background-color);
    }

		.dynamic-height {
			height: var(--height);
		}

		.dynamic-width {
			width: var(--width);
		}

		.dynamic-margin {
			margin: var(--margin);
		}
</style>

<Doc ref="configurations/{$page.params.configId}" let:data={configuration}>
	<div class="dynamic-background dynamic-height dynamic-width dynamic-margin" style="--background-color: {configuration.mainSettings.backgroundColor}; --height: {configuration.mainSettings.height}vh; --width: {configuration.mainSettings.width}vw; --margin: {calculateMargin(configuration.mainSettings.alignment)}">
		<button on:click|preventDefault={handleClose} id="close-modal" class="bg-primary-300 text-white p-2 rounded-md">
			<Doc ref="counter/{$page.params.configId}" let:data={counter}>
				{counter.views}
			</Doc>
		</button>
		{configuration.name}
	</div>
</Doc>

