import { getServSession } from 'app/api/auth/[...nextauth]/route'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { prisma } from 'server/db'
import { uuid } from 'uuidv4'
const p = require('path')

export const config = {
	api: {
		bodyParser: false,
		responseLimit: false,
	},
}

export async function POST(req) {
	const session = await getServSession()
	const formData = await req.formData()

	const file = formData.get('file')
	console.log('file_upload', file)
	if (!file) {
		return Response.json({ error: 'No file uploaded' })
	}

	const bytes = await file.arrayBuffer()
	const buffer = Buffer.from(bytes)

	const id = uuid()

	const path = join('/', 'var/www/practica/files', id + p.extname(file.name))
	await writeFile(path, buffer)
	console.log(`open ${path} to see the uploaded file`)

	const user = await prisma.User.update({
		where: { id: session.user.id },
		data: {
			image: 'https://practica.team/file/' + id + p.extname(file.name),
		},
	})

	return Response.json({ error: 'No file uploaded' })
}
