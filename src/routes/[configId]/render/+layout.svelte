<script lang="ts">
	import { FirebaseApp } from 'sveltefire';
	import '../../../app.pcss';
	import { auth, firestore } from '$lib';
	import { page } from '$app/stores';
	import configurationExist from '../utils/configurationExist';

	let configExist = false;
	(async () => {
		configExist = await configurationExist($page.params.configId);
	})();


</script>
{#if configExist}
<FirebaseApp {auth} {firestore}>
	<slot />
</FirebaseApp>
{:else}
	<pre>404 Not Found</pre>
{/if}
