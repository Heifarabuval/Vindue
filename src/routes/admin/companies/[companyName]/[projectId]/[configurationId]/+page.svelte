<script lang="ts">
	import { Accordion, AccordionItem, RangeSlider } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { configurationService } from '$lib/services/configuration';
	import { availableModules } from '$lib/models/Modules';
	import type { ConfigurationDao, ConfigurationDto } from '$lib/models/Configuration';
	import constants from '$lib/utils/constants';


	let configuration: ConfigurationDao = {
		name: '',
		steps: {},
		mainSettings:{
			backgroundColor: '#ea8e05',
			width: 100,
			height: 100,
			alignment: 'top',
		}
	};

	onMount(async () => {
		const fetchedConfig = await configurationService.getDocument($page.params.configurationId);
		configuration = daoToDto({...configuration, ...fetchedConfig});
	});

	function updateConfiguration() {
		const flattenedConfiguration = flattenConfiguration(configuration);
		configurationService.updateDocument($page.params.configurationId, flattenedConfiguration);
	}

	function flattenConfiguration(configuration: ConfigurationDao): ConfigurationDto {
		const steps: ConfigurationDto['steps'] = {};
		Object.keys(configuration.steps).forEach((stepIndex) => {
			steps[stepIndex as unknown as number] = configuration.steps[stepIndex as unknown as number][0];
		});
		return { ...configuration, steps };
	}

	function daoToDto(configuration: ConfigurationDao): ConfigurationDao {
		const newSteps: ConfigurationDao['steps'] = {};
		Object.keys(configuration.steps).forEach(stepIndex => {
			newSteps[stepIndex as unknown as number] = [configuration.steps[stepIndex as unknown as number]];
		});
		return { ...configuration, steps: newSteps };
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

<form on:submit|preventDefault={updateConfiguration} class="flex flex-col items-center">
	<button type="button" on:click={addStep} class="btn mb-2">+</button>
	<!-- Modal settings -->
	<div class="flex justify-evenly w-[90%] border-2 border-tertiary-200 rounded-md p-7 m-4">
		<input   type="color" bind:value={configuration.mainSettings.backgroundColor} class="input my-auto"/>
		<div class="flex-col flex justify-evenly">
			<label>
				Transition:
				<select bind:value={configuration.mainSettings.transition} name="transition"  class="select">
					{#each constants.TRANSITION_VALUES as transition_val}
						<option value={transition_val}>{transition_val}</option>
					{/each}
				</select>
			</label>
			<label>
				Modal from:
				<select bind:value={configuration.mainSettings.from}  name="from" class="select">
					{#each constants.ALIGNMENT_VALUES as from_val}
						<option value={from_val}>{from_val}</option>
					{/each}
				</select>
			</label>
			<label>
				Transition duration in ms:
			<input name="duration" type="number" bind:value={configuration.mainSettings.duration} class="input" placeholder="Duration"/>
			</label>
		</div>
		<label>
			Alignment:
			<select bind:value={configuration.mainSettings.alignment}  name="alignment"  class="select">
				{#each constants.ALIGNMENT_VALUES as alignment_val}
					<option value={alignment_val}>{alignment_val}</option>
				{/each}
			</select>
		</label>
		<div >
			<RangeSlider  name="width" bind:value={configuration.mainSettings.width} max={100} step={1}>Width: {configuration?.mainSettings?.width}</RangeSlider>
			<RangeSlider name="height" bind:value={configuration.mainSettings.height} max={100} step={1}>Height: {configuration?.mainSettings?.height}</RangeSlider>
		</div>
	</div>

	<!-- Actions-->
	<div class="w-full flex justify-evenly">
		<a target="_blank" class="anchor cursor-pointer" href="http://localhost:5173/{$page.params.configurationId}/build">Build</a>
		<a target="_blank" class="anchor cursor-pointer" href="http://localhost:5173/{$page.params.configurationId}/render">View</a>
		<a target="_blank" class="anchor cursor-pointer" href="http://localhost:5173/{$page.params.configurationId}">Get integration code</a>
	</div>
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
						{#each constants.AVAILABLE_LAYOUTS as layout}
							<option value={layout}>{layout}</option>
						{/each}
					</select>
					<div class="flex justify-evenly">
						{#each Array.from({ length: constants.NumberOfItemsInLayout[step.layout] || 1 }) as p, j}
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
