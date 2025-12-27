import '../scss/style.scss';
import { backgroundCanvas } from './backgroundCanvas.js';
import toolType from '../js/skillsData.js';
import modal from './modal.js';
import order from './order.js';

window.addEventListener('DOMContentLoaded', () => {
  modal();
  backgroundCanvas();
  toolType();
  order();
});
