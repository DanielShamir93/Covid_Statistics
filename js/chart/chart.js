
const ctx = document.querySelector('.my-chart').getContext('2d');

const bars = {
    ConfirmedCases: {
        label: 'Confirmed Cases',
        data: [10, 10],
        backgroundColor: 'purple',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        hoverBackgroundColor: 'pink',
        hoverBorderColor: 'red',
        pointStyle: 'circle',
    },
    NumberOfDeaths: {
        label: 'Number Of Deaths',
        data: [20, 10],
        backgroundColor: 'brown',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        hoverBackgroundColor: 'pink',
        hoverBorderColor: 'red'
    },
    NumberOfRecovered: {
        label: 'Number of recovered',
        data: [30, 10],
        backgroundColor: 'orange',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        hoverBackgroundColor: 'pink',
        hoverBorderColor: 'red'
    },
    NumberOfCriticalCondition: {
        label: 'Number Of Critical Condition',
        data: [40, 10],
        backgroundColor: 'green',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        hoverBackgroundColor: 'pink',
        hoverBorderColor: 'red'
    }

}


const data = {
    labels: ['Asia', 'Africa', 'America', 'Antarctica', 'Europe', 'Oceania'],
    datasets: [
        bars.ConfirmedCases,
        bars.NumberOfDeaths,
        bars.NumberOfRecovered,
        bars.NumberOfCriticalCondition
    ],
}

const config = {
    type: 'bar',
    data: data,
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            }
        },
    }    
}

const chart = new Chart(ctx, config);

export {chart};

