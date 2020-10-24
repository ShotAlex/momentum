const name = document.getElementById('name'),
      focus = document.getElementById('focus'),
      greetingTitle = document.getElementById('greeting'),
      focusTitle = document.getElementById('focus-title');

// GET NAME and FOCUS
const getName = () => {
  // greetingTitle.textContent = lang === 'en'
  //   ? `What's your focus for today?`
  //   : `Какая цель на сегодня?`;
  (localStorage.getItem('name') === null || localStorage.getItem('name') == '')
    ? name.textContent = '[Enter Name]'
    : name.textContent = localStorage.getItem('name')
}
const getFocus = () => {
  const lang = localStorage.getItem('lang')
  focusTitle.textContent = lang === 'en'
    ? `What's your focus for today?`
    : `Какая цель на сегодня?`;

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

getName();
getFocus();