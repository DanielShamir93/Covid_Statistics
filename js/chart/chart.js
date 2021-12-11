const data = {
    labels: ['Asia', 'Africa', 'America', 'Antarctica', 'Europe', 'Oceania'],
    datasets: [
        {
            label: 'Confirmed Cases',
            data: [],
            backgroundColor: 'rgba(128, 0, 128, 0.6)',
            borderRadius: 10,
            hoverBackgroundColor: 'purple',
        },
        {
            label: 'Number Of Deaths',
            data: [],
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            borderRadius: 10,
            hoverBackgroundColor: 'black',
        },
        {
            label: 'Number of recovered',
            data: [],
            backgroundColor: 'rgba(0, 128, 0, 0.7)',
            borderRadius: 10,
            hoverBackgroundColor: 'green',
        },
        {
            label: 'Number Of Critical Condition',
            data: [],
            backgroundColor: 'rgba(255, 166, 0, 0.7)',
            borderRadius: 10,
            hoverBackgroundColor: 'orange',
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
                        family: 'Patua One', // Your font family
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
                        family: 'Patua One', // Your font family
                        size: 20,
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
                        family: 'Patua One',
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

export { chart };

