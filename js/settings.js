// CHECKBOX
const checkboxLang = document.getElementById('checkbox-lang');
      // checkboxTemp = document.getElementById('checkbox-temp');


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

// CHANGE LANGUAGE
const changeLang = () => {
  const checked = checkboxLang.checked ? 'ru' : 'en';
  localStorage.setItem('lang', checked);
  // ADD ALL FUNCTION
  showWeather();
  showDate();
  getName();
  getFocus();
  // showQuote();
}

if (localStorage.getItem('lang') === 'ru') {
  checkboxLang.checked = true;
}



checkboxLang.addEventListener('click', changeLang)
checkLocalStorage();