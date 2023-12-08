'use server'
import sleep from 'shared/utils/sleep'
import { prisma } from '../../db'
import { getServSession } from 'app/api/auth/[...nextauth]/route'

const getUnreadMessagesCount = async lastDate => {
	const session = await getServSession()
	let totalUnread = 0
	console.log('getCount', lastDate)
	if (!lastDate) {
		totalUnread = (
			await prisma.message.findMany({
				where: {
					userId: { not: session.user.id },
					unRead: true,
					Chat: {
						participants: { some: { id: session.user.id } },
					},
				},
			})
		).length
		return { totalUnread, lastDate: new Date().toISOString() }
	}

	const startTime = new Date().getTime()

	let updatedCount = 0

	while (updatedCount === 0) {
		updatedCount = (
			await prisma.message.findMany({
				where: {
					userId: { not: session.user.id },
					createdAt: { gte: lastDate },
					unRead: true,
					Chat: {
						participants: { some: { id: session.user.id } },
					},
				},
			})
		).length
		await sleep(300)
	}

	totalUnread = (
		await prisma.message.findMany({
			where: {
				userId: { not: session.user.id },
				unRead: true,
				Chat: {
					participants: { some: { id: session.user.id } },
				},
			},
		})
	).length

	return { totalUnread, lastDate: new Date().toISOString() }
}
export default getUnreadMessagesCount
