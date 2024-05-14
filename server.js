const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
app.use(express.json());

// Настройка отправки письма
const transporter = nodemailer.createTransport({
  service: 'Outlook',
  auth: {
    user: 'your_email@example.com', // Добавьте свой адрес электронной почты
    pass: 'your_password', // Добавьте свой пароль
  },
});

// Middleware для разбора JSON
app.use(express.json());

// Обработчик POST-запроса для отправки данных формы
app.post('/send-email', (req, res) => {
  const { name, phone, email } = req.body;

  // Настройка письма
  const mailOptions = {
    from: 'your_email@example.com', // Добавьте свой адрес электронной почты
    to: 'recipient_email@example.com', // Добавьте адрес электронной почты получателя
    subject: 'Новая заявка с вашего сайта',
    text: `Имя: ${name}\nТелефон: ${phone}\nEmail: ${email}`,
  };

  // Отправка письма
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Ошибка отправки письма:', error);
      res.status(500).send('Ошибка отправки письма');
    } else {
      console.log('Письмо успешно отправлено:', info.response);
      res.status(200).send('Данные формы успешно отправлены');
    }
  });
});

// Обработчик GET-запроса для отдачи файла index.html и статических файлов
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Запуск сервера
app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});
