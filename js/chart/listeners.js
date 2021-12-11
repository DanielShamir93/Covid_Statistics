import {firstStepFetch, fetchAllCountriesCovidStats, fetchContinentCountriesCovidStats, fetchCountryCovidStats} from './functions.js';
import MyRequest from '../my_request.js';
import { apis } from '../apis.js';

const dropDownListener = document.addEventListener('change', (e) => {
    
    if (e.target.className === 'continent-select') {
        const continentSelectElement = document.querySelector('.continent-select');
        let myRequest = null;
        
        const continentName = continentSelectElement.value;
        if (continentSelectElement.value === 'All') {
            myRequest = new MyRequest(continentName, apis.WorldCountries_url, fetchAllCountriesCovidStats, apis.worldCountriesCovidStats_url);
        } else {
            myRequest = new MyRequest(continentName, apis.ContinentCountries_url + continentName, fetchContinentCountriesCovidStats, apis.worldCountriesCovidStats_url);
        }

        firstStepFetch(myRequest)

    } else if (e.target.className === 'country-select') {
        const countrySelectElement = document.querySelector('.country-select');
        const myRequest = new MyRequest(countrySelectElement.value, apis.country_url, fetchCountryCovidStats, apis.countryCovidStats_url);

        firstStepFetch(myRequest)
    }
    
}) 



export {dropDownListener};