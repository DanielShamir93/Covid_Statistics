import { chart } from './chart.js';

// Fetch and assign all countries names by requested by continents in an object
const fetchCountriesNames = async (myRequest) => {
    try {
        const response = await axios.get(myRequest.url);
        // {continent: [...countries]}
        const resultObject = {};

        if (myRequest.name === 'All') {
            response.data.forEach((country) => {
                if (country.region.length > 0) {
                    // County's continent exists and this continent requested
                    if (resultObject.hasOwnProperty(country.region)) {
                        resultObject[country.region].push(country.name.common);
                    } else {
                        resultObject[country.region] = [country.name.common];
                    }
                }
            });
            console.log(resultObject)
        } else if (['Asia', 'Africa', 'Americas', 'Antarctica', 'Europe', 'Oceania'].includes(myRequest.name)) {
            // requested all countries of specific continent
            resultObject[myRequest.name] = [];
            resultObject['shortname-format']
            response.data.forEach((country) => {
                resultObject[myRequest.name].push(country.name.common);
            });
            console.log(resultObject);
        } else {
            // requested specific country

        }

        setDropDowns(resultObject);
        // myRequest.concatenate.fetchFunction(myRequest.concatenate.url, resultObject);
        

      } catch (error) {
        console.error(error);
    }
}

let isOnload = true;
const setDropDowns = (regionsObject) => {
    if (isOnload) {
        // Set continents dropdown
        const continentSelectElement = document.querySelector('.continent-select');
        continentSelectElement.innerHTML = '<option value="All">All</option>';
        const continents = Object.keys(regionsObject);
        for (let continent of continents) {
            let option = document.createElement('option');
            option.textContent = continent;
            option.value = continent;
            continentSelectElement.appendChild(option);
            isOnload = false;
        }
    }
    
    // Set countries dropdown
    const countrySelectElement = document.querySelector('.country-select');
    const countries = Object.values(regionsObject);
    
    countrySelectElement.innerHTML = '<option value="All">All</option>';
    for (let country of countries.flat()) {
        let option = document.createElement('option');
        option.textContent = country;
        option.value = country;
        countrySelectElement.appendChild(option);
    }
}


const fetchSpecificContinentCovidStats = async (url, countriesByContinentObject) => {
    try {
        const response = await axios.get(url);
        const resultObject = {};

        



    } catch (error) {
        console.error(error);
    }
}

// Fetch and assign all countries properties into the chart
const fetchAllContinentsCovidStats = async (url, countriesByAllContinentsObject) => {
    try {
        const response = await axios.get(url);
        const continentsCovidStatsObject = {
            Asia: {confirmed: 0,deaths: 0, recovered: 0, critical: 0},
            Africa: {confirmed: 0,deaths: 0, recovered: 0, critical: 0},
            Americas: {confirmed: 0,deaths: 0, recovered: 0, critical: 0},
            Antarctica: {confirmed: 0,deaths: 0, recovered: 0, critical: 0},
            Europe: {confirmed: 0,deaths: 0, recovered: 0, critical: 0},
            Oceania: {confirmed: 0,deaths: 0, recovered: 0, critical: 0},
        }

        const countriesCovidStatsArray = response.data.data;
        for (let countryCovidStats of countriesCovidStatsArray) {
            for (let continent in countriesByAllContinentsObject) {
                if (countriesByAllContinentsObject[continent].find((country) => country === countryCovidStats.name)) {
                    let latestData = countryCovidStats.latest_data;

                    if (continentsCovidStatsObject.hasOwnProperty(continent)) {
                        continentsCovidStatsObject[continent].confirmed += latestData.confirmed;
                        continentsCovidStatsObject[continent].deaths += latestData.deaths;
                        continentsCovidStatsObject[continent].recovered += latestData.recovered;
                        continentsCovidStatsObject[continent].critical += latestData.critical;
                    }
                    break;
                }
            }
        }

        setChart(continentsCovidStatsObject);

    } catch (error) {
        console.error(error);
    }
}

const setChart = (continentsCovidStatsObject) => {
    const datasetsArray = chart.data.datasets;

    for(const continent in continentsCovidStatsObject) {
        datasetsArray[0].data.push(continentsCovidStatsObject[continent].confirmed);
        datasetsArray[1].data.push(continentsCovidStatsObject[continent].deaths);
        datasetsArray[2].data.push(continentsCovidStatsObject[continent].recovered);
        datasetsArray[3].data.push(continentsCovidStatsObject[continent].critical);
    }

    chart.update();
}




export {fetchCountriesNames, fetchAllContinentsCovidStats};