<script lang="ts">
	import AppShell from '../../components/AppShell.svelte';
	import Header from '../../components/Header.svelte';
	import BreadCrumb from '../../components/BreadCrumb.svelte';
</script>

<AppShell>
	<Header slot="header" />
	<BreadCrumb/>
	<div slot="aside" class="h-full bg-primary-600 text-2xl flex-col rounded-br-2xl bg-gradient-to-b from-primary-200 to-secondary-200">
	</div>
	<slot></slot>
</AppShell>
