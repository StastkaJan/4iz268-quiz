import { error } from '@sveltejs/kit'

import type { PageLoad } from './$types'
import type { questionSet } from './questionSet'

export const load = (async ({ fetch, url }) => {
	const id = url.searchParams.get('id')
	if (id == '' || id == null) {
		throw error(400, { message: 'Question set ID is mandatory' })
	}
	const json = await fetch(`/data/id${id}.json`)
	const jsonTests = await fetch('/data/tests.json')

	if (json.status == 404) {
		throw error(404, { message: 'Question set not found' })
	}

	const questions: Array<questionSet> = await json.json()
	const tests: [{ id: number; name: string }] = await jsonTests.json()

	return { questions, tests }
}) satisfies PageLoad
