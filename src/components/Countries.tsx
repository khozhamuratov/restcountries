import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { CountryInterface } from '../types/interface'
import FilteredCountries from './FilteredCountries'

const Countries = () => {
	const [inputValue, setInputValue] = useState<string>('')
	const [countryData, setCountryData] = useState<CountryInterface | null>(null)
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value)
	}
	const { countries } = useAppSelector(select => select.countries)
	const { selectedRegion } = useAppSelector(select => select.selectedRegion)
	const { filteredCountries } = useAppSelector(
		select => select.filteredCountries
	)

	const searchCountry = async () => {
		try {
			const response = await fetch(
				`https://restcountries.com/v3.1/name/${inputValue}`
			)
			const data = await response.json()
			if (data && data.length > 0) {
				const {
					name,
					capital,
					population,
					flags,
					subregion,
					region,
					topLevelDomain,
				} = data[0]
				setCountryData({
					name,
					capital,
					population,
					flags,
					subregion,
					region,
					topLevelDomain,
				})
			} else {
				setCountryData(null)
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
						placeholder='Search country'
						className='border px-4 py-2 border-r-0 outline-none rounded-l-md'
						onChange={handleInputChange}
					/>
					<button
						className='border py-2 border-l-0 rounded-r-md px-2'
						onClick={searchCountry}
					>
						Search
					</button>
				</form>
				<FilteredCountries />
			</div>
			<div className='grid grid-cols-4 gap-12 w-[70%] mx-auto'>
				{countryData && (
					<Link
						to={`${countryData.name.common}`}
						className='w-full shadow-lg flex flex-col gap-4'
						key={countryData.population}
					>
						<img
							className='w-[350px] h-[120px]'
							src={countryData.flags?.png || countryData.flags?.svg}
						/>
						<div className='flex m-4 flex-col gap-5'>
							<h1 className='text-[18px] font-bold'>
								{countryData.name.common}
							</h1>
							<div className='flex text-[12px] flex-col'>
								<span>Население: {countryData.population}</span>
								<span>Регион: {countryData.region}</span>
								<span>Столица: {countryData.capital}</span>
							</div>
						</div>
					</Link>
				)}
				{countries.map(item => (
					<Link
						to={`${item.name.common}`}
						className='w-full shadow-lg flex flex-col gap-4'
						key={item.population}
					>
						<img
							className='w-[350px] h-[120px]'
							src={item.flags?.png || item.flags?.svg}
						/>
						<div className='flex m-4 flex-col gap-5'>
							<h1 className='text-[18px] font-bold'>{item.name.common}</h1>
							<div className='flex text-[12px] flex-col'>
								<span>Население: {item.population}</span>
								<span>Регион: {item.region}</span>
								<span>Столица: {item.capital}</span>
							</div>
						</div>
					</Link>
				))}
			</div>
		</>
	)
}

export default Countries
