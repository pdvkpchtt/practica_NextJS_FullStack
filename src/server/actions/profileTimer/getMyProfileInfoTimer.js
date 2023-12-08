'use server'

import { getServSession } from '../../../app/api/auth/[...nextauth]/route'
import { prisma } from '../../db'

export const getMyProfileInfoTimer = async lastDate => {
	const session = await getServSession()

	let count = 0
	console.log('getCountUpdates', lastDate)
	if (!lastDate) {
		count =
			(
				await prisma.updates.findMany({
					where: { user: { id: session?.user?.id } },
				})
			).length || 0
		return { count, lastDate: new Date().toISOString() }
	}

	let updatedCount = 0

	while (updatedCount === count) {
		updatedCount = (
			await prisma.updates.findMany({
				where: { user: { id: session?.user?.id } },
			})
		).length
		await sleep(300)
	}

	return { count: updatedCount, lastDate: new Date().toISOString() }
}
