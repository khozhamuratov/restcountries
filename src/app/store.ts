import { configureStore } from '@reduxjs/toolkit'
import countriesSlice from '../features/countries/countriesSlice'

export const store = configureStore({
	reducer: {
		countries: countriesSlice,
		country: countriesSlice,
		filteredCountries: countriesSlice,
		selectedRegion: countriesSlice,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
