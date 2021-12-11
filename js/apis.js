const proxy = 'https://intense-mesa-62220.herokuapp.com/';

const apis = {
    // countries APIs
    WorldCountries_url: proxy + 'https://restcountries.herokuapp.com/api/v1',
    ContinentCountries_url: proxy + 'https://restcountries.herokuapp.com/api/v1/region/', // missing :region_name at the end point
    
    // covid stats APIs
    worldCountriesCovidStats_url: proxy + 'https://corona-api.com/countries',
    countryCovidStats_url: proxy + 'http://corona-api.com/countries/', // missing :ISO 3166-1 alpha-2 format of country code 
    
}

export { apis };
