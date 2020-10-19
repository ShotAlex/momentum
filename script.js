const time = document.getElementById('time'),
      greeting = document.getElementById('greeting'),
      name = document.getElementById('name'),
      focus = document.getElementById('focus');

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




setInterval(showTime, 1000);
