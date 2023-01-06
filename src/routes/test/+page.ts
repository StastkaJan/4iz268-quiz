import type { PageLoad } from './$types'

import { error } from '@sveltejs/kit'

interface questionSet {
	id: number
	question: string
	choices: Array<string>
	answer: string
}

export const load = (async ({ fetch, url }) => {
	const id = url.searchParams.get('id')
	if (id == '' || id == null) {
		throw error(400, { message: 'Question set ID is mandatory' })
	}
	const json = await fetch(`/data/id${id}.json`)

	if (json.status == 404) {
		throw error(404, { message: 'Question set not found' })
	}

	const questions: Array<questionSet> = await json.json()
	return { questions }
}) satisfies PageLoad
