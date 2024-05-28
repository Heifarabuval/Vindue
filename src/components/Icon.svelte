<script>
	import { faImage } from '@fortawesome/free-solid-svg-icons';
import { Fa } from 'svelte-fa';
export let icon = faImage
export let color = 'text-primary-600';
export let size = '';
</script>
<Fa class="{color} {size} cursor-pointer transition duration-400 ease-in-out hover:scale-105 hover:brightness-150" {icon} />
