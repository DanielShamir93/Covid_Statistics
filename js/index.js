import {chart} from './chart/chart.js'
import {fetchCountries, fetchContinentCovidStats} from './chart/functions.js'




const requestedObject = {
    name: 'world',
    url: 'http://localhost:8000/all_countries',
}

// const requestedObject = {
//     name: 'Africa',
//     url: 'http://localhost:8000/africa_continent',
// }

const chainedFetchObject = {
    myFetch: fetchContinentCovidStats, 
    url: 'http://localhost:8000/covid_all_countries'
}


fetchCountries(requestedObject, chainedFetchObject);




