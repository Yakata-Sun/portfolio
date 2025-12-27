const ThemeSwitch = () => {
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // Check for saved theme preference or default to 'light'
  const currentTheme = localStorage.getItem('theme') || 'light';
  htmlElement.setAttribute('data-theme', currentTheme);

  if (currentTheme === 'dark') {
    themeToggle.checked = true;
  }

  themeToggle.addEventListener('change', function () {
    if (this.checked) {
      htmlElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      htmlElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  });
};

export default ThemeSwitch;
