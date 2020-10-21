const time = document.getElementById('time'),
      greeting = document.getElementById('greeting'),
      name = document.getElementById('name'),
      focus = document.getElementById('focus'),
      timeDate = document.getElementById('date');

// TIME
const showTime = () => {
  let today = new Date(),
      hour = today.getHours(),
      min = today.getMinutes(),
      sec = today.getSeconds();

  time.innerHTML = `${addZero(hour)}:${addZero(min)}:${addZero(sec)}`;
}

// DATE
const showDate = (lang = 'en') => {
  let today = new Date(),
      locale = lang === 'en' ? 'en-us' : 'ru-ru',
      dayOfWeek = today.toLocaleString(locale, { weekday: "long" }),
      dayNumber = today.getDate(),
      month = today.toLocaleString(locale, { month: 'long' });

  timeDate.innerHTML = `${dayOfWeek}, ${dayNumber} ${month}`;
}

// showTime();
const addZero = n => (+n < 10 ? '0' : '') + n;

// GET RANDOM NUMBER
function getRandomNumber(min = 1, max = 20) {
  let num = Math.floor(Math.random() * (max - min)) + min;
  return rand = num < 10 ? '0'+num : num;
}

// BACKGROUND AND GREETING
const setBgGreet = () => {
  let hour = (new Date()).getHours();
  // let numRandPic = Math.random()
  // console.log('numRandPic : ', numRandPic);

  if (hour < 6) {
    // Night
    document.body.style.backgroundImage = `url(./assets/images/night/${getRandomNumber()}.jpg)`;
    greeting.textContent = 'Good Night';
  } else if (hour < 12) {
    // Morning
    document.body.style.backgroundImage = `url(./assets/images/morning/${getRandomNumber()}.jpg)`;
    greeting.textContent = 'Good Morning';
  } else if (hour < 18) {
    // Day
    document.body.style.backgroundImage = `url(./assets/images/day/${getRandomNumber()}.jpg)`;
    greeting.textContent = 'Good Day';
  } else {
    // Evening
    document.body.style.backgroundImage = `url(./assets/images/evening/${getRandomNumber()}.jpg)`;
    greeting.textContent = 'Good Evening';
  }
}

// GET NAME and FOCUS
const getName = () => {
  (localStorage.getItem('name') === null)
    ? name.textContent = '[Enter Name]'
    : name.textContent = localStorage.getItem('name')
}
const getFocus = () => {
  (localStorage.getItem('focus') === null)
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

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);


setInterval(showTime, 1000);
showDate();
setBgGreet();
getName();
getFocus();
// TODO
// Change IMG every Hour 0min 0 sec
// add Weather
// 