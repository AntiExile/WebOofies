const express = require('express');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();
const port = 3000;

app.use(cookieParser());
const csrfProtection = csrf({ cookie: true });
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(csrfProtection);
app.get('/', (req, res) => {
  res.render('index', { csrfToken: req.csrfToken() });
});
app.post('/process', (req, res) => {
  res.send('Form processed successfully!');
});

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/main', (req, res) => {
  res.sendFile(path.join(__dirname, 'main.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});