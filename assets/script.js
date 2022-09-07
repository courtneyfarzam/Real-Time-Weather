var app = document.querySelector('.weather-app');
var dailyTemp = document.querySelector('.temperature');
var dateOutput = document.querySelector('.date');
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
var btn = document.querySelector('.submit');
var cities = document.querySelectorAll('.city');

let cityInput = "London";

cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        cityInput = e.target.innerHTML;

        fetchDailyWeather();
        // fetchWeeklyWeather();

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

    fetchDailyWeather();
    // fetchWeeklyWeather();

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

function fetchDailyWeather() {
    // fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=1&appid=92f58b8d29e5240f313467eab70b0b56`)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=92f58b8d29e5240f313467eab70b0b56`)
    // fetch(`https://api.weatherapi.com/v1/current.json?key=92f58b8d29e5240f313467eab70b0b56&q=${cityInput}`)


.then(response => response.json())
.then(data => {
    console.log(data);

    dailyTemp.InnerHTML = data.main.temp + '&#176;'
    conditionOutput.innerHTML = data.weather.main;

    // const date = data.location.localtime;
    // const y = parseInt(date.substr(0, 4));
    // const d = parseInt(date.substr(5, 2));
    // const m = parseInt(date.substr(8, 2));

    // dateOutput.innerHTML = `${dayOfWeek(d, m, y)} ${d} - ${m} - ${y}`;

    humidityOutput.innerHTML = data.main.humidity + '%';
    windOutput.innerHTML = data.wind.speed+ 'mph';

    console.log(data.main.temp)
    // console.log(data.weather.description)
    console.log(data.main.humidity)
    console.log(data.wind.speed)

    
    
})

// .catch(() => {
//     alert('City not found, please try again');
//     app.style.opacity = '1';
// })

}
