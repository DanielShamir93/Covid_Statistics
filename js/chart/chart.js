// borderWidth: 1,
// borderColor: 'black',
// borderRadius: 5,
// hoverBackgroundColor: 'pink',
// hoverBorderColor: 'red',
// pointStyle: 'circle',


const data = {
    labels: ['Asia', 'Africa', 'America', 'Antarctica', 'Europe', 'Oceania'],
    datasets: [
        {
            label: 'Confirmed Cases',
            data: [],
            backgroundColor: 'purple',
        },
        {
            label: 'Number Of Deaths',
            data: [],
            backgroundColor: 'brown',
        },
        {
            label: 'Number of recovered',
            data: [],
            backgroundColor: 'orange',
        },
        {
            label: 'Number Of Critical Condition',
            data: [],
            backgroundColor: 'green',
        }
    ],
}

Chart.defaults.color = "black";
const config = {
    type: 'bar',
    data: data,
    options: {
        onHover: (e, chartElement) => {
            e.native.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
        },
        responsive: true,
        parsing: {
            xAxisKey: 'browser'
        },
        scales: {
            y: {
                ticks: {
                    font: {
                        family: 'Permanent Marker', // Your font family
                        size: 14,
                    },
                    beginAtZero: true,
                    // callback: function (value) {
                    //     return value.toString().slice(0, 2) + 'M';
                    // }
                },
            },
            x: {
                ticks: {
                    font: {
                        family: 'Permanent Marker', // Your font family
                        size: 14,
                    },
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    // This more specific font property overrides the global property
                    font: {
                        size: 20,
                        family: 'Permanent Marker',
                    }
                },
                pointLabels: {
                    font: "Permanent Marker"
                }
            }
        },
        animation: {
            duration: 2000,
            easing: 'easeInEaseOut'
        }
    }    
}

const myChart = document.querySelector('.my-chart');
const chart = new Chart(myChart, config);

const clickHandler = (e) => {
    const bar = chart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, true);
    if (bar.length > 0) {
        changeChart(bar[0].index, bar[0].datasetIndex)
    }
}

const changeChart = (index, datasetIndex) => {
    // console.log(continent)
    // chart.config.data.datasets[3].data = [10000000, 10000000,10000000,10000000];
    // chart.update();
    console.log(index, datasetIndex)


    
}

myChart.addEventListener('click', clickHandler)


export { chart };

