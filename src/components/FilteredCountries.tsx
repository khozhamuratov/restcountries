import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../app/hooks'

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

const FilteredCountries = () => {
	let { selectedRegion } = useAppSelector(select => select.selectedRegion)
	let { countries } = useAppSelector(select => select.countries)
	let { filteredCountries } = useAppSelector(select => select.filteredCountries)
	const dispatch = useAppDispatch()
	const fetchRegion = async (regionName: string) => {
		selectedRegion = regionName
		console.log(regionName)

		if (selectedRegion === 'all') {
			const res = await fetch('https://restcountries.com/v3.1/all')
			countries = await res.json()
		} else {
			const res = await fetch(
				`https://restcountries.com/v3.1/region/${selectedRegion}`
			)
			filteredCountries = await res.json()
			console.log(filteredCountries)
		}
	}
	return (
		<FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
			<InputLabel>Region</InputLabel>
			<Select label='Region' value={selectedRegion}>
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

export default FilteredCountries
