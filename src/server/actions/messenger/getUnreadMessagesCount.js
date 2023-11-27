'use server'
import { prisma } from '../../db'
import { getServSession } from 'app/api/auth/[...nextauth]/route'

const getUnreadMessagesCount = async lastDate => {
	const session = await getServSession()
	let totalUnread = 0

	const chats = await prisma.message.groupBy({
		by: ['chatId'],
		_count: { unRead: true },
		where: {
			userId: { not: session.user.id },
			unRead: true,
			Chat: {
				updatedAt: { lte: new Date().toISOString() },
				participants: { some: { id: session.user.id } },
			},
		},
	})
	for (let chat of chats) {
		totalUnread += chat._count.unRead
	}

	return { totalUnread }
}
export default getUnreadMessagesCount
