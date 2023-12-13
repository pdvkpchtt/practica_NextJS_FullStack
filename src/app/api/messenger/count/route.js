import { authOptions, getServSession } from 'app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { prisma } from 'server/db'
import sleep from 'shared/utils/sleep'

export async function POST(request) {
	const session = await getServSession()
	const res = await request.json()
	let totalUnread = 0
	console.log('getCount', res.lastDate)
	if (!res.lastDate) {
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
		return Response.json({ totalUnread, lastDate: new Date().toISOString() })
	}

	let updatedCount = 0

	while (updatedCount === 0) {
		updatedCount = (
			await prisma.message.findMany({
				where: {
					userId: { not: session.user.id },
					createdAt: { gte: res.lastDate },
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

	return Response.json({ totalUnread, lastDate: new Date().toISOString() })
}
