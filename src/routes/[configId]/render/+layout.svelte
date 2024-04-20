<script lang="ts">
	import { FirebaseApp } from 'sveltefire';
	import '../../../app.pcss';
	import { auth, firestore } from '$lib';
</script>

<FirebaseApp {auth} {firestore}>
	<slot />
</FirebaseApp>
