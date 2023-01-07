<script>
	import Header from '$lib/header.svelte'
	import Footer from '$lib/footer.svelte'
</script>

<div>
	<Header />

	<main>
		<slot />
	</main>

	<Footer />
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		min-height: 100vh;
	}
	main {
		padding: 10px;
	}
</style>
