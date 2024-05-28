<script lang="ts">
	import { Collection } from 'sveltefire';
	import SingleInput from '../../../components/Form/SingleInput.svelte';
	import { companyService } from '$lib/services/company.ts';
	import { faTrash } from '@fortawesome/free-solid-svg-icons';
	import Icon from '../../../components/Icon.svelte';
	import Alert from '../../../components/Alert.svelte';

	let alert = false;
	let companyToDelete: string | null = null;

	function createCompany(event: Event & { detail: { inputValue: string } }) {
		companyService.saveDocument(
			event.detail.inputValue,
			{ name: event.detail.inputValue }
		);
	}

	function deleteCompany(companyId: string) {
		alert = true;
		companyService.deleteDocument(companyId)
			.then(() => {
				switchAlertVisibility();
			});
	}

	function switchAlertVisibility() {
		alert = !alert;
	}

</script>
<div class="flex flex-col h-full gap-2">
	<Collection ref={'companies'} let:data>
		{#if alert}
			<Alert
				title="⚠️ Delete Company ⚠️"
				message="Are you sure you want to delete {companyToDelete} ?"
				on:confirm={()=>{if(companyToDelete)deleteCompany(companyToDelete)}}
				on:cancel={switchAlertVisibility}
			/>
			{:else }
			<SingleInput placeholder="New company" on:submit={createCompany} inputValue="" />
		{/if}
		{#each data as company (company.id)}
			<div class="card  drop-shadow shadow-primary-50 shadow-lg border-primary-400 m-3 flex justify-between hover:scale-[101%] transition duration-250 ease-in-out">
				<a href="companies/{company.id}" class="w-full h-full p-4 m-3">
					<div>{company.name}</div>
				</a>
				<button class="m-6" on:click={()=>{
						companyToDelete = company.id;
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
