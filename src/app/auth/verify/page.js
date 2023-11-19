'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { ButtonPrimary } from 'shared/ui/Button'
import Card from 'shared/ui/Card'

const VerifyPage = () => {
	const searchParams = useSearchParams()

	const email = searchParams.get('email')
	const router = useRouter()
	const [code, setCode] = useState('')
	return (
		<>
			<div className='[@media(hover)]:hidden fixed top-[5px] left-0 font-bold text-[32px] leading-[38.4px] tracking-[-0.025em] text-[#5875e8] w-full flex justify-center'>
				practica
			</div>

			<div className='flex flex-col gap-[10px] mt-[15vh] [@media(pointer:coarse)]:mt-[30vh] w-full'>
				<div className='font-medium text-[26px] leading-[32.48px] tracking-[-0.025em] text-[#2c2c2c] dark:text-white [@media(hover)]:max-w-[604px] w-full'>
					Мы отправили код подтверждения на
					<div className='font-medium text-[26px] leading-[32.48px] tracking-[-0.025em] text-[#5875e8]'>
						{email}
					</div>
				</div>

				<div className='font-normal text-[22px] leading-[24.42px] tracking-[-0.05em] text-[#8f8f8f] [@media(hover)]:max-w-[290px] w-full'>
					Проверьте спам, ссылка может быть там
				</div>
				<Card
					style='[@media(hover)]:max-w-[390px] w-full flex flex-col [@media(pointer:coarse)]:mt-[13vh]'
					rounded={20}
					padding={10}
				>
					<input
						placeholder={'Код подтверждения'}
						className='px-[12px] w-full h-[42px] bg-[#f6f6f8] dark:bg-[#2c2c2c] text-[#2c2c2c] dark:text-white dark:placeholder:text-[#8f8f8f] text-[14px] pb-[12px] pt-[11px] transition duration-[250ms] hover:inner-border-[1px] hover:inner-border-[#5875e8] outline-none placeholder:font-normal placeholder:text-[#bfbfbf] leading-[18px] tracking-[-0.015em] placeholder:leading-[18px] placeholder:tracking-[-0.015em]'
						style={{
							borderRadius: 16,
						}}
						onChange={e => setCode(e.target.value)}
					/>
					<ButtonPrimary
						type='submit'
						text='OK'
						style='mt-[10px] w-full'
						onClick={() => {
							router.push(
								`/api/auth/callback/email?email=${encodeURIComponent(
									email
								)}&token=${code}`
							)
						}}
					/>
				</Card>
			</div>
		</>
	)
}

export default VerifyPage
