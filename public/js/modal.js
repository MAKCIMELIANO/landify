const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('openModalBtn');
const openModalBtn2 = document.getElementById('openModalBtn2'); // Новая кнопка
const closeBtn = document.getElementsByClassName('close')[0];
const registrationForm = document.getElementById('registrationForm');
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const emailInput = document.getElementById('email');

// Добавляем обработчик клика для кнопок открытия модального окна
openModalBtn.addEventListener('click', openModal);
openModalBtn2.addEventListener('click', openModal); // Обработчик для новой кнопки

// Обработчик открытия модального окна
function openModal() {
  modal.style.display = 'block';
}

// Обработчик закрытия модального окна
function closeModal() {
  modal.style.display = 'none';
  nameInput.value = '';
  phoneInput.value = '';
  emailInput.value = '';
}

// Добавляем обработчик клика закрытия модального окна
closeBtn.addEventListener('click', closeModal);

// Добавляем обработчик клика вне модального окна
window.addEventListener('click', function (event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

// Добавляем обработчик отправки формы
registrationForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const formData = new FormData(registrationForm);
  const data = Object.fromEntries(formData.entries());

  // Создаем новый объект XMLHttpRequest
  const xhr = new XMLHttpRequest();

  // Настраиваем запрос
  xhr.open('POST', 'http://localhost:3000/send-email'); // Замените на URL вашего сервера
  xhr.setRequestHeader('Content-Type', 'application/json');

  // Отправляем данные в формате JSON
  xhr.send(JSON.stringify(data));

  // Обрабатываем ответ
  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log('Данные формы успешно отправлены');
      modal.style.display = 'none';
      nameInput.value = '';
      phoneInput.value = '';
      emailInput.value = '';
    } else {
      console.error('Ошибка отправки данных формы:', xhr.responseText);
    }
  };

  xhr.onerror = function () {
    console.error('Ошибка отправки данных формы');
  };
});
