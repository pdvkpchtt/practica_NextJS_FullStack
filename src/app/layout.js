import './globals.css'
import { headers } from 'next/headers'

import { getServSession } from './api/auth/[...nextauth]/route'
import SessionProvider from '../components/SessionProvider'
import AuthLayout from '../layouts/AuthLayout'
import Layout from '../layouts/Layout'
import Header from '../shared/ui/Header'
import BottomNav from '../shared/ui/BottomNav'

export const metadata = {
	title: 'Practica',
	description: 'На связи с лучшими',
}

export default async function RootLayout({ children }) {
	const session = await getServSession()

	const headersList = headers()
	const fullUrl = headersList.get('x-invoke-path') || ''

	return (
		<html>
			<head>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no'
				/>
				<meta name='HandheldFriendly' content='true' />
			</head>
			<body
				className={`bg-[#f6f6f8] ${
					fullUrl.includes('landing')
						? 'dark:bg-[#f6f6f8]'
						: 'dark:bg-[#141414]'
				} hideScrollbarNav`}
			>
				<SessionProvider session={session}>
					<AuthLayout>
						<Header role={session?.user?.role} />
						<main>
							<Layout>{children}</Layout>
						</main>
						<BottomNav role={session?.user?.role} />
					</AuthLayout>
				</SessionProvider>
			</body>
		</html>
	)
}
