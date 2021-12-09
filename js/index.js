import {chart} from './chart/chart.js'
import {fetchCountriesByContinent, fetchContinentCovidStats} from './chart/functions.js'



const url1 = 'http://localhost:8000/all_countries';
const url2 = 'http://localhost:8000/covid_all_countries';

const chainedFetchObject = {
    myFetch: fetchContinentCovidStats, 
    url: url2
}

fetchCountriesByContinent(url1, chainedFetchObject);