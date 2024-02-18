import { createSlice } from '@reduxjs/toolkit'
import { CountryInterface } from '../../types/interface'
import { fetchAllCountries } from './countriesActions'

interface CountriesState {
	countries: []
	country: CountryInterface
	darkMode: boolean
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
	darkMode: false,
}

export const countriesSlice = createSlice({
	name: 'countries',
	initialState,
	reducers: {
		countryData: (state, action) => {
			state.country = action.payload
		},
		updateCountries: (state, action) => {
			state.countries = action.payload
		},
		changeTheme: state => {
			state.darkMode = !state.darkMode
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

export const { countryData, updateCountries, changeTheme } =
	countriesSlice.actions
export default countriesSlice.reducer
