const time = document.getElementById('time'),
      greeting = document.getElementById('greeting'),
      name = document.getElementById('name'),
      focus = document.getElementById('focus');


// TIME
const showTime = () => {
  let today = new Date(),
      hour = today.getHours(),
      min = today.getMinutes(),
      sec = today.getSeconds();

  time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
  // setTimeout(showTime, 1000);
}
// showTime();
const addZero = n => (+n < 10 ? '0' : '') + n;

// BACKGROUND AND GREETING
const setBgGreet = () => {
  let hour = (new Date()).getHours();

  if (hour < 5 || hour > 23) {
    // Night
    document.body.style.backgroundImage = 'url(./assets/images/night/01.jpg)';
    greeting.textContent = 'Good Night';
  } else if (hour < 10) {
    // Morning
    document.body.style.backgroundImage = 'url(./assets/images/morning/01.jpg)';
    greeting.textContent = 'Good Morning';
  } else if (hour < 18) {
    // Day
    document.body.style.backgroundImage = 'url(./assets/images/day/01.jpg)';
    greeting.textContent = 'Good Day';
  } else {
    // Evening
    document.body.style.backgroundImage = 'url(./assets/images/evening/01.jpg)';
    greeting.textContent = 'Good Evening';
  }
}

// NAME
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



setInterval(showTime, 1000);
setBgGreet();
getName();
getFocus();