<script lang="ts">
	import type { PageData } from './$types'

	export let data: PageData
</script>

{#each data.questions as question}
	<h2>{question.question}</h2>
	<ul>
		{#each question.choices as choice}
			<li>{choice}</li>
		{/each}
	</ul>
{/each}
