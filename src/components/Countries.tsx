import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { updateCountries } from '../features/countries/countriesSlice'
import { CountriesInterface } from '../types/interface'

const Countries = () => {
	const [inputValue, setInputValue] = useState<string>('')
	const { darkMode } = useAppSelector(select => select.darkmode)
	const dispatch = useDispatch()
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value)
	}
	const { countries } = useAppSelector(select => select.countries)
	const searchCountry = async () => {
		try {
			const response = await fetch(
				`https://restcountries.com/v3.1/name/${inputValue}`
			)
			const data = await response.json()
			if (data && data.length > 0) {
				dispatch(updateCountries(data))
			} else {
				dispatch(updateCountries([]))
			}
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<>
			<div className='flex items-center justify-center gap-10 my-5'>
				<form
					onSubmit={e => {
						e.preventDefault()
						searchCountry
					}}
					className='flex items-center justify-center'
				>
					<input
						type='text'
						value={inputValue}
						placeholder='Поиск страны'
						className='border text-black px-4 py-2 border-r-0 outline-none rounded-l-md'
						onChange={handleInputChange}
					/>
					<button
						className='border py-2 border-l-0 rounded-r-md px-2 bg-white text-black'
						onClick={searchCountry}
					>
						Поиск...
					</button>
				</form>
			</div>
			<div
				className={`${
					countries.length < 5 ? 'h-screen' : ''
				} grid grid-cols-4 max-[720px]:grid-cols-2 max-[990px]:grid-cols-3 max-[520px]:grid-cols-1 py-4 gap-12 w-[70%] mx-auto`}
			>
				{countries.map(
					({
						name,
						population,
						flags,
						region,
						capital,
						index,
					}: CountriesInterface) => (
						<Link
							to={`${name.common}`}
							className={`${
								darkMode ? 'bg-slate-800' : 'bg-white'
							} w-full h-[280px] shadow-lg flex flex-col gap-4`}
							key={index}
						>
							<img
								className='w-[350px] h-[120px]'
								src={flags?.png || flags?.svg}
							/>
							<div className='flex m-4 flex-col gap-5'>
								<h1 className='text-[18px] font-bold'>{name.common}</h1>
								<div className='flex text-[12px] flex-col'>
									<span>Население: {population}</span>
									<span>Регион: {region}</span>
									<span>Столица: {capital}</span>
								</div>
							</div>
						</Link>
					)
				)}
			</div>
		</>
	)
}

export default Countries
