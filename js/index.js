import { dropDownListener } from './chart/listeners.js';
import { firstStepFetch, fetchAllCountriesCovidStats } from './chart/functions.js';
import MyRequest from './modules/my_request.js';
import { apis } from './apis.js';


const myRequest1 = new MyRequest('All', apis.WorldCountries_url, fetchAllCountriesCovidStats, apis.worldCountriesCovidStats_url);
firstStepFetch(myRequest1);




