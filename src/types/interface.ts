export interface CountriesInterface {
	name: string
	population: string
	region: string
	capital: string
	flags: {
		svg: string
		png: string
	}
	index: number
}

export interface CountryInterface {
	nativeName: string
	population: string
	region: string
	subregion: string
	capital: string
	flags: {
		svg: string
		png: string
	}
	currencies?: [
		{
			name: string
		}
	]
	languages?: [
		{
			name: string
		}
	]
	topLevelDomain: string
}
