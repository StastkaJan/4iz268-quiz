<script lang="ts">
	import { page } from '$app/stores'
	import { browser } from '$app/environment'
	import Quiz from './quiz.svelte'

	import type { PageData } from './$types'
	import type { questionSet } from './questionSet'

	export let data: PageData

	let questions: Array<questionSet> = JSON.parse(JSON.stringify(data.questions))
	let startQuiz = false
	let id = $page.url.search.match(/id=(\d+)/)[1] || ''
	let wrongAnswers: Array<number> = browser
		? JSON.parse(window.localStorage.getItem(`id${id}`) || '[]')
		: []
	let training = false

	function practiseWrong() {
		questions = questions.filter(question => wrongAnswers.includes(question.id))
		start()
	}

	function shuffleStart() {
		let currentIndex = questions.length
		for (let i = questions.length - 1; i >= 0; i--) {
			let randomIndex = Math.floor(Math.random() * currentIndex)
			;[questions[i], questions[randomIndex]] = [questions[randomIndex], questions[i]]
		}
		start()
	}

	function start() {
		startQuiz = true
	}

	function reset() {
		startQuiz = false
		questions = JSON.parse(JSON.stringify(data.questions))
		wrongAnswers = browser ? JSON.parse(window.localStorage.getItem(`id${id}`) || '[]') : []
	}
</script>

<div class="container">
	{#if startQuiz}
		<Quiz {questions} {id} {training} on:reset={reset} />
	{:else}
		<a href="/" class="button">Home</a>
		<h1>{data.tests[Number(id) - 1].name}</h1>
		<p>{questions.length} questions</p>
		<label
			for="training"
			on:click={() => {
				training = !training
			}}
			on:keypress={() => {
				training = !training
			}}
		>
			<input type="checkbox" name="training" bind:checked={training} />
			Training mode
		</label>
		<small>(Results shown immediately)</small><br />
		<button on:click={start}> Start test </button>
		<button on:click={shuffleStart}> Shuffle and start </button>

		{#if wrongAnswers.length > 0}
			<p>Last result {questions.length - wrongAnswers.length} out of {questions.length}</p>
			<button on:click={practiseWrong}>Practise wrong answers</button>
		{/if}
	{/if}
</div>

<style>
	div.container {
		max-width: 500px;
		margin: 50px auto;
	}
</style>
