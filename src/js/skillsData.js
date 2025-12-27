const toolType = () => {
  const tooltip = document.getElementById('tooltip');
  const tooltipTitle = document.getElementById('tooltipTitle');
  const tooltipList = document.getElementById('tooltipList');
  const sectors = document.querySelectorAll('.radial-sector');

  sectors.forEach((sector) => {
    sector.addEventListener('mouseenter', function (e) {
      const title = this.getAttribute('data-title') || 'Компетенции';
      const skills = this.getAttribute('data-skills') || '';

      tooltipTitle.textContent = title;
      tooltipList.innerHTML = '';
      if (skills) {
        skills.split(',').forEach((skill) => {
          const li = document.createElement('li');
          li.textContent = skill.trim();
          tooltipList.appendChild(li);
        });
      }

      // Позиционируем tooltip около сектора (примерно в центре сектора)
      const rect = this.getBoundingClientRect();
      const diagramRect = document.querySelector('.skillsDiagram').getBoundingClientRect();

      // Примерное смещение: вправо и чуть вверх от центра сектора
      const x = rect.left + rect.width / 2 - diagramRect.left + 40;
      const y = rect.top + rect.height / 2 - diagramRect.top - 30;

      tooltip.style.left = x + 'px';
      tooltip.style.top = y + 'px';
      tooltip.style.opacity = '1';
    });

    sector.addEventListener('mouseleave', () => {
      tooltip.style.opacity = '0';
    });
  });
};
export default toolType;
