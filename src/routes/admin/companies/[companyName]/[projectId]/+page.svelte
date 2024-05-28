<script>
import { page } from '$app/stores';
import { Doc } from 'sveltefire';
</script>

<Doc ref="projects/{$page.params.projectId}" let:data={project}>
	<h1>{project.name}</h1>
</Doc>
