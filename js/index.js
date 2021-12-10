import {chart} from './chart/chart.js';
import {fetchCountriesNames, fetchAllCountriesCovidStats} from './chart/functions.js';
import MyRequest from './my_request.js';
import {dropDownListener} from './chart/listeners.js';

// const countriesISO_url = 'https://pkgstore.datahub.io/core/country-list/data_json/data/8c458f2d15d9f2119654b29ede6e45b8/data_json.json';
const countriesISO_url = 'http://localhost:8000/ISO-countries';
const world_url = 'http://localhost:8000/all_countries';
const continent_url = 'http://localhost:8000/africa_continent';

const worldCovid_url = 'http://localhost:8000/covid_all_countries';
const countryCovid_url = ' http://corona-api.com/countries/ZW';

const myRequest1 = new MyRequest('All', world_url, fetchAllCountriesCovidStats, worldCovid_url);
const myRequest2 = new MyRequest('Africa', continent_url, fetchAllCountriesCovidStats, worldCovid_url);


fetchCountriesNames(myRequest1);




