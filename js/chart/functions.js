const fetchCountriesByContinent = async (url, chainedFetchObject) => {
    try {
        const response = await axios.get(url);
        const countriesByContinentObject = {};

        response.data.forEach((country) => {
            if (country.region.length > 0) {
                if (countriesByContinentObject.hasOwnProperty(country.region)) {
                    countriesByContinentObject[country.region].push(country.name.common);
                } else {
                    countriesByContinentObject[country.region] = [country.name.common];
                }
            }
        })

        chainedFetchObject.myFetch(chainedFetchObject.url, countriesByContinentObject);

      } catch (error) {
        console.error(error);
    }
}

const fetchContinentCovidStats = async (url, countriesByContinentObject) => {
    try {
        const response = await axios.get(url);
        const continentsCovidStatsObject = {
            Asia: {
                confirmed: 0,
                deaths: 0,
                confirmed: 0,
                critical: 0
            },
            Africa: {
                confirmed: 0,
                deaths: 0,
                confirmed: 0,
                critical: 0
            },
            Americas: {
                confirmed: 0,
                deaths: 0,
                confirmed: 0,
                critical: 0
            },
            Antarctica: {
                confirmed: 0,
                deaths: 0,
                confirmed: 0,
                critical: 0
            },
            Oceania: {
                confirmed: 0,
                deaths: 0,
                confirmed: 0,
                critical: 0
            }
        }

        const countriesCovidStatsArray = response.data.data;

        for (let countryCovidStats of countriesCovidStatsArray) {
            for (let continent in countriesByContinentObject) {
                if (countriesByContinentObject[continent].find((country) => country === countryCovidStats.name)) {
                    
                    let latestData = countryCovidStats.latest_data;

                    if (continentsCovidStatsObject.hasOwnProperty(continent)) {
                        continentsCovidStatsObject[continent].confirmed += latestData.confirmed;
                        continentsCovidStatsObject[continent].deaths += latestData.deaths;
                        continentsCovidStatsObject[continent].confirmed += latestData.recovered;
                        continentsCovidStatsObject[continent].critical += latestData.critical;
                    }
                    break;
                }
            }
        }
     
        console.log(continentsCovidStatsObject)

      } catch (error) {
        console.error(error);
    }
}


export {fetchCountriesByContinent, fetchContinentCovidStats};