import {firstStepFetch, fetchAllCountriesCovidStats, fetchContinentCountriesCovidStats, fetchCountryCovidStats} from './functions.js';
import MyRequest from '../my_request.js';

// 'http://corona-api.com/countries/MY';

const countriesISO_url = 'http://localhost:8000/ISO-countries';
const allCountries_url = 'http://localhost:8000/all_countries';
const continentCountries_url = 'http://localhost:8000/africa_continent';
const allCountriesCovid_url = 'http://localhost:8000/covid_all_countries';
const country_url = 'https://pkgstore.datahub.io/core/country-list/data_json/data/8c458f2d15d9f2119654b29ede6e45b8/data_json.json';
const countryCovid_url = 'http://localhost:8000/countryCovid_url';

const dropDownListener = document.addEventListener('change', (e) => {
    
    if (e.target.className === 'continent-select') {
        const continentSelectElement = document.querySelector('.continent-select');
        let myRequest = null;
        
        if (continentSelectElement.value === 'All') {
            myRequest = new MyRequest(continentSelectElement.value, allCountries_url, fetchAllCountriesCovidStats, allCountriesCovid_url);
        } else {
            myRequest = new MyRequest(continentSelectElement.value, continentCountries_url, fetchContinentCountriesCovidStats, allCountriesCovid_url);
        }

        firstStepFetch(myRequest)

    } else if (e.target.className === 'country-select') {
        const countrySelectElement = document.querySelector('.country-select');
        const myRequest = new MyRequest(countrySelectElement.value, country_url, fetchCountryCovidStats, countryCovid_url);

        firstStepFetch(myRequest)
    }
}) 



export {dropDownListener};