import fs from 'fs/promises'

import type { RequestHandler } from './$types'

export const GET = (async ({ url }) => {
	const id = url.searchParams.get('id')
	console.log(await fs.stat(`./src/lib/data/id${id}.json`))
	const questions = await fs.readFile(`./src/lib/data/id${id}.json`, { encoding: 'utf8' })
	console.log(questions)
	return new Response(questions, { status: 200 })
}) satisfies RequestHandler
