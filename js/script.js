
const time = document.getElementById('time'),
      greeting = document.getElementById('greeting'),
      name = document.getElementById('name'),
      focus = document.getElementById('focus'),
      timeDate = document.getElementById('date'),
      nextBg = document.getElementById('next-bg');

// CHECKBOX
const checkboxLang = document.getElementById('checkbox-lang'),
      checkboxTemp = document.getElementById('checkbox-temp');

// TIME
const showTime = () => {
  let today = new Date(),
      hour = today.getHours(),
      min = today.getMinutes(),
      sec = today.getSeconds();

  time.innerHTML = `${addZero(hour)}:${addZero(min)}:${addZero(sec)}`;

  if (min === 0 && sec === 0) showNextBg();
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
  console.log('checkLocalStorage ----');
  console.log('lang :', lang);
  console.log('temp :', temp);
  console.log('theme :', theme);
  localStorage.setItem('lang', lang)
  localStorage.setItem('temp-metric', temp)
  localStorage.setItem('theme', theme)
}

checkboxLang.addEventListener('click', changeLang)
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
nextBg.addEventListener('click', showNextBg);

checkLocalStorage();
setInterval(showTime, 1000);
showDate();
setBgGreet();
getName();
getFocus();