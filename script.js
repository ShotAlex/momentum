const time = document.getElementById('time'),
      greeting = document.getElementById('greeting'),
      name = document.getElementById('name'),
      focus = document.getElementById('focus'),
      timeDate = document.getElementById('date');
      // nextBg = document.getElementById('btn')

// TIME
const showTime = () => {
  let today = new Date(),
      hour = today.getHours(),
      min = today.getMinutes(),
      sec = today.getSeconds();

  time.innerHTML = `${addZero(hour)}:${addZero(min)}:${addZero(sec)}`;
  if (hour === 0 && min === 0) showNextBg();
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
  switch (h) {
    case h<6:
      return 'night';
    case h<12:
      return 'morning';
    case h<18:
      return 'day';
    default:
      return 'evening';
  }
}

// NEXT BACKGROUND
const showNextBg = () => {
  let hour = (new Date()).getHours();
  let time = checkTimeOfDay(hour);
  document.body.style.backgroundImage = `url(./assets/images/${time}/${getRandomNumber()}.jpg)`;
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




name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
// nextBg.addEventListener('click', showNextBg);


setInterval(showTime, 1000);
showDate();
setBgGreet();
getName();
getFocus();
// TODO
// setInterval(showNextBg, 2000);
// add Weather
// 