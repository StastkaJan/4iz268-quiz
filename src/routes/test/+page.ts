import type { PageLoad } from './$types'

import { error } from '@sveltejs/kit'

export const load = (async ({ fetch, url }) => {
	const id = url.searchParams.get('id')
	if (id == '') {
		throw error(400, { message: 'Musíte zadat id sady otázek' })
	}
	const json = await fetch(`./test?id=${id}`)
	const tests: [{ id: number; name: string }] = await json.json()
	return { tests }
}) satisfies PageLoad
