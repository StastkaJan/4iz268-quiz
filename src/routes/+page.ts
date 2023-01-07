import type { PageLoad } from './$types'

export const load = (async ({ fetch }) => {
	const json = await fetch('/data/tests.json')
	const tests: [{ id: number; name: string; desc: string }] = await json.json()
	return { tests }
}) satisfies PageLoad
