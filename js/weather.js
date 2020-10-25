// weather
const weatherIcon = document.querySelector('.weather-icon'),
      temperature = document.querySelector('.temperature'),
      weatherDescription = document.querySelector('.weather-description'),
      weatherHumidity = document.querySelector('.weather-humidity'),
      weatherSpeed = document.querySelector('.weather-speed'),
      city = document.querySelector('.city');

const weatherCheckbox = document.getElementById('checkbox-temp');

const setMetric = () => {
  const checked = weatherCheckbox.checked ? 'f' : 'c';
  localStorage.setItem('temp-metric', checked);
  showWeather();
}

if (localStorage.getItem('temp-metric') === 'f') {
  weatherCheckbox.checked = true;
}
weatherCheckbox.addEventListener('click', setMetric);



// WEATHER
async function getWeather(currentCity) {

  const metric = localStorage.getItem('temp-metric') === 'c' ? 'metric' : 'imperial';
  const city = currentCity.length
  ? currentCity
  : localStorage.getItem('city') != undefined
  ? localStorage.getItem('city')
  : 'Минск';
  const lang = localStorage.getItem('lang');
  const keyAPI = 'cacc13c2899b6095815285b1dee10aaf';
  const baseURL = 'https://api.openweathermap.org/data/2.5/weather';
  const url = `${baseURL}?q=${city}&lang=${lang}&appid=${keyAPI}&units=${metric}`;
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    city.textContent = localStorage.getItem('city');
    alert('Нет такого города!')
    // getWeather();
  } else {
    localStorage.setItem('city', data.name)
    city.textContent = localStorage.getItem('city');
    return data;
  }
}

async function showWeather() {
  const data = await getWeather(city.textContent);

  let lang = localStorage.getItem('lang');
  let humidityText = lang === 'en' ? 'Humidity:' : 'Влажность:';
  let speedText = lang === 'en' ? 'Speed wind:' : 'Скорость ветра:';
  let cf = localStorage.getItem('temp-metric') === 'c' ? '°C' : '°F';
  let metricText = '';

  (cf === '°C')
    ? metricText = lang === 'en' ? 'm/s' : 'м/c'
    : metricText = lang === 'en' ? 'mph' : 'миля/ч';

  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${parseInt(data.main.temp)} ${cf}`;
  weatherHumidity.textContent = `${humidityText} ${data.main.humidity} %`;
  weatherSpeed.textContent = `${speedText} ${Math.round(data.wind.speed)} ${metricText}`;
  weatherDescription.textContent = data.weather[0].description;
  city.textContent = data.name;
}

function setCity(event) {
  city.onblur = () => {
    let inputCity = city.textContent.replace(/ +/g, '')
    if (inputCity === '') {
      city.textContent = localStorage.getItem('city');
    }
  }

  if (event.code === 'Enter') {
    showWeather();
    city.blur();
  }
}


city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);
city.addEventListener('focus', () => city.textContent = '');
document.addEventListener('DOMContentLoaded', getWeather);
showWeather();


//  WORKED geolocation
// 'api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}'
if (navigator.geolocation) {
  let location_timeout = setTimeout("geolocFail()", 10000);

  navigator.geolocation.getCurrentPosition( position => {
    clearTimeout(location_timeout);

    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    console.log('lat', lat);
    console.log('lon', lon);
  }, function (error) {
    clearTimeout(location_timeout);
    geolocFail();
  });
} else {
  // Fallback for no geolocation
  geolocFail();
}

navigator.geolocation.getCurrentPosition(position => {
  console.log('position', position)
})