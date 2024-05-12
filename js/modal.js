const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('openModalBtn');
const openModalBtn2 = document.getElementById('openModalBtn2'); // Новая кнопка
const closeBtn = document.getElementsByClassName('close')[0];
const registrationForm = document.getElementById('registrationForm');
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const emailInput = document.getElementById('email');

openModalBtn.addEventListener('click', openModal);
openModalBtn2.addEventListener('click', openModal); // Обработчик для новой кнопки

function openModal() {
  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
  nameInput.value = '';
  phoneInput.value = '';
  emailInput.value = '';
}

closeBtn.addEventListener('click', closeModal);

window.addEventListener('click', function (event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

registrationForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const formData = new FormData(registrationForm);
  const data = Object.fromEntries(formData.entries());
  // Здесь вы можете добавить код для отправки данных на сервер
  console.log(data);

  modal.style.display = 'none';
  nameInput.value = '';
  phoneInput.value = '';
  emailInput.value = '';
});
