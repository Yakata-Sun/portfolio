const order = () => {
  const form = document.querySelectorAll('form'),
    inputs = document.querySelectorAll('input, textarea, select'),
    btn = document.querySelectorAll('button');

  const messageStatus = {
    success: 'Ваше сообщение отправлено',
    error: 'Что-то пошло не так',
    loading: 'Загрузка...',
    empty: 'Поля не заполнены',
    begin: '',
  };

  function clearForm() {
    inputs.forEach((item) => {
      item.value = '';
      messageStatus;
    });
  }

  const postData = async (url, data) => {
    document.querySelector('.status').innerHTML = messageStatus.loading;
    let response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  };

  forms.forEach((item) => {
    item.addEventListener('submit', async (e) => {
      e.preventDefault();

      let message = document.createElement('div');
      message.classList.add('status');
      message.innerHTML = messageStatus.begin;
      form.appendChild(message);

      const formData = new FormData(item);

      const data = Object.fromEntries(formData);

      if (data.name === '' || data.phone === '') {
        messageStatus.empty;
        return;
      }
      const result = await postData('src/mailer/smart.php', data);
      if (result.status === 'success') {
        clearForm();
        messageStatus.success;
        setTimeout(() => {
          messageStatus.begin;
          form.reset();
        }, 1000);
      }
    });
  });
};

export default order;
