import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateCountries } from '../features/countries/countriesSlice'

const regions = [
	{
		label: 'All',
		name: 'all',
	},
	{
		label: 'Africa',
		name: 'africa',
	},
	{
		label: 'Americas',
		name: 'americas',
	},
	{
		label: 'Asia',
		name: 'asia',
	},
	{
		label: 'Europe',
		name: 'europe',
	},
	{
		label: 'Oceania',
		name: 'oceania',
	},
]

const FilterCountries = () => {
	const dispatch = useDispatch()
	const [selectedRegionName, setSelectedRegionName] = useState<string>('all')
	const fetchRegion = async (regionName: string) => {
		setSelectedRegionName(regionName)
		if (regionName === 'all') {
			const res = await fetch('https://restcountries.com/v3.1/all')
			const response = await res.json()
			dispatch(updateCountries(response))
		} else {
			const res = await fetch(
				`https://restcountries.com/v3.1/region/${regionName}`
			)
			const response = await res.json()
			dispatch(updateCountries(response))
		}
	}
	return (
		<FormControl variant='outlined' sx={{ m: 1, minWidth: 120 }} size='small'>
			<InputLabel>Region</InputLabel>
			<Select label='Region' value={selectedRegionName}>
				{regions.map(item => (
					<MenuItem
						onClick={() => fetchRegion(item.name)}
						value={item.name}
						key={item.label}
					>
						{item.label}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	)
}

export default FilterCountries
