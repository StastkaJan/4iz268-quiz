import data from '$lib/data/tests.json'

import type { RequestHandler } from './$types'

export const GET = (async () => {
	const tests = JSON.stringify(data)
	return new Response(tests, { status: 200 })
}) satisfies RequestHandler
