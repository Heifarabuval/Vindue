<script lang="ts">
	import Navbar from './Navbar.svelte';
	import type { NavItem } from '$lib/interfaces/Navbar';
	import img from '$lib/assets/logo.png';

	const items:NavItem[] = [
		{label: 'Companies', href: '/admin/companies'}
	];

	interface Options {
		items: NavItem[];
		bgColorClass: string;
		imagePath: string;
	}

	export let options: Options = {
		items: items,
		bgColorClass: 'bg-primary-600',
		imagePath: img,
	};

</script>

<div class="flex p-2 h-full justify-between {options.bgColorClass} rounded-br-2xl bg-gradient-to-r from-primary-200 to-secondary-200 min-w-[550px]">
	<a class="basis-1/12 p-2 invisible md:visible" href="/admin"><img class="h-auto max-w-full  rounded-xl w-auto drop-shadow-xl" alt="The project logo" src={options.imagePath} /></a>
	<Navbar {items}/>
</div>
