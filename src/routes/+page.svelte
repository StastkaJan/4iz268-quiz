<script lang="ts">
	import type { PageData } from './$types'

	export let data: PageData
</script>

<section>
	<h1>Quiz topics</h1>
	{#each data.tests as test}
		<div>
			<h2>
				<a href="/test?id={String(test.id)}">{test.name}</a>
			</h2>
			<p>{test.desc}</p>
			<a href="/test?id={String(test.id)}" class="button">Challange me!</a>
		</div>
	{/each}
</section>

<style>
	section {
		max-width: 800px;
		margin: auto;
	}
	section div {
		margin-left: 20px;
	}
</style>
