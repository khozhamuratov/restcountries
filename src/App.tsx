import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './app/hooks'
import Countries from './components/Countries'
import Country from './components/Country'
import Header from './components/Header'
import { fetchAllCountries } from './features/countries/countriesActions'
import Layout from './layout/layout'

const App = () => {
	const { darkMode } = useAppSelector(selector => selector.darkmode)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchAllCountries())
	}, [])

	return (
		<main className={`${darkMode ? 'bg-slate-900 text-white' : 'bg-white'}`}>
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
		</main>
	)
}

export default App
