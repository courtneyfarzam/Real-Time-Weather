var app = document.querySelector('.weather-app');
var dailyTemp = document.querySelector('.temperature');
var date = document.querySelector('.date');
var conditionOutput = document.querySelector('.condition');
var nameOutput = document.querySelector('.city-name');
var icon = document.querySelector('.icon');
var humidityOutput = document.querySelector('.humidity');
var windOutput = document.querySelector('.wind');
var uvIndex = document.querySelector('uv-index');
var weeklyTemp = document.querySelector('.weekly-temp');
var weeklyWind = document.querySelector('.weekly-wind');
var weeklyHumidity = document.querySelector('.weekly-humidity');
var form = document.getElementById('locationInput');
var search = document.querySelector('.search-city');
var btn = document.querySelector('.search-button');
var cities = document.querySelectorAll('.city');

let cityInput = "London";

cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        cityInput = e.target.innerHTML;

        fetchWeather();

        app.style.opacity = '0';
    })
})

form.addEventListener('submit', (e) => {
    if (search.value.length == 0) {
        alert('Please input a city name.');
    }
    else {
        cityInput = search.value;
    }

    fetchWeather();

    search.value = '';

    app.style.opacity = '0';

    e.preventDefault();
});

function dayOfWeek(day, month, year) {
    const weekday = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];
    return weekday[new Date(`${day}/${month}/${year}`).getDay()];
};

function fetchWeather() {
    fetch(`https://api.weatherapi.com/v1/current.json?key=92f58b8d29e5240f313467eab70b0b56&q=${cityInput}`)
}

.then(response => response.json())
.then(data => {
    console.log(data);

    temp.InnerHTML = data.current.temp_c + '&#176;'
    conditionOutput.innerHTML = data.current.condition.text;
})
