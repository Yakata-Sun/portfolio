import '../scss/style.scss'
import  { backgroundCanvas } from './backgroundCanvas.js';
backgroundCanvas();

 function modalOrder() {
  document.getElementById("btnHero").addEventListener("click", function(){
  document.getElementById("newOrder").style.display = "block";

  });
}
modalOrder();

function closeModal(){
  document.querySelector(".close-btn").addEventListener("click", function(){
  document.getElementById("newOrder").style.display = "none";
})
}
closeModal();


  document.getElementById("formOrder").addEventListener("submit", async function (event) {
    event.preventDefault();
    
    const form = this;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const name = document.getElementById('name');
    const phone = document.getElementById('phone');
    const email = document.getElementById('email');
    const projectSelect = document.getElementById('typeProject');
    const message = document.getElementById('message');

    try {

      const response = await fetch('src/mailer/smart.php', {
        method: 'POST',
        body: formData,

      });

      const result = await response.json();
      
      if (result.status === 'success') {

        form.reset();

        document.getElementById("thanks").style.display = "block";
 
        setTimeout(() => {
          document.getElementById("thanks").style.display = "none";
          document.getElementById("newOrder").style.display = "none";
        }, 3000);
      } else {
        alert('Ошибка отправки. Попробуйте позже.');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Ошибка сети. Проверьте подключение к интернету.');
    }
  });