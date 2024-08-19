<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	onMount(() => {
		const script = document.createElement('script');
		script.src = `http://localhost:5173/${$page.params.configId}`;
		document.body.appendChild(script);
	});
</script>

<iframe style="width: 100vw; height: 100vh" src="https://www.adfinitas.fr/">
	<p>Your browser does not support iframes.</p>
</iframe>


