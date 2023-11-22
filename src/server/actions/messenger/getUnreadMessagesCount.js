'use server'
import { prisma } from '../../db'
import { getServSession } from 'app/api/auth/[...nextauth]/route'

const getUnreadMessagesCount = async (lastDate = new Date().toISOString()) => {
	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms))
	}

	const session = await getServSession()

	let totalUnread = 0
	const startTime = new Date()
	let previousUnread = 0
	let chats = await prisma.message.groupBy({
		by: ['chatId'],
		_count: { unRead: true },
		where: {
			userId: { not: session.user.id },
			unRead: true,
			Chat: {
				updatedAt: { lte: lastDate },
			},
		},
	})

	for (let chat of chats) {
		previousUnread += chat._count.unRead
	}
	console.log('previousUnread', previousUnread)

	chats = await prisma.message.groupBy({
		by: ['chatId'],
		_count: { unRead: true },
		where: {
			userId: { not: session.user.id },
			unRead: true,
		},
	})

	for (let chat of chats) {
		totalUnread += chat._count.unRead
	}

	while (new Date() - startTime < 10000 && previousUnread == totalUnread) {
		console.log('check', new Date() - startTime > 10000)

		chats = await prisma.message.groupBy({
			by: ['chatId'],
			_count: { unRead: true },
			where: {
				userId: { not: session.user.id },
				unRead: true,
			},
		})

		for (let chat of chats) {
			totalUnread += chat._count.unRead
		}
		console.log('totalUnread', totalUnread)
		await sleep(200)
	}

	return { totalUnread, lastDate: new Date().toISOString() }
}
export default getUnreadMessagesCount
