'use server'
import { prisma } from '../../db'
import { getServSession } from 'app/api/auth/[...nextauth]/route'

const getUnreadMessagesCount = async (lastDate = new Date().toISOString()) => {
	const session = await getServSession()

	let totalUnread = 0
	const startTime = new Date()
	console.log(new Date() - startTime)

	while (new Date() - startTime > 10000 && totalUnread !== 0) {
		const chats = await prisma.message.groupBy({
			by: ['chatId'],
			_count: { unRead: true },
			where: {
				userId: { not: session.user.id },
				unRead: true,
				Chat: {
					updatedAt: { gte: lastDate },
				},
			},
		})

		for (let chat of chats) {
			totalUnread += chat._count.unRead
		}
	}

	return { totalUnread, lastDate }
}
export default getUnreadMessagesCount
