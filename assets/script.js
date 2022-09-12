var app = document.querySelector('.weather-app');
var forecast = document.querySelector('#weather-forecast');

var form = document.getElementById('locationInput');
var search = document.querySelector('.search-city');
var btn = document.querySelector('.submit');
var cityList = document.querySelector('.cities')
var cities = document.querySelectorAll('.city');


let cityInput = "London";
const weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const months = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec']

var kToF = function(k){
    return Math.floor((k - 273.15) * 1.8 + 32)
};

function cityClick(e) {
    cityInput = e.target.innerHTML;
    cities.forEach((city) => {
        city.addEventListener('click', (e) => {
            cityInput = e.target.innerHTML;
        })
    })

    fetchDailyWeather(cityInput);
    fetchWeeklyWeather(cityInput);
}

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

    fetchDailyWeather(cityInput);
    fetchWeeklyWeather(cityInput);
    saveCity();

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
        dailyTemp.innerHTML = `${kToF(data.main.temp)}&#176;`;

        var conditionOutput = document.querySelector('.condition');
        conditionOutput.innerHTML = data.weather[0].description;

        var icon = document.querySelector('.icon');
        icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        icon.style.height = '100px';
        icon.style.width = '80ox';

        var humidityOutput = document.querySelector('.humidity');
        humidityOutput.innerHTML = `${data.main.humidity}%`;

        var windOutput = document.querySelector('.wind');
        windOutput.innerHTML = `${data.wind.speed} mph`;

        let lat = data.coord.lat;
        let lon = data.coord.lon;

        const code = data.weather[0].id;
        
        var time = new Date()
        var localTime = time.getTime()
        var localOffset = time.getTimezoneOffset() * 60000
        var utc = localTime + localOffset
        var currentCity = utc + (1000 * data.timezone)
        var nd = new Date(currentCity)
        const currentTime = new Date(nd).getHours();
        console.log(currentTime)


        if (code == 800) {
            if (7 <= currentTime && currentTime < 20){
                app.style.backgroundImage = `url(./images/clear-day.jpg)`;
            }
            else {
                app.style.backgroundImage = `url(./images/clear-night.webp)`  
            }
        }
        else if (
            code == 801 ||
            code == 802 ||
            code == 803 ||
            code == 804 
        ) {
            if (7 <= currentTime && currentTime < 20){
                app.style.backgroundImage = `url(./images/cloudy-day.jpg)`;
            }
            else {
                app.style.backgroundImage = `url(./images/cloudy-night.jpg)`  
            }
        }
        else if (
            code == 200 ||
            code == 201 ||
            code == 202 ||
            code == 210 ||
            code == 211 ||
            code == 212 ||
            code == 221 ||
            code == 230 ||
            code == 231 ||
            code == 232 ||
            code == 781 ||
            code == 300 ||
            code == 301 ||
            code == 302 ||
            code == 310 ||
            code == 311 ||
            code == 312 ||
            code == 313 ||
            code == 314 ||
            code == 315 ||
            code == 500 ||
            code == 501 ||
            code == 502 ||
            code == 503 ||
            code == 504 ||
            code == 511 ||
            code == 520 ||
            code == 521 ||
            code == 522 ||
            code == 531
        ) {
            if (7 <= currentTime && currentTime < 20){
                app.style.backgroundImage = `url(./images/rainy-day.jpg)`;
            }
            else {
                app.style.backgroundImage = `url(./images/rainy-night.png)`  
            }
        }
        else if (
            code == 600 ||
            code == 601 ||
            code == 602 ||
            code == 611 ||
            code == 612 ||
            code == 613 ||
            code == 615 ||
            code == 616 ||
            code == 620 ||
            code == 621 ||
            code == 622 
        ){
            if (7 <= currentTime && currentTime < 20){
                app.style.backgroundImage = `url(./images/snowy-day.png)`;
            }
            else {
                app.style.backgroundImage = `url(./images/snowy-night.jpg)`  
            }
        }
        else {
            app.style.backgroundImage = `url(./images/weather.webp)`;
        };

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

// .catch(() => {
//     alert('Unable to connect to Weather.com');
//     app.style.opacity = '1';
// })

}

function fetchWeeklyWeather() {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=92f58b8d29e5240f313467eab70b0b56`)

    .then(response => response.json())
    .then(data => {
        console.log(data);

        forecast.innerHTML = '';

        for (var i = 6; i < data.list.length; i += 8){
            
            var forecastEl = document.createElement('div');
            forecastEl.setAttribute('class', 'forecast-card');

            var forecastDate = document.createElement('h3');
            forecastDate.textContent = new Date(data.list[i].dt*1000).toLocaleDateString();

            var forecastIcon = document.createElement('img');
            forecastIcon.src = `http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`;
            forecastIcon.style.height = '54px';
            forecastIcon.style.width = '54ox';

            var forecastTemp = document.createElement('p');
            forecastTemp.setAttribute('class', 'forecast-temp');
            forecastTemp.innerHTML = `${kToF(data.list[i].main.temp)}&#176;F`;

            var forecastHumidity = document.createElement('p');
            forecastHumidity.innerHTML = `Humidity: ${data.list[i].main.humidity}%`;

            var forecastWind = document.createElement('p');
            forecastWind.innerHTML = `Wind: ${data.list[i].wind.speed} mph`;

            forecastEl.append(forecastDate, forecastIcon, forecastTemp, forecastHumidity, forecastWind);
            forecast.append(forecastEl)


        }

    })

}



let savedCities = JSON.parse(localStorage.getItem('cities')) || [];
console.log(savedCities)

function saveCity() {

    var cityInput = search.value.trim();

    if (savedCities.indexOf(cityInput) == -1) {
        savedCities.push(cityInput);
        localStorage.setItem('savedCities', JSON.stringify(savedCities));
    }


    // for (var i = 0; i < savedCities.length; i++) {
    //     var city = savedCities[i];
        var listItem = document.createElement('li')
        listItem.textContent = cityInput;
        listItem.setAttribute('class', 'city');
        cityList.prepend(listItem);
        console.log(savedCities)

        listItem.addEventListener('click', cityClick)
    }
// }

fetchDailyWeather();
fetchWeeklyWeather();


