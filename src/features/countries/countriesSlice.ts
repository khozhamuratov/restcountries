import { createSlice } from '@reduxjs/toolkit'
import { CountryInterface } from '../../types/interface'
import { fetchAllCountries } from './countriesActions'

interface CountriesState {
	countries: []
	country: CountryInterface
	filteredCountries: []
	selectedRegion: string
}

const initialState: CountriesState = {
	countries: [],
	country: {
		nativeName: '',
		population: '',
		region: '',
		subregion: '',
		capital: '',
		flags: { svg: '', png: '' },
		topLevelDomain: '',
		currencies: [{ name: '' }],
		languages: [{ name: '' }],
	},
	filteredCountries: [],
	selectedRegion: 'all',
}

export const countriesSlice = createSlice({
	name: 'countries',
	initialState,
	reducers: {
		countryData: (state, action) => {
			state.country = action.payload
		},
		filterCountries: (state, action) => {
			state.filteredCountries = []
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchAllCountries.fulfilled, (state, action) => {
				state.countries = action.payload
			})
			.addCase(fetchAllCountries.rejected, state => {
				state.countries = []
			})
	},
})

export const { countryData, filterCountries } = countriesSlice.actions
export default countriesSlice.reducer
