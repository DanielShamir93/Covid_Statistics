import { chart } from './chart.js';

const loadingLogo = document.querySelector('.loading-logo');

// Fetch and assign all countries names by requested by continents in an object
const firstStepFetch = async (myRequest) => {
    loadingLogo.style.display = 'block';
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
            setDropDowns(resultObject);

        } else if (['Asia', 'Africa', 'Americas', 'Antarctica', 'Europe', 'Oceania'].includes(myRequest.name)) {
            // requested all countries of specific continent
            resultObject[myRequest.name] = [];
            response.data.forEach((country) => {
                resultObject[myRequest.name].push(country.name.common);
            });
            setDropDowns(resultObject);

        } else {
            // requested specific country
            for (let country of response.data) {
                if (country.Name === myRequest.name) {
                    resultObject[myRequest.name] = country.Code;
                }
            }
        }

        myRequest.concatenate.fetchFunction(myRequest.concatenate.url, resultObject);
        
      } catch (error) {
        console.error(error);
    }
}

const fetchCountryCovidStats = async (url, countryObject) => {
    try {
        const response = await axios.get(url + Object.values(countryObject)[0]);
        const countryCovidStats = response.data.data;
        const country = Object.keys(countryObject)[0];
        const resultObject = {
            // { countryName : { confirmed: _, deaths: _, recovered: _, critical: _ }}
        };

        resultObject[country] = {
            confirmed: countryCovidStats.latest_data.confirmed, 
            deaths: countryCovidStats.latest_data.deaths, 
            recovered: countryCovidStats.latest_data.recovered, 
            critical: countryCovidStats.latest_data.critical,
            newConfirmed: countryCovidStats.today.confirmed, 
            newDeath: countryCovidStats.today.deaths
        }

        setChart(resultObject, 'country');

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

        setChart(resultObject, 'continent')

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

        setChart(resultObject, 'world');

    } catch (error) {
        console.error(error);
    }
}

const setChart = (resultObject, type) => {
    let datasetsArray = chart.data.datasets;
    
    datasetsArray.forEach((dataset) => {
        // Resets chart data
        dataset.data = [];
    })

    chart.data.labels = Object.keys(resultObject);
    if (type === 'world' || type === 'continent') {
        
        chart.data.datasets = datasetsArray.filter((dataset) => dataset.label !== 'New Cases' && dataset.label !== 'New Deaths')
        for (let item in resultObject) {
            datasetsArray[0].data.push(resultObject[item].confirmed);
            datasetsArray[1].data.push(resultObject[item].deaths);
            datasetsArray[2].data.push(resultObject[item].recovered);
            datasetsArray[3].data.push(resultObject[item].critical);
        }
    } else if (type === 'country') {
        if (datasetsArray.length === 4) {
            datasetsArray.push(newDataSet('New Cases', 'rgba(0, 0, 255, 0.7)', 'blue'));
            datasetsArray.push(newDataSet('New Deaths', 'rgba(255, 0, 0, 0.7)', 'red'));
        }
        for (let item in resultObject) {
            datasetsArray[0].data.push(resultObject[item].confirmed);
            datasetsArray[1].data.push(resultObject[item].deaths);
            datasetsArray[2].data.push(resultObject[item].recovered);
            datasetsArray[3].data.push(resultObject[item].critical);
            datasetsArray[4].data.push(resultObject[item].newConfirmed);
            datasetsArray[5].data.push(resultObject[item].newDeath);
        }
    }
    
    chart.update();
    setTimeout(() => {
        loadingLogo.style.display = 'none';
    }, 2000)
    
}

const newDataSet = (name, backgroundColor, hoverBackgroundColor) => {
    return {
        label: name,
        data: [],
        borderRadius: 10,
        backgroundColor,
        hoverBackgroundColor
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



export {firstStepFetch, fetchAllCountriesCovidStats, fetchContinentCountriesCovidStats, fetchCountryCovidStats};