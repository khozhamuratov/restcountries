import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchAllCountries = createAsyncThunk(
	'fetchAllCountries',
	async () => {
		try {
			const response = await fetch('https://restcountries.com/v3.1/all')
			return response.json()
		} catch (error) {
			console.log(error)
		}
	}
)
