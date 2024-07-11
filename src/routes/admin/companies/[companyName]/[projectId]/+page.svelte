<script lang="ts">
	import { page } from '$app/stores';
	import { Doc } from 'sveltefire';
	import type { Configuration } from '$lib/models/Configuration';
	import { configurationService } from '$lib/services/configuration';
	import { flip } from 'svelte/animate';
	import { crossfade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';


	const configuration: Configuration = {
		name: '',
		steps: []
	};

	function createConfiguration() {
		if (configuration.name === '') return;
		configurationService.createConfiguration(configuration, $page.params.projectId);
	}

	const [send, receive] = crossfade({
		fallback(node) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;
			return {
				duration: 1000,
				easing: quintOut,
				css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t};
				`
			};
		}
	});


</script>

<Doc ref="projects/{$page.params.projectId}" let:data={project}>
	<h1 class="text-2xl text-center my-5">Project {project.name}</h1>
	<form on:submit|preventDefault={createConfiguration}>
		<div class="flex flex-col mx-auto items-center">
			<label class="label my-2 w-1/3">
				<input required bind:value={configuration.name} class="input py-2 px-4" type="text"
							 placeholder="Nom de la configuration" />
			</label>
			<button type="submit"
							class="btn bg-primary-500 hover:bg-primary-700 hover:scale-105 text-white font-bold  rounded">Créer
			</button>
		</div>
	</form>
	{#each project?.configurations || [] as _configuration, i (_configuration)}
		<div class="w-full" animate:flip in:receive={{ key: i }} out:send={{ key:i }}>
			<Doc ref="configurations/{_configuration.id}" let:data={configuration}>
				<div
					class="card drop-shadow shadow-primary-50 shadow-lg border-primary-400 m-3 flex justify-between hover:scale-[101%] transition duration-250 ease-in-out">
					<a class="w-full h-full p-4 m-3" href="{$page.params.projectId}/{_configuration.id}">{configuration.name}</a>
				</div>
			</Doc>
		</div>
	{/each}
</Doc>
