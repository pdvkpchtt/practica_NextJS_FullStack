'use client'

import { useRef } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

import SearchInputIcon from '../icons/SearchInputIcon'
import TextCaption from '../Text/TextCaption'
import TextSecondary from '../Text/TextSecondary'
import CircularProggressBar from './CircularProggressBar'

export const Input = ({
	label = '',
	caption = '',
	placeholder = '',
	value = '',
	error = false,
	rounded = 8,
	maxLength,
	onChange,
	type = 'text',
	name = '',
	defaultValue,
}) => {
	return (
		<div className='flex flex-col min-w-[20px] w-full'>
			{label && (
				<div className='flex flex-row justify-between'>
					<TextSecondary
						text={label}
						style='font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]'
					/>
					{maxLength && value !== null ? (
						<div className='w-[16px] h-[16px] mr-[4px]'>
							<CircularProggressBar
								progress={value.length}
								maxWal={maxLength}
								trackColor={
									value.length === 0
										? 'stroke-[#ececec] dark:stroke-[#202436]'
										: 'stroke-[#CDD6F8] dark:stroke-[#353D5C]'
								}
								indicatorColor={
									value.length === 0 ? 'stroke-[#ececec]' : 'stroke-[#758DEC]'
								}
								trackWidth={2.67}
								indicatorWidth={2.67}
								size={18}
							/>
						</div>
					) : null}{' '}
				</div>
			)}

			<input
				name={name}
				placeholder={placeholder || ''}
				value={value ? value : ''}
				autoComplete
				className={`px-[12px] h-[42px] ${
					error
						? 'text-red-500 dark:text-red-500'
						: 'text-[#2c2c2c] dark:text-white'
				} text-[14px] pb-[12px] bg-[#f6f6f8] dark:bg-[#2c2c2c] placeholder:text-[#bfbfbf] placeholder:select-none dark:placeholder:text-[#8f8f8f] pt-[11px] transition duration-[250ms] hover:inner-border-[1px] hover:inner-border-[#5875e8] outline-none placeholder:font-normal leading-[18px] tracking-[-0.015em] placeholder:leading-[18px] placeholder:tracking-[-0.015em]`}
				style={{
					borderRadius: rounded,
				}}
				onChange={onChange ? e => onChange(e.target.value) : null}
				type={type}
				maxLength={maxLength}
				defaultValue={defaultValue ? defaultValue : null}
			/>

			{caption && (
				<p className='text-[13px] leading-[16px] tracking-[-0.351px] mt-[3px] text-[#F0BB31]'>
					{caption}
				</p>
			)}
		</div>
	)
}

export const SearchInput = ({
	placeholder = '',
	value,
	onChange = () => {},
}) => {
	const ref = useRef(null) // чтобы при нажатии на весь иблок инпута происходила фокусировка

	return (
		<div
			className='[@media(pointer:coarse)]:rounded-[20px] bg-[#f6f6f8] dark:bg-[#2c2c2c] dark:placeholder:text-[#8f8f8f] dark:text-white px-[12px] rounded-[8px] w-full cursor-text flex items-center flex-row gap-[8px] transition duration-[250ms] hover:inner-border-[1px] hover:inner-border-[#5875e8]'
			onClick={() => ref.current.focus()}
		>
			<div className='[@media(pointer:coarse)]:hidden'>
				<SearchInputIcon />
			</div>

			<input
				ref={ref}
				placeholder={placeholder || ''}
				value={value}
				className='placeholder:font-normal h-[42px] w-full text-[#2c2c2c] dark:placeholder:text-[#8f8f8f] dark:text-white bg-transparent pt-[11px] pb-[11px] outline-none placeholder:text-[#bfbfbf] leading-[16.8px] tracking-[-0.013em] placeholder:leading-[16.8px] placeholder:tracking-[-0.013em]'
				onChange={e => onChange(e.target.value)}
			/>
		</div>
	)
}

export const TextArea = ({
	label,
	caption,
	style = '',
	defaultValue,
	placeholder = '',
	value,
	minRows,
	maxRows,
	rounded = 8,
	onChange,
	maxLength,
}) => {
	return (
		<div className={`flex flex-col ${style}`}>
			{label && (
				<div className='flex flex-row justify-between'>
					<TextSecondary
						text={label}
						style='font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]'
					/>

					{maxLength && value !== null ? (
						<div className='w-[16px] h-[16px] mr-[4px]'>
							<CircularProggressBar
								progress={value.length}
								maxWal={maxLength}
								trackColor={
									value.length === 0
										? 'stroke-[#ececec] dark:stroke-[#202436]'
										: 'stroke-[#CDD6F8] dark:stroke-[#353D5C]'
								}
								indicatorColor={
									value.length === 0 ? 'stroke-[#ececec]' : 'stroke-[#758DEC]'
								}
								trackWidth={2.67}
								indicatorWidth={2.67}
								size={18}
							/>
						</div>
					) : null}
				</div>
			)}

			<TextareaAutosize
				onChange={onChange ? e => onChange(e.target.value) : null}
				placeholder={placeholder || ''}
				defaultValue={defaultValue ? defaultValue : null}
				className='hover:inner-border-[1px] bg-[#f6f6f8] dark:bg-[#2c2c2c] dark:placeholder:text-[#8f8f8f] dark:text-white transition duration-[250ms] hover:inner-border-[#5875e8] placeholder:font-normal placeholder:text-[#bfbfbf] placeholder:leading-[18px] placeholder:tracking-[-0.015em]'
				style={{
					whiteSpace: 'pre-line',
					resize: 'none',
					padding: 12,
					borderRadius: rounded,
					outline: 'none',
					fontSize: '14px',
					fontWeight: 400,
					lineHeight: '18px',
					letterSpacing: '-0.015em',
				}}
				value={value ? value : ''}
				maxLength={maxLength}
				maxRows={maxRows && maxRows}
				minRows={minRows && minRows}
			/>

			{caption && (
				<p className='text-[13px] leading-[16px] tracking-[-0.351px] mt-[3px] text-[#F0BB31]'>
					{caption}
				</p>
			)}
		</div>
	)
}

export const MessengerSearchInput = ({
	label = '',
	caption = '',
	placeholder = '',
	value,
	defaultValue,
	searchIcon = true,
	showCross = false,
	onChange,
	onKeyDown = () => {},
}) => {
	const ref = useRef(null) // чтобы при нажатии на весь иблок инпута происходила фокусировка

	return (
		<div className='flex flex-col w-full'>
			{label && (
				<TextSecondary
					text={label}
					style='font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]'
				/>
			)}

			<div
				className='dark:placeholder:text-[#8f8f8f] bg-[#f6f6f8] dark:bg-[#2c2c2c] text-[#2c2c2c] dark:text-white rounded-[8px] [@media(pointer:coarse)]:max-w-[468px] w-full [@media(pointer:coarse)]:w-full mx-auto [@media(pointer:coarse)]:pl-[12px] [@media(pointer:coarse)]:rounded-[20px] cursor-text flex items-center flex-row gap-[8px] transition duration-[250ms] hover:inner-border-[1px] hover:inner-border-[#5875e8]'
				onClick={() => ref.current.focus()}
			>
				{searchIcon && (
					<div className='[@media(hover)]:hidden'>
						<SearchInputIcon />
					</div>
				)}

				<input
					ref={ref}
					onChange={onChange ? e => onChange(e.target.value) : null}
					placeholder={placeholder || ''}
					defaultValue={defaultValue ? defaultValue : null}
					value={value}
					className=' placeholder:font-normal h-[42px] dark:placeholder:text-[#8f8f8f] dark:text-white  w-full [@media(pointer:coarse)]:pl-0 pl-[12px] pr-[12px] bg-transparent pt-[11px] pb-[11px] outline-none placeholder:text-[#bfbfbf] leading-[18px] tracking-[-0.013em] placeholder:leading-[18px] placeholder:tracking-[-0.013em]'
					onKeyDown={event => onKeyDown(event.key)}
				/>

				{/* cross icon */}
				{showCross && (
					<svg
						onClick={() => onChange('')}
						className='cursor-pointer mx-[12px]'
						width='16'
						height='16'
						viewBox='0 0 16 16'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							className='stroke-[#bfbfbf] dark:stroke-[#8f8f8f]'
							d='M12.1237 3.87542L7.88102 8.11806L6.82036 9.17872L3.87408 12.125'
							stroke-width='1.5'
							stroke-linecap='round'
						/>
						<path
							className='stroke-[#bfbfbf] dark:stroke-[#8f8f8f]'
							d='M12.1262 12.1246L7.88356 7.88194L6.8229 6.82128L3.87662 3.875'
							stroke-width='1.5'
							stroke-linecap='round'
						/>
					</svg>
				)}
				{/* cross icon */}
			</div>

			{caption && (
				<TextCaption
					text={caption}
					style='text-[13px] leading-[15.6px] select-none tracking-[-0.027em] mt-[3px]'
				/>
			)}
		</div>
	)
}
