require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./routes/index');
const mongoose = require('mongoose');
const { errorsMiddleware } = require('./middleware/error.middleware');
const path = require("path");
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded());
app.use('/api', router);
app.use(errorsMiddleware);
app.set('views', path.join(__dirname, '/views/pages')); 
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('index'))
app.get('/register-page', (req, res) => res.render('register-page'));
app.get('/login-page', (req, res) => res.render('login-page'));


app.listen(process.env.SERVER_PORT, () => {
  mongoose.connect(process.env.MONGODB_CONNECTION_STRING, { useNewUrlParser: true })
    .then(() => {
      console.log(`Server started on ${process.env.SERVER_PORT} port`)
      console.log('Connected to DB');
    });
});
