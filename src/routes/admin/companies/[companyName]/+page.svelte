<script lang="ts">
	import SingleInput from '../../../../components/Form/SingleInput.svelte';
	import Alert from '../../../../components/Alert.svelte';
	import Icon from '../../../../components/Icon.svelte';
	import { Collection } from 'sveltefire';
	import { faTrash } from '@fortawesome/free-solid-svg-icons';
	import { projectService } from '$lib/services/project';
	import { page } from '$app/stores';
	import { companyService } from '$lib/services/company';
	import type { Project } from '$lib/models/Project';
	let alert = false;

	let projectToDelete: Project | null = null;
	function createProject(event: Event & { detail: { inputValue: string } }) {
		projectService.createProject({name: event.detail.inputValue,steps:2},$page.params.companyName)
	}

	function deleteProject(projectId:string){
		alert = true;
		companyService.removeProjectFromCompany($page.params.companyName,projectId).then(()=>{
			projectService.deleteDocument(projectId).then(()=>{
				switchAlertVisibility();
			})
		})
	}
	function switchAlertVisibility() {
		alert = !alert;
	}

</script>

<div class="flex flex-col h-full gap-2">
	<Collection ref={'projects'} let:data>
		{#if alert}
			<Alert
				title="⚠️ Delete Project ⚠️"
				message="Are you sure you want to delete {projectToDelete.name} ?"
				on:confirm={()=>{if(projectToDelete)deleteProject(projectToDelete.id)}}
				on:cancel={switchAlertVisibility}
			/>
		{:else }
			<SingleInput placeholder="New project" on:submit={createProject} inputValue="" />
		{/if}
		{#each data as project (project.id)}
			<div class="card  drop-shadow shadow-primary-50 shadow-lg border-primary-400 m-3 flex justify-between hover:scale-[101%] transition duration-250 ease-in-out">
				<a href="{$page.params.companyName}/{project.id}" class="w-full h-full p-4 m-3">
					<div>{project.name}</div>
				</a>
				<button class="m-6" on:click={()=>{
						projectToDelete = project
						switchAlertVisibility();
				}}>
					{#if !alert}
						<Icon icon={faTrash} color="text-error-500"/>
					{/if}
				</button>
			</div>
		{/each}
	</Collection>
</div>
