export function backgroundCanvas() {
  // Объявляем приватные переменные внутри IIFE
  const canvas = document.getElementById('codeCanvas');
  const ctx = canvas.getContext('2d');

  const characters = 'Javascript ctx.fillStyle = rgba(250, 250, 250, 0.05);  ct(0, 0, canvas.width, canvas.height) const text = characters.charAt(Math.floor(Math.random() * characters.length));';
  const fontSize = 16; // Размер шрифта
  let columns; // Количество колонок
  let drops;   // Массив позиций капель

  // Инициализация канваса и переменных
  function init() {
    // Установка размеров канваса
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Расчёт количества колонок
    columns = Math.floor(canvas.width / fontSize);
    // Инициализация массива капель
    drops = Array(columns).fill(1);
  }

  // Обновление и отрисовка каждого кадра
  function draw() {
    // Создаем эффект размытия через полупрозрачный фон
    ctx.fillStyle = 'rgba(250, 250, 250, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Настройка текста
    ctx.fillStyle = 'rgba(26, 26, 26, 0.3)';
    ctx.font = `${fontSize}px monospace`;

    // Рисуем капли
    for (let i = 0; i < drops.length; i++) {
      const text = characters.charAt(Math.floor(Math.random() * characters.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0; // Сброс капли, начинаем заново сверху
      }
      drops[i]++;
    }
  }

  // Обработка изменения размера окна
  window.addEventListener('resize', () => {
    init();
  });

  // Инициализация и запуск анимации
  init();
  setInterval(draw, 50);
}
