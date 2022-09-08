    var currentDate = dayjs().tz(timezone).format('dddd MMMM D, YYYY');
    var temp = weather.temp;
    var wind = weather.wind_speed;
    var humidity = weather.humidity;
    var UVI = weather.uvi;
    var icon = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
    var iconDescription = weather.weather[0].description || weather[0].main;
    // dateOutput.innerHTML = currentDate;
    // console.log(currentDate)
    
    var card = document.createElement('div');
    var cardBody = document.createElement('div');
    var heading = document.createElement('h2');
    var weatherIcon = document.createElement('img');
    var tempEl = document.createElement('p');
    var windEl = document.createElement('p');
    var humidityEl = document.createElement('p');
    var uvEl = document.createElement('p');
    var uviBadge = document.createElement('button');

    card.setAttribute('class', 'card');
    cardBody.setAttribute('class', 'card-body');
    card.append(cardBody);
    heading.setAttribute('class', 'h2 card-title');
    tempEl.setAttribute('class', 'card-text');
    windEl.setAttribute('class', 'card-text');
    humidityEl.setAttribute('class', 'card-text');

    heading.textContent = `${cityInput} (${currentDate})`;
    weatherIcon.setAttribute('src', icon)
    weatherIcon.setAttribute('alt', iconDescription);
    weatherIcon.setAttribute('class', 'weather-img');
    heading.append(weatherIcon);
    
    tempEl.textContent = `${temp}&#176;F`;
    windEl.textContent = `Wind: ${wind} mph`;
    humidityEl.textContent = `Humidity: ${humidity}%`;
    uvEl.textContent = `UV Index: ${UVI}`;
    cardBody.append(heading, tempEl, windEl, humidityEl, uvEl)

    uviBadge.textContent = uvi;
    uvEl.append(uviBadge);