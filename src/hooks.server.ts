import type { HandleServerError } from '@sveltejs/kit'

export const handleError = (({ error }) => {
	console.log(error)
	return {
		message: 'Whoops!',
		code: error?.code ?? 'UNKNOWN'
	}
}) satisfies HandleServerError
