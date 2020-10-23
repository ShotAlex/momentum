// weather
const weatherIcon = document.querySelector('.weather-icon'),
  temperature = document.querySelector('.temperature'),
  weatherDescription = document.querySelector('.weather-description'),
  weatherHumidity = document.querySelector('.weather-humidity'),
  weatherSpeed = document.querySelector('.weather-speed'),
  city = document.querySelector('.city');

// WEATHER
async function getWeather(currentCity, metric = 'metric') {
  const city = currentCity.length
    ? currentCit
    : localStorage.getItem('city') != undefined
      ? localStorage.getItem('city')
      : 'Минск';
  const lang = localStorage.getItem('lang');
  const keyAPI = 'cacc13c2899b6095815285b1dee10aaf';
  const baseURL = 'https://api.openweathermap.org/data/2.5/weather';
  const url = `${baseURL}?q=${city}&lang=${lang}&appid=${keyAPI}&units=${metric}`;
  const res = await fetch(url);
  const data = await res.json();

  
  console.log('getWeather()');

  if (!res.ok) {
    alert('Нет такого города!')
    getWeather()
  } else {
    localStorage.setItem('city', data.name)
    city.textContent = localStorage.getItem('city');
    return data;
  }
}

async function showWeather() {
  const data = await getWeather(city.textContent);

  let lang = localStorage.getItem('lang')
  let humidityText = lang === 'en' ? 'Humidity:' : 'Влажность:';
  let speedText = lang === 'en' ? 'Speed wind:' : 'Скорость ветра:';
  let metricText = lang === 'en' ? 'm/s' : 'м/c';

  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${parseInt(data.main.temp)}°C`;
  weatherSpeed.textContent = `${speedText} ${Math.round(data.wind.speed)}${metricText}`;
  weatherHumidity.textContent = `${humidityText} ${data.main.humidity} %`;
  weatherDescription.textContent = data.weather[0].description;
  city.textContent = data.name;

  console.log('data', data);
  console.log('data', data.name);
}

function setCity(event) {
  if (event.code === 'Enter') {
    showWeather();
    city.blur();
  }
}

city.addEventListener('keypress', setCity);
// city.addEventListener('blur', setCity);
document.addEventListener('DOMContentLoaded', getWeather);
showWeather();
