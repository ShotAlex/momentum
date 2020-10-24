
const time = document.getElementById('time'),
      greeting = document.getElementById('greeting'),
      timeDate = document.getElementById('date'),
      nextBg = document.getElementById('next-bg');

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
const showDate = () => {
  const  locale = localStorage.getItem('lang') === 'en' ? 'en-us' : 'ru-ru';
  const date = new Date().toLocaleString(locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  timeDate.innerHTML = date;
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



nextBg.addEventListener('click', showNextBg);

setInterval(showTime, 1000);
showDate();
setBgGreet();
