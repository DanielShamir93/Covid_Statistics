import { chart } from './chart.js';

// Fetch and assign all countries names by requested by continents in an object
const fetchCountries = async (requestedObject, chainedFetchObject) => {
    try {
        const response = await axios.get(requestedObject.url);
        const resultObject = {};

        
        if (requestedObject.name === 'world') {
            response.data.forEach((country) => {
                if (country.region.length > 0) {
                    // County's continent exists and this continent requested
                    if (resultObject.hasOwnProperty(country.region)) {
                        resultObject[country.region].push(country.name.common);
                    } else {
                        resultObject[country.region] = [country.name.common];
                    }
                }
            })
        } else {
            // requested all countries of specific continent
            resultObject[requestedObject.name] = [];
            response.data.forEach((country) => {
                resultObject[requestedObject.name].push(country);
            });
        }

        chainedFetchObject.myFetch(chainedFetchObject.url, resultObject);

      } catch (error) {
        console.error(error);
    }
}

// Fetch and assign all countries properties into the chart
const fetchContinentCovidStats = async (url, countriesByContinentObject) => {
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
            for (let continent in countriesByContinentObject) {
                if (countriesByContinentObject[continent].find((country) => country === countryCovidStats.name)) {
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




export {fetchCountries, fetchContinentCovidStats};