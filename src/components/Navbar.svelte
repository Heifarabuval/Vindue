<script lang="ts">
	import type { NavItem } from '$lib/interfaces/Navbar';
	export let items:NavItem[] =[];
</script>

<nav class="flex justify-between p-4 m-auto basis-1/2">
	{#each items as item}
		<a href="{item.href}" class="font-bold text-tertiary-500 text-lg transition duration-200 ease-in-out hover:text-white hover:scale-105">{item.label}</a>
	{/each}
</nav>
