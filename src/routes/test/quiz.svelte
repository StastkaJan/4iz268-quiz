<script lang="ts">
	import { browser } from '$app/environment'
	import { createEventDispatcher } from 'svelte'
	import Cross from '$lib/icons/cross.svelte'
	import Check from '$lib/icons/check.svelte'

	import type { questionSet } from './questionSet'

	export let questions: Array<questionSet>, id: string, training: boolean

	let currentQuestion = 0
	let showResults = false
	let questionResults = false
	let wrongAnswer: Array<number> = []
	const dispatch = createEventDispatcher()

	function handleNext(choice: string) {
		if (!training) {
			questions[currentQuestion].choice = choice

			if (currentQuestion + 1 < questions.length) {
				currentQuestion++
			} else {
				showResults = true
			}
		} else {
			questions[currentQuestion].choice = choice
			questionResults = true
		}
	}

	function moveQuestion(operation: string) {
		questionResults = false
		if (operation == 'next' && currentQuestion + 1 < questions.length) {
			currentQuestion++
		} else if (operation == 'prev' && currentQuestion - 1 >= 0) {
			currentQuestion--
		}
	}

	function handleAnswers() {
		let score = 0
		questions.forEach(question => {
			if (question.choice && question.answer === question.choice) {
				score++
			} else {
				wrongAnswer.push(question.id)
			}
		})
		if (browser) {
			window.localStorage.setItem(`id${id}`, JSON.stringify(wrongAnswer))
		}
		return score
	}
</script>

<div class="container">
	{#if showResults}
		<h1>Results</h1>
		<p>You scored {handleAnswers()} out of {questions.length}</p>
		<button on:click={() => dispatch('reset')}>Back</button>
	{:else}
		<button on:click={() => dispatch('reset', {})}>Back</button>
		<h1>{questions[currentQuestion].question}</h1>
		<p>Question {currentQuestion + 1} out of {questions.length}</p>
		<ul>
			{#each questions[currentQuestion].choices as choice}
				<li>
					<button
						on:click={() => handleNext(choice)}
						class:choice={questions[currentQuestion].choice == choice}
					>
						{#if questions[currentQuestion].answer == choice && questionResults}
							<Check />
						{:else if questionResults}
							<Cross />
						{/if}
						<span>{choice}</span>
					</button>
				</li>
			{/each}
		</ul>
		<div>
			<button on:click={() => moveQuestion('prev')} class:hidden={currentQuestion - 1 < 0}>
				Previous
			</button>
			<button
				on:click={() => {
					showResults = true
				}}>Finish</button
			>
			<button
				on:click={() => moveQuestion('next')}
				class:hidden={currentQuestion + 1 >= questions.length}
			>
				Next
			</button>
		</div>
	{/if}
</div>

<style>
	div.container {
		max-width: 500px;
		margin: auto;
	}
	ul {
		padding: 0;
		list-style-type: none;
	}
	li > button {
		display: flex;
		align-items: center;
		margin: 10px 0;
		width: 100%;
		fill: #fff;
	}
	li > button > span {
		margin-left: 10px;
	}
	button.hidden {
		cursor: not-allowed;
		opacity: 0.1;
	}
	div > div {
		display: flex;
		justify-content: space-between;
	}
</style>
