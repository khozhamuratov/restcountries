import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './app/hooks'
import Countries from './components/Countries'
import Country from './components/Country'
import Header from './components/Header'
import { fetchAllCountries } from './features/countries/countriesActions'
import Layout from './layout/layout'

const App = () => {
	const {} = useAppSelector(selector => selector.countries)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchAllCountries())
	}, [])

	return (
		<>
			<div className='flex flex-col'>
				<Header />
			</div>
			<div>
				<Routes>
					<Route path='/' element={<Layout />}>
						<Route path='/' element={<Countries />} />
						<Route path='/:name' element={<Country />} />
					</Route>
				</Routes>
			</div>
		</>
	)
}

export default App
