// THEME
const changeTheme = () => {
  setTimeout(() => {
    body.dataset.theme = 'dark';
    wrapper.forEach(el => {
      el.setAttribute("data-theme", "dark");
    });
  }, 2000);
}

// changeTheme();