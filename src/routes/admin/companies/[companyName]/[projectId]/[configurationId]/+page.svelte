<script lang="ts">
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import type { Container } from '$lib/models/Container';
	import { configurationService } from '$lib/services/configuration';
	import { availableModules } from '$lib/models/Modules';

	const AVAILABLE_LAYOUTS = ['simple', 'double'];

	interface ConfigurationDao {
		name: string;
		steps: { [key: number]: Container[] };
	}

	interface ConfigurationDto {
		name: string;
		steps: { [key: number]: Container };
	}

	enum NumberOfItemsInLayout {
		simple = 1,
		double = 2
	}

	let configuration: ConfigurationDao = {
		name: '',
		steps: {}
	};

	onMount(async () => {
		const fetchedConfig = await configurationService.getDocument($page.params.configurationId);
		configuration = daoToDto(fetchedConfig);
	});

	function updateConfiguration() {
		const flattenedConfiguration = flattenConfiguration(configuration);
		configurationService.updateDocument($page.params.configurationId, flattenedConfiguration);
	}

	function flattenConfiguration(config: ConfigurationDao): ConfigurationDto {
		const steps: ConfigurationDto['steps'] = {};
		Object.keys(config.steps).forEach((stepIndex) => {
			steps[stepIndex as unknown as number] = config.steps[stepIndex as unknown as number][0];
		});
		return { name: config.name, steps };
	}

	function daoToDto(configuration: ConfigurationDao): ConfigurationDao {
		const newSteps: ConfigurationDao['steps'] = {};
		Object.keys(configuration.steps).forEach(stepIndex => {
			newSteps[stepIndex as unknown as number] = [configuration.steps[stepIndex as unknown as number]];
		});
		return { name: configuration.name, steps: newSteps };
	}

	function addStep() {
		const newIndex = Object.keys(configuration.steps).length;
		configuration.steps[newIndex] = [{ id: newIndex, modules: {}, layout: 'simple' }];
	}

	function removeStep(index: number) {
		delete configuration.steps[index];
		const newSteps = Object.values(configuration.steps);
		configuration.steps = {};
		newSteps.forEach((step, i) => {
			configuration.steps[i] = [step[0]];
		});
	}

	function handleModuleChange(stepIndex: number, containerIndex: number, moduleName: string) {
		const newSteps = { ...configuration.steps };
		newSteps[stepIndex][0].modules[containerIndex] = availableModules[moduleName].defaultData;
		configuration.steps = newSteps;
	}

	function moduleSettingsChanged(event: CustomEvent<{ moduleIndex: string; module: any }>) {
		const [stepIndex, containerIndex] = event.detail.moduleIndex.split('-').map(Number);
		configuration.steps[stepIndex][0].modules[containerIndex] = event.detail.module;
	}
</script>

<form on:submit|preventDefault={updateConfiguration}>
	<button type="button" on:click={addStep} class="btn mb-2">+</button>
	<Accordion class="p-6 max-h-[69vh] overflow-y-scroll" autocollapse={true} caretOpen="rotate-180">
		{#each Object.values(configuration.steps) as [step], i}
			<AccordionItem class={`bg-secondary-${100 * (((i + 1) % 10) || 10)} rounded-2xl m-auto opacity-70`}>
				<svelte:fragment slot="summary">
					<div class="flex justify-between">
						<h2>Layout de l'étape {i + 1}</h2>
						<button type="button" on:click={() => removeStep(i)} class="btn btn-danger">x</button>
					</div>
				</svelte:fragment>
				<svelte:fragment slot="content">
					<select bind:value={step.layout} class="select">
						{#each AVAILABLE_LAYOUTS as layout}
							<option value={layout}>{layout}</option>
						{/each}
					</select>
					<div class="flex justify-evenly">
						{#each Array.from({ length: NumberOfItemsInLayout[step.layout] || 1 }) as p, j}
							<div class="bg-gradient-to-b from-surface-300 to-surface-100 p-5 rounded-xl w-full m-4 shadow-lg">
								{#if (step.modules && step.modules[j]?.name)}
									<select value={step.modules[j].name} on:change={(e) => handleModuleChange(i, j, e?.target?.value)}>
										{#each Object.keys(availableModules) as module}
											<option value={module}>{module}</option>
										{/each}
									</select>
									{#if availableModules[step.modules[j].name]}
										{#if availableModules[step.modules[j].name].defaultData}
											<svelte:component on:save={moduleSettingsChanged}
																				this={availableModules[step.modules[j].name].component}
																				moduleSettings={step.modules[j].settings}
																				moduleIndex="{i}-{j}" />
										{/if}
									{/if}
								{:else}
									<select on:change={(e) => handleModuleChange(i, j, e?.target?.value)}>
										<option value="">Select Module</option>
										{#each Object.keys(availableModules) as module}
											<option value={module}>{module}</option>
										{/each}
									</select>
								{/if}
							</div>
						{/each}
					</div>
				</svelte:fragment>
			</AccordionItem>
		{/each}
	</Accordion>
	<div class="text-center mt-4">
		<button type="submit" class="btn bg-primary-500 hover:bg-primary-700 hover:scale-105 text-white font-bold rounded">
			Save
		</button>
	</div>
</form>
