const express = require('express');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const app = express();
const port = 3000;

app.use(cookieParser());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

const csrfProtection = csrf({ cookie: true });
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(csrfProtection);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/main', (req, res) => {
  res.sendFile(path.join(__dirname, 'main.html'));
});

app.get('/login', (req, res) => {
  req.session.authenticated = true;
  res.send('You are now logged in');
});

app.get('/check-auth', (req, res) => {
  if (req.session.authenticated) {
    res.send('You are authenticated');
  } else {
    res.send('You are not authenticated');
  }
});

app.post('/process', (req, res) => {
  if (req.session.authenticated) {
    res.send('Form processed successfully!');
  } else {
    res.send('You must be logged in to submit the form');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});