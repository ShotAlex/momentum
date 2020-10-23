
const time = document.getElementById('time'),
      greeting = document.getElementById('greeting'),
      name = document.getElementById('name'),
      focus = document.getElementById('focus'),
      timeDate = document.getElementById('date'),
      quote = document.getElementById('quote'),
      quoteAuthor = document.getElementById('quote-author'),
      nextQuote = document.getElementById('next-quote');
      nextBg = document.getElementById('next-bg');
// weather
const weatherIcon = document.querySelector('.weather-icon'),
      temperature = document.querySelector('.temperature'),
      weatherDescription = document.querySelector('.weather-description'),
      weatherHumidity = document.querySelector('.weather-humidity'),
      weatherSpeed = document.querySelector('.weather-speed'),
      city = document.querySelector('.city');
// CHECKBOX
const checkboxLang = document.getElementById('checkbox-lang'),
      checkboxTemp = document.getElementById('checkbox-temp');

// ---------------------------------------
const body = document.querySelector('body'),
      wrapper = document.querySelectorAll('.wrapper');

// THEME
const changeTheme = () => {
  setTimeout(() => {
    body.dataset.theme = 'dark';
    wrapper.forEach(el => {
      el.setAttribute("data-theme", "dark");
    });
  }, 2000);
}
// ---------------------------------------
changeTheme();


// TIME
const showTime = () => {
  let today = new Date(),
      hour = today.getHours(),
      min = today.getMinutes(),
      sec = today.getSeconds();

  time.innerHTML = `${addZero(hour)}:${addZero(min)}:${addZero(sec)}`;

  if (min === 0 && sec === 0) {
    showNextBg();
    showQuote();
  }
}

// DATE
const showDate = (lang = 'en') => {
  let today = new Date(),
      locale = localStorage.getItem('lang') === 'en' ? 'en-us' : 'ru-ru',
      dayOfWeek = today.toLocaleString(locale, { weekday: 'long' }),
      dayNumber = today.getDate(),
      month = today.toLocaleString(locale, { month: 'long' }),
      year = today.getFullYear()

  timeDate.innerHTML = `${dayOfWeek}, ${dayNumber} ${month} ${year}`;
}

const addZero = n => (+n < 10 ? '0' : '') + n;

// GET RANDOM NUMBER
function getRandomNumber(min = 1, max = 20) {
  let num = Math.floor(Math.random() * (max - min)) + min;
  return rand = num < 10 ? '0'+num : num;
}

// Check Time of Day
const checkTimeOfDay = (h) => {
  return h < 6 ? 'night' : h < 12 ? 'morning' : h < 18 ? 'day' : 'evening';
}


// NEXT BACKGROUND
function setBg(data) {
  const body = document.querySelector('body');
  const src = data;
  const img = document.createElement('img');
  img.src = src;
  img.onload = () => {
    body.style.backgroundImage = `url(${src})`;
    setTimeout(() => nextBg.disabled = false, 4000);
    // nextBg.disabled = false;
  };
}

const showNextBg = () => {
  nextBg.disabled = true;
  let hour = (new Date()).getHours();
  let time = checkTimeOfDay(hour);
  document.body.style.backgroundImage = `url(./assets/images/${time}/${getRandomNumber()}.jpg)`;
  let imageSrc = `./assets/images/${time}/${getRandomNumber()}.jpg`;
  setBg(imageSrc)
}



// BACKGROUND AND GREETING
const setBgGreet = () => {
  let hour = (new Date()).getHours();
  let time = checkTimeOfDay(hour)
  let GreetingTime = time.slice(0,1).toUpperCase() + time.slice(1);

  document.body.style.backgroundImage = `url(./assets/images/${time}/${getRandomNumber()}.jpg)`;
  greeting.textContent = `Good ${GreetingTime}`;

  if (hour === 0) showDate();
}




// GET NAME and FOCUS
const getName = () => {
  (localStorage.getItem('name') === null || localStorage.getItem('name') == '')
    ? name.textContent = '[Enter Name]'
    : name.textContent = localStorage.getItem('name')
}
const getFocus = () => {
  (localStorage.getItem('focus') === null || localStorage.getItem('focus') == '')
    ? focus.textContent = '[Enter Focus]'
    : focus.textContent = localStorage.getItem('focus')
}

// SET NAME and FOCUS
const setName = (e) => {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText)
      name.blur()
    }
  } else {
    localStorage.setItem('name', e.target.innerText)
  }
}

const setFocus = (e) => {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText)
      focus.blur()
    }
  } else {
    localStorage.setItem('focus', e.target.innerText)
  }
}


// QUOTE
const showQuote = () => {
  fetch('./assets/data/quotes.json')
    .then(res => res.json())
    .then(data => {
      const randQuote = +getRandomNumber(1, data.quotes.length)
      const currentQuote = data.quotes[randQuote]
      quote.innerHTML = currentQuote.quote;
      quoteAuthor.innerHTML = currentQuote.author;
    })
    .catch( err => {
      console.log('Error:', err);
      quote.innerHTML = `Good day!`;
    })
}

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

  if(!res.ok) {
    alert('Нет такого города!')
    getWeather()
  } else {
    localStorage.setItem('city', data.name)
    city.textContent = localStorage.getItem('city');
    return data;
  }
}

async function  showWeather() {
  const data = await getWeather(city.textContent);

  // let lang = localStorage.getItem('lang')

  let humidityText = localStorage.getItem('lang') === 'en' ? 'Humidity:' : 'Влажность:';
  let speedText = localStorage.getItem('lang') === 'en' ? 'Speed wind:' : 'Скорость ветра:';
  let metricText = localStorage.getItem('lang') === 'en' ? 'm/s:' : 'м/c:';

  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${parseInt(data.main.temp)}°C`;
  weatherSpeed.textContent = `${speedText} ${Math.round(data.wind.speed)}${metricText}`;
  weatherHumidity.textContent = `${humidityText} ${data.main.humidity} %`;
  weatherDescription.textContent = data.weather[0].description;
  city.textContent = data.name;

  // console.log('data', data);
  // console.log('data', data.name);
}

function setCity(event) {
  if (event.code === 'Enter') {
    showWeather();
    city.blur();
  }
}


// CHANGE LANGUAGE
const changeLang = () => {
  const state = checkboxLang.checked ? 'ru' : 'en';
  localStorage.setItem('lang', state);
  console.log('LANG', localStorage.getItem('lang'));
  // window.location.reload();
}

// INIT APP
const checkLocalStorage = () => {
  const lang = localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'ru';
  const temp = localStorage.getItem('temp-metric') !== null ? localStorage.getItem('temp-metric') : 'c';
  const theme = localStorage.getItem('theme') !== null ? localStorage.getItem('theme') : 'dark';
  console.log('checkLocalStorage');
  console.log('lang :', lang);
  console.log('temp :', temp);
  console.log('theme :', theme);
  localStorage.setItem('lang', lang)
  localStorage.setItem('temp-metric', temp)
  localStorage.setItem('theme', theme)
}

const setCheckboxes = () => {
  console.log('ppc heckers');
  checkboxLang.checked = localStorage.getItem('lang') == 'ru' ? false : true
  checkboxLang.checked = localStorage.getItem('temp-metric') == 'f';
}


checkboxLang.addEventListener('click', changeLang)
document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

quote.addEventListener('click', showQuote);
nextQuote.addEventListener('click', showQuote);
nextBg.addEventListener('click', showNextBg);




checkLocalStorage();
setCheckboxes()
setInterval(showTime, 1000);
showDate();
setBgGreet();
getName();
getFocus();
showQuote();
showWeather();

// LANG
// METRIC
// THEME