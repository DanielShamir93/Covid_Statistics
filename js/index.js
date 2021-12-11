import { chart } from './chart/chart.js';
import { dropDownListener } from './chart/listeners.js';
import { firstStepFetch, fetchAllCountriesCovidStats } from './chart/functions.js';
import MyRequest from './my_request.js';
import { apis } from './apis.js';

// const countriesISO_url = 'https://pkgstore.datahub.io/core/country-list/data_json/data/8c458f2d15d9f2119654b29ede6e45b8/data_json.json';
const world_url = 'http://localhost:8000/all_countries';
const worldCovid_url = 'http://localhost:8000/covid_all_countries';

const myRequest1 = new MyRequest('All', apis.WorldCountries_url, fetchAllCountriesCovidStats, apis.worldCountriesCovidStats_url);



firstStepFetch(myRequest1);




