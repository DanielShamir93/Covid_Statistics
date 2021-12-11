import {firstStepFetch, fetchAllCountriesCovidStats, fetchContinentCountriesCovidStats, fetchCountryCovidStats} from './functions.js';
import MyRequest from '../modules/my_request.js';
import { apis } from '../apis.js';

const dropDownListener = document.addEventListener('change', (e) => {

    if (e.target.className === 'continent-select' || e.target.className === 'country-select') {
        const continentSelectElement = document.querySelector('.continent-select');
        const continentName = continentSelectElement.value;
        let myRequest = null;
    
        if (e.target.className === 'continent-select') {
            if (continentName === 'All') {
                myRequest = new MyRequest(continentName, apis.WorldCountries_url, fetchAllCountriesCovidStats, apis.worldCountriesCovidStats_url);
            } else {
                myRequest = new MyRequest(continentName, apis.ContinentCountries_url + continentName, fetchContinentCountriesCovidStats, apis.worldCountriesCovidStats_url);
            }    
        } else if (e.target.className === 'country-select') {
            const countrySelectElement = document.querySelector('.country-select');
            const countryName = countrySelectElement.value;
            if (countryName === 'All') {
                if (continentName === 'All') {
                    myRequest = new MyRequest(continentName, apis.WorldCountries_url, fetchAllCountriesCovidStats, apis.worldCountriesCovidStats_url);
                } else {
                    myRequest = new MyRequest(continentName, apis.ContinentCountries_url + continentName, fetchContinentCountriesCovidStats, apis.worldCountriesCovidStats_url);
                }
            } else {
                myRequest = new MyRequest(countryName, apis.WorldCountries_url, fetchCountryCovidStats, apis.countryCovidStats_url);
            }
        }

        firstStepFetch(myRequest)
    }

    
    
}) 



export {dropDownListener};