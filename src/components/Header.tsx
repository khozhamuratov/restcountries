import { CiDark, CiLight } from 'react-icons/ci'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../app/hooks'
import { changeTheme } from '../features/countries/countriesSlice'
import FilterCountries from './FilteredCountries'

const Header = () => {
	const { darkMode } = useAppSelector(select => select.darkmode)
	const dispatch = useDispatch()
	return (
		<section className='w-90% mx-auto flex items-center justify-center gap-5 mt-10'>
			<div className='cursor-pointer' onClick={() => dispatch(changeTheme())}>
				{!darkMode ? (
					<span className='flex items-center justify-center gap-1'>
						Тёмный режим
						<CiDark className='text-[22px]' />
					</span>
				) : (
					<span className='flex items-center justify-center gap-1'>
						Светлый режим
						<CiLight className='text-[22px]' />
					</span>
				)}
			</div>
			<FilterCountries />
		</section>
	)
}

export default Header
