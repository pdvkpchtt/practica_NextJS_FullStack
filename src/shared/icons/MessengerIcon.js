'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import getUnreadMessagesCount from './../../server/actions/messenger/getUnreadMessagesCount'
import { useEffect, useState } from 'react'
const { setIntervalAsync, clearIntervalAsync } = require('set-interval-async')

const MessengerIcon = ({ fill = '#000', size = 25 }) => {
	const pathname = usePathname()

	const [lastDate, setLastDate] = useState(new Date().toISOString())
	const [totalUnread, setTotalUnread] = useState(0)

	useEffect(() => {
		let intervalCheck = setIntervalAsync(async () => {
			const data = await getUnreadMessagesCount(lastDate)
			setLastDate(data.lastDate)
			setTotalUnread(data.totalUnread)
		}, 500)

		return () => clearIntervalAsync(intervalCheck)			
	}, [])

	return (
		<Link href={'/messenger'} className='group'>
			<div className='w-[30px] h-[30px] flex items-center justify-center cursor-pointer bg-transparent group-hover:bg-[#74899B] group-hover:bg-opacity-[8%] transition duration-[250ms] rounded-[8px]'>
				{totalUnread}
				<svg
					width='25'
					height='25'
					viewBox='0 0 25 25'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M20 12.4986C20.0002 13.8413 19.64 15.1594 18.9569 16.3154C18.2739 17.4713 17.2931 18.4227 16.1169 19.0702C14.9407 19.7177 13.6122 20.0376 12.2702 19.9965C10.9282 19.9553 9.62183 19.5547 8.4875 18.8363L5 19.9989L6.1625 16.5112C5.54046 15.5283 5.15557 14.4141 5.03825 13.2568C4.92093 12.0995 5.07439 10.9307 5.48652 9.84295C5.89864 8.75516 6.55812 7.77814 7.41284 6.98912C8.26755 6.2001 9.29407 5.62071 10.4112 5.29674C11.5284 4.97278 12.7056 4.91312 13.8499 5.12248C14.9941 5.33184 16.0739 5.80449 17.004 6.50305C17.9341 7.20162 18.689 8.10696 19.2089 9.14752C19.7289 10.1881 19.9997 11.3353 20 12.4986Z'
						className={
							pathname.includes('messenger')
								? 'stroke-[#5875e8]'
								: 'stroke-[#2c2c2c] dark:stroke-[#fff]'
						}
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			</div>
		</Link>
	)
}

export default MessengerIcon
