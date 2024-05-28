<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Icon from './Icon.svelte';
	import { faCheckCircle, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';

	const dispatch = createEventDispatcher();

	export let message = 'This is an alert message';
	export let title = 'Alert';
	function cancelOrConfirm(action: 'cancel' | 'confirm') {
		console.log('dispatching ', action);
		dispatch(action);
	}

</script>
<aside class="alert  my-2 w-2/3 mx-auto border-4 border-warning-500">
	<div class="alert-message">
		<h3 class="h3">{title}</h3>
		<p>{message}</p>
	</div>
	<div class="alert-actions cursor-pointer flex justify-between self-end">
		<button on:click={()=>{cancelOrConfirm("confirm")}}>
			<Icon
				icon={faCheckCircle}
				size="text-2xl"
				color="text-success-600"
			/>
		</button>
		<button on:click={()=>{cancelOrConfirm("cancel")}}>
			<Icon
				icon={faXmarkCircle} size="text-2xl"
				color="text-error-500"
			/>
		</button>
	</div>
</aside>
