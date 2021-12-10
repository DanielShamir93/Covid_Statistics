import {fetchCountriesNames, fetchAllContinentsCovidStats} from './functions.js';

const dropDownListener = document.addEventListener('change', (e) => {
    const continentSelectElement = document.querySelector('.continent-select');
    if (e.target.className === 'continent-select') {
        fetch(continentSelectElement.value)
    }
}) 



export {dropDownListener};