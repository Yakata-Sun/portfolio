document.querySelectorAll('.orderBtn').forEach((btn) => {
  btn.addEventListener('click', function () {
    // Скроллим к форме заказа (если она есть на странице)
    const form = document.querySelector('#formOrder') || document.querySelector('.contact-form');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Или открываем модальное окно
      const modal = document.querySelector('#newOrder');
      if (modal) {
        modal.style.display = 'block';
      }
    }
  });
});
