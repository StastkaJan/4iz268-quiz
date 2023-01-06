<script lang="ts">
	import type { PageData } from './$types'

	export let data: PageData
</script>

{#each data.tests as test}
	<h2>
		<a href="/test?id={String(test.id)}">{test.name}</a>
	</h2>
{/each}
