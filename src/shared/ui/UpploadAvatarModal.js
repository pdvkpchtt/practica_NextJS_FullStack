'use client'
import { useRef } from 'react'

import TextMain from '../Text/TextMain '
import BottomModal from './BottomModal'
import { uploadAvatar } from '../../server/actions/uploadAvatar'
import { uploadAvatarCompany } from '../../server/actions/uploadAvatarCompany'

import AvatarIcon from '../icons/AvatarIcon'
import axios from 'axios'
import { useState } from 'react'

const UpploadAvatarModal = ({
	isOpen = false,
	handleClose = () => {},
	company = false,
}) => {
	const inputRef = useRef(null)
	const buttRef = useRef(null)

	const [file, setFile] = useState()

	function handleChange(event) {
		setFile(event.target.files[0])
		const url = '/api/upload/avatar'
		const formData = new FormData()
		formData.append('file', event.target.files[0])
		formData.append('fileName', event.target.files[0].name)
		const json = JSON.stringify(formData)
		// const config = {
		// 	headers: {
		// 		'content-type': 'multipart/form-data',
		// 	},
		// }
		axios.post(url, json).then(response => {
			console.log(response.data)
		})
	}

	function handleSubmit(event) {
		event.preventDefault()
		const url = '/api/upload/file'
		const formData = new FormData()
		formData.append('file', file)
		formData.append('fileName', file.name)
		const config = {
			headers: {
				'content-type': 'multipart/form-data',
			},
		}
		axios.post(url, formData, config).then(response => {
			console.log(response.data)
		})
	}

	return (
		<BottomModal isOpen={isOpen} handleClose={handleClose}>
			<div className='p-[12px]'>
				{/* <form action={company ? uploadAvatarCompany : uploadAvatar}> */}
				<input
					type='file'
					name='file'
					accept='image/*'
					className='hidden'
					ref={inputRef}
					onChange={e => {
						handleChange(e)
						//buttRef.current.click()
						handleClose()
					}}
				/>
				<input type='submit' value='Upload' ref={buttRef} className='hidden' />

				<div
					onClick={() => inputRef.current.click()}
					className='bg-[#74899B] bg-opacity-[8%] rounded-[8px] items-center flex flex-row justify-between hover:bg-[#647f98] hover:bg-opacity-[15%] cursor-pointer transition duration-[250ms] p-[16px]'
				>
					<TextMain
						text='Загрузить изображение'
						style='font-medium text-[16px] leading-[20px] tracking-[-0.015em] flex-1'
					/>
					<AvatarIcon />
				</div>
				{/* </form> */}
			</div>
		</BottomModal>
	)
}

export default UpploadAvatarModal
