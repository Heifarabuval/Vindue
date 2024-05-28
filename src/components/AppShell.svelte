<script lang="ts">
	import Icon from './Icon.svelte';
	import { faArrowAltCircleLeft, faArrowAltCircleRight, type IconDefinition } from '@fortawesome/free-solid-svg-icons';


	let aside:{arrow:IconDefinition,visibility:"block"|"hidden"} ={
		visibility:"block",
		arrow:faArrowAltCircleLeft
	}
	function toggleAside(){
		aside.arrow = aside.visibility.includes("block") ? faArrowAltCircleRight : faArrowAltCircleLeft;
		aside.visibility = aside.visibility.includes("block") ? "hidden" : "block";
	}
</script>

<div class="h-screen flex flex-col">
	{#if !!$$slots.header}
		<header class="flex-none basis-2/12">
			<slot name="header"></slot>
		</header>
	{/if}
	<button class="absolute top-[15%] m-2" on:click={toggleAside}>
		<Icon color="text-tertiary-400" size="text-4xl" icon={aside.arrow}/>
	</button>
	<div class="flex-grow flex">
		{#if !!$$slots.aside}
			<aside class="{aside.visibility} basis-1/6 min-w-[10em] transition ease-in-out duration-500">
				<slot name="aside"></slot>
			</aside>
		{/if}
		<main class="flex-grow">
			<slot></slot>
		</main>
	</div>
	{#if !!$$slots.footer}
		<footer class="flex-none basis-1/12">
			<slot name="footer"></slot>
		</footer>
	{/if}
</div>
