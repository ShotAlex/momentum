
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
      locale = lang === 'en' ? 'en-us' : 'ru-ru',
      dayOfWeek = today.toLocaleString(locale, { weekday: 'long' }),
      dayNumber = today.getDate(),
      month = today.toLocaleString(locale, { month: 'long' });

  timeDate.innerHTML = `${dayOfWeek}, ${dayNumber} ${month}`;
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
const showNextBg = () => {
  nextBg.disabled = true;
  let hour = (new Date()).getHours();
  let time = checkTimeOfDay(hour);
  document.body.style.backgroundImage = `url(./assets/images/${time}/${getRandomNumber()}.jpg)`;

  setTimeout(() => nextBg.disabled = false, 3000);
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
async function getWeather(city = 'Минск',lang = 'ru') {
  const keyAPI = 'cacc13c2899b6095815285b1dee10aaf';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&appid=${keyAPI}&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

async function  showWeather() {
  const data = await getWeather(city.textContent);
  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${parseInt(data.main.temp)}°C`;
  
  weatherHumidity.textContent = `Влажность: ${data.main.humidity} %`;
  weatherSpeed.textContent = `Скорость: ${data.wind.speed} м/с`;
  weatherDescription.textContent = data.weather[0].description;

  console.log(data.weather[0].id, data.weather[0].description, data.main.temp);
  console.log('data', data);
}

function setCity(event) {
  if (event.code === 'Enter') {
    showWeather();
    city.blur();
  }
}

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);


name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
quote.addEventListener('click', showQuote);
nextBg.addEventListener('click', showNextBg);
nextQuote.addEventListener('click', showQuote);

setInterval(showTime, 1000);
showDate();
setBgGreet();
getName();
getFocus();
showQuote();
showWeather();