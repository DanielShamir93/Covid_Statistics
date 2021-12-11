import { dropDownListener } from './chart/listeners.js';
import { firstStepFetch, fetchAllCountriesCovidStats } from './chart/functions.js';
import MyRequest from './modules/my_request.js';
import { apis } from './apis.js';


firstStepFetch(
    new MyRequest('All', apis.WorldCountries_url, fetchAllCountriesCovidStats, apis.worldCountriesCovidStats_url)
);




