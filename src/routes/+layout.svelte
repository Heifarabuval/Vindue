<script>
	import '../app.postcss';
	import { auth, firestore } from '$lib';
	import { FirebaseApp } from 'sveltefire';
</script>
<FirebaseApp {auth} {firestore}>
	<slot />
</FirebaseApp>
