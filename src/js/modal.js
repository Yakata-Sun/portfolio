const modal  = () => {
  function openModal(triggerSelector, modalSelector, closeSelector) {
    const triggers = document.querySelectorAll(triggerSelector);
    const modal = document.querySelector(modalSelector);
    const close = document.querySelector(closeSelector);
      
    triggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
      });
    });
      
    close.addEventListener('click', () => {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    });
      
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
  }
  openModal('.hero-btn', '#newOrder', '.close-btn');
}

export default modal;