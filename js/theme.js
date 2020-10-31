// THEME
const theme = document.getElementById('checkbox-theme'),
      body = document.querySelector('body'),
      wrapper = document.querySelectorAll('.wrapper');

const changeTheme = (type) => {
    body.dataset.theme = type;
    wrapper.forEach(el => el.setAttribute("data-theme", type) );
}

const setTheme = () => {
  const checked = theme.checked ? 'light' : 'dark';
  localStorage.setItem('theme', checked);
  changeTheme(checked);
}

if (localStorage.getItem('theme') === 'light') {
  theme.checked = true;
  changeTheme('light');
}

theme.addEventListener('click', setTheme);