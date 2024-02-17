import { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { countryData } from '../features/countries/countriesSlice'

const Country = () => {
	const { country } = useAppSelector(select => select.country)
	const dispatch = useAppDispatch()
	const [borderCountries, setBorderCountry] = useState<string[]>([])
	let { name } = useParams()
	const fetchCountryData = useCallback(async (name: string) => {
		try {
			const url = `https://restcountries.com/v2/name/${name}`
			const response = await fetch(url)
			const data = await response.json()
			dispatch(countryData(data[0]))
			data[0]?.borders?.forEach((border: string) => {
				if (border) {
					findCountryData(border)
				}
			})
			setBorderCountry([])
		} catch (error) {
			console.log(error)
		}
	}, [])

	const findCountryData = useCallback(async (border: string) => {
		try {
			const url = `https://restcountries.com/v2/alpha/${border}`
			const response = await fetch(url)
			const data = await response.json()
			setBorderCountry(cur => [...cur, data.name])
		} catch (error) {
			console.log(error)
		}
	}, [])

	useEffect(() => {
		if (name) {
			fetchCountryData(name)
		}
	}, [fetchCountryData, name])

	return (
		<div className='flex flex-col items-center justify-center w-full h-[80vh]'>
			<Link
				className='relative right-[400px] bottom-[50px] px-4 border rounded-md hover:bg-slate-300'
				to={'/'}
			>
				Back
			</Link>
			<section className='flex gap-10 items-center justify-center'>
				<div>
					<img src={country.flags?.png || country.flags.svg} />
				</div>
				<div className='flex flex-col'>
					<h1 className='text-[20px] font-bold italic'>{country.nativeName}</h1>
					<div>
						<div className='grid text-[16px] font-bold grid-cols-2 grid-rows-5'>
							<p>
								Название:{' '}
								<span className=' font-normal'>{country.nativeName}</span>
							</p>
							<p>
								Население:{' '}
								<span className=' font-normal'>{country.population}</span>
							</p>
							<p>
								Регион: <span className=' font-normal'>{country.region}</span>
							</p>
							<p>
								Субрегион:{' '}
								<span className=' font-normal'>{country.subregion}</span>
							</p>
							<p>
								Столица: <span className=' font-normal'>{country.capital}</span>
							</p>
							<p>
								Домен верхнего уровня:{' '}
								<span className=' font-normal'>{country.topLevelDomain}</span>
							</p>
							<p>
								Валюты:{' '}
								<span className=' font-normal'>
									{country.currencies?.[0].name}
								</span>
							</p>
							<p>
								Языки:{' '}
								<span className=' font-normal'>
									{country.languages?.[0].name}
								</span>
							</p>
						</div>
					</div>
					<div className='flex gap-2 items-center justify-center'>
						<p>Приграничные страны:</p>
						{borderCountries.map(item => (
							<Link
								className='px-2 bg-slate-200 border rounded-md shadow-lg text-nowrap text-[12px]'
								to={`/${item}`}
							>
								{item}
							</Link>
						))}
					</div>
				</div>
			</section>
		</div>
	)
}

export default Country
