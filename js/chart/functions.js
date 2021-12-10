import { chart } from './chart.js';

// Fetch and assign all countries names by requested by continents in an object
const fetchCountriesNames = async (myRequest) => {
    try {
        const response = await axios.get(myRequest.url);
        const resultObject = {
            // { continent: [...countries] }
        };

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
        } else if (['Asia', 'Africa', 'Americas', 'Antarctica', 'Europe', 'Oceania'].includes(myRequest.name)) {
            // requested all countries of specific continent
            resultObject[myRequest.name] = [];
            response.data.forEach((country) => {
                resultObject[myRequest.name].push(country.name.common);
            });
        } else {
            // requested specific country

        }

        setDropDowns(resultObject);
        myRequest.concatenate.fetchFunction(myRequest.concatenate.url, resultObject);
        

      } catch (error) {
        console.error(error);
    }
}

const fetchContinentCountriesCovidStats = async (url, continentCountriesObject) => {
    try {
        const response = await axios.get(url);
        const resultObject = {
            // { countryName : { confirmed: _, deaths: _, recovered: _, critical: _ }, ... }
        };

        const countriesCovidStatsArray = response.data.data;

        for (let continent in continentCountriesObject) {
            const continentCountriesArray = continentCountriesObject[continent];
            for (let country of continentCountriesArray) {
                const countryCovidStats = countriesCovidStatsArray.find((countryCovidStats) => countryCovidStats.name === country);
                if (countryCovidStats) {
                    let countryCovidStatsObject = {
                        confirmed: countryCovidStats.latest_data.confirmed, 
                        deaths: countryCovidStats.latest_data.deaths, 
                        recovered: countryCovidStats.latest_data.recovered, 
                        critical: countryCovidStats.latest_data.critical
                    }
                    resultObject[country] = countryCovidStatsObject;
                }
            }
        }

        setChart(resultObject)

    } catch (error) {
        console.error(error);
    }
}

// Fetch and assign all countries properties into the chart
const fetchAllCountriesCovidStats = async (url, allContinentsObject) => {
    try {
        const response = await axios.get(url);
        const resultObject = {
            Asia: {confirmed: 0, deaths: 0, recovered: 0, critical: 0},
            Africa: {confirmed: 0, deaths: 0, recovered: 0, critical: 0},
            Americas: {confirmed: 0, deaths: 0, recovered: 0, critical: 0},
            Antarctica: {confirmed: 0, deaths: 0, recovered: 0, critical: 0},
            Europe: {confirmed: 0, deaths: 0, recovered: 0, critical: 0},
            Oceania: {confirmed: 0, deaths: 0, recovered: 0, critical: 0},
        }

        const countriesCovidStatsArray = response.data.data;
        for (let countryCovidStats of countriesCovidStatsArray) {
            for (let continent in allContinentsObject) {
                if (allContinentsObject[continent].find((country) => country === countryCovidStats.name)) {
                    let latestData = countryCovidStats.latest_data;

                    if (resultObject.hasOwnProperty(continent)) {
                        resultObject[continent].confirmed += latestData.confirmed;
                        resultObject[continent].deaths += latestData.deaths;
                        resultObject[continent].recovered += latestData.recovered;
                        resultObject[continent].critical += latestData.critical;
                    }
                    break;
                }
            }
        }

        setChart(resultObject);

    } catch (error) {
        console.error(error);
    }
}

const setChart = (countriesCovidStatsObject) => {
    const datasetsArray = chart.data.datasets;
    
    datasetsArray.forEach((dataset) => {
        dataset.data = [];
    })

    chart.data.labels = Object.keys(countriesCovidStatsObject);
    for (let country in countriesCovidStatsObject) {
        chart.data.labels
        datasetsArray[0].data.push(countriesCovidStatsObject[country].confirmed);
        datasetsArray[1].data.push(countriesCovidStatsObject[country].deaths);
        datasetsArray[2].data.push(countriesCovidStatsObject[country].recovered);
        datasetsArray[3].data.push(countriesCovidStatsObject[country].critical);
    }

    chart.update();
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



export {fetchCountriesNames, fetchAllCountriesCovidStats, fetchContinentCountriesCovidStats};