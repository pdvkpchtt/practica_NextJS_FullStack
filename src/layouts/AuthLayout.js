import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { getServSession } from '../app/api/auth/[...nextauth]/route'

const AuthLayout = async ({ children }) => {
	const session = await getServSession()
	const headersList = headers()
	const fullUrl = headersList.get('x-invoke-path') || ''
	console.log(fullUrl)
	console.log(!['/auth/verify', '/auth'].includes(fullUrl))

	if (!session && !['/auth/verify', '/auth'].includes(fullUrl)) {
		return redirect('/auth')
	}
	if (
		!session?.user?.role &&
		!['/auth/verify', '/auth', '/auth/role'].includes(fullUrl)
	) {
		return redirect('/auth/role')
	}

	if (
		session?.user?.role &&
		['/auth/role', '/auth', '/', ''].includes(fullUrl)
	) {
		return redirect('/feed')
	}

	// company
	// if (session?.user?.role === "company" && fullUrl === "/profile") {
	//   return redirect("/companyprofile");
	// }
	if (session?.user?.role === 'company' && fullUrl === '/profile/edit') {
		return redirect('/companyprofile/edit')
	}
	if (session?.user?.role === 'student' && fullUrl === '/companyprofile') {
		return redirect('/profile')
	}
	if (session?.user?.role === 'student' && fullUrl === '/companyprofile/edit') {
		return redirect('/profile/edit')
	}
	if (
		session?.user?.role === 'student' &&
		fullUrl === '/companyprofile/createvacancy'
	) {
		return redirect('/profile')
	}
	//   if (
	//     session?.user?.role === "company" &&
	//     !session?.user?.companyName &&
	//     fullUrl !== "/companyprofile/edit"
	//   ) {
	//     return redirect("/companyprofile/edit");
	//   }
	// company

	return <div className={'auth w-full '}>{children}</div>
}

export default AuthLayout
