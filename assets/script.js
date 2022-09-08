var app = document.querySelector('.weather-app');
var forecast = document.querySelector('#weather-forecast');

var weeklyTemp = document.querySelector('.weekly-temp');
var weeklyWind = document.querySelector('.weekly-wind');
var weeklyHumidity = document.querySelector('.weekly-humidity');
var form = document.getElementById('locationInput');
var search = document.querySelector('.search-city');
var btn = document.querySelector('.submit');
var cities = document.querySelectorAll('.city');


let cityInput = "London";
const weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const months = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec']

var kToF = function(k){
    return Math.floor((k - 273.15) * 1.8 + 32)
};

cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        cityInput = e.target.innerHTML;

        fetchDailyWeather();
        fetchWeeklyWeather();
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
    fetchWeeklyWeather();

    search.value = '';

    e.preventDefault();
});

function fetchDailyWeather() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=92f58b8d29e5240f313467eab70b0b56`)

    .then(response => response.json())
    .then(data => {
        console.log(data);

        var dateOutput = document.querySelector('.date');
        var currentDate = new Date();
        const wd = weekday[currentDate.getDay()]; 
        const m = months[currentDate.getDate()];
        const d = currentDate.getDate();
        const y = currentDate.getFullYear();
        dateOutput.innerHTML = `${wd} ${m} ${d}, ${y}`;

        cityName = document.querySelector('.city-name')
        cityName.innerHTML = cityInput;

        var dailyTemp = document.querySelector('.temperature');
        dailyTemp.innerHTML = `${kToF(data.main.temp)}&#176;F`;

        var conditionOutput = document.querySelector('.condition');
        conditionOutput.innerHTML = data.weather[0].description;

        var icon = document.querySelector('.icon');
        icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        icon.style.height = '54px';
        icon.style.width = '54ox';

        var humidityOutput = document.querySelector('.humidity');
        humidityOutput.innerHTML = `${data.main.humidity}%`;

        var windOutput = document.querySelector('.wind');
        windOutput.innerHTML = `${data.wind.speed} mph`;

        let lat = data.coord.lat;
        let lon = data.coord.lon;

        fetch(`https://api.openweathermap.org/data/2.5/uvi?appid=92f58b8d29e5240f313467eab70b0b56&lat=${lat}&lon=${lon}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)

                var uvIndex = document.querySelector('#uv-index')
                var uvi = data.value;
                uvIndex.innerHTML = uvi;

                uvIndex.className = "";

                if(uvi < 4) {
                    uvIndex.setAttribute('class', 'low-uv');
                }

                else if(uvi < 8) {
                    uvIndex.setAttribute('class', 'medium-uv'); 
                }

                else {
                    uvIndex.setAttribute('class', 'high-uv');
                }
            })   
    })

    // YOU NEED TO ADD UV INDEX.

.catch(() => {
    alert('Unable to connect to Weather.com');
    app.style.opacity = '1';
})

}

function fetchWeeklyWeather() {
    fetch(`api.openweathermap.org/data/2.5/forecast/daily?q=${cityInput}&appid=92f58b8d29e5240f313467eab70b0b56`)
    .then(response => response.json())
    .then(data => {
        console.log(data)


    })

}

fetchDailyWeather();


