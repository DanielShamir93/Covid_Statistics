import {fetchCountriesNames, fetchAllCountriesCovidStats, fetchContinentCountriesCovidStats} from './functions.js';
import MyRequest from '../my_request.js';

const countriesISO_url = 'http://localhost:8000/ISO-countries';
const allCountries_url = 'http://localhost:8000/all_countries';
const continentCountries_url = 'http://localhost:8000/africa_continent';
const allCountriesCovid_url = 'http://localhost:8000/covid_all_countries';
const countryCovid_url = ' http://corona-api.com/countries/ZW';

const dropDownListener = document.addEventListener('change', (e) => {
    const continentSelectElement = document.querySelector('.continent-select');
    const countrySelectElement = document.querySelector('.country-select');
    


    if (e.target.className === 'continent-select') {
        let myRequest = null;
        if (continentSelectElement.value === 'All') {
            myRequest = new MyRequest(continentSelectElement.value, allCountries_url, fetchAllCountriesCovidStats, allCountriesCovid_url)
        } else {
            myRequest = new MyRequest(continentSelectElement.value, continentCountries_url, fetchContinentCountriesCovidStats, allCountriesCovid_url)
        }
        fetchCountriesNames(myRequest)
    } else if (e.target.className === 'country-select') {
        
    }
}) 



export {dropDownListener};