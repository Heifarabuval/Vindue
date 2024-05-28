<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let route = "";
	let crumbs = [];

	function extractWordsInBrackets(text) {
		const regex = /\[([^\]]+)\]/g;
		let matches = [];
		let match;

		while ((match = regex.exec(text)) !== null) {
			matches.push(match[1]);
		}

		return matches;
	}

	const updateCrumbs = (route) => {
		let routeArray = route.split("/");
		let routeString = "";
		const _crumbs = [];
		routeArray.forEach((element, index) => {
			//match [*] elements
			extractWordsInBrackets(element).forEach((word) => {
				element = $page.params[word] || element;
			});
			if (index === 0) {
				routeString = "/";
			} else {
				routeString += element + "/";
				_crumbs.push({ name: element, href: routeString });
			}
		});
		crumbs = _crumbs;
	};

	onMount(() => {
		page.subscribe((page) => {
			route = page.route.id;
			updateCrumbs(route);
		});
	});

</script>

<ol class="breadcrumb w-full justify-center m-3 ">
	{#each crumbs as crumb, i}
		<li class="crumb"><a class="anchor" href={crumb.href}>{crumb.name}</a></li>
		<li class="crumb-separator" aria-hidden="true">&rsaquo;</li>
		<hr/>
	{/each}
</ol>
