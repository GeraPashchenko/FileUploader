require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./routes/index');
const mongoose = require('mongoose');
const { errorsMiddleware } = require('./middleware/error.middleware');

app.use(express.json());
app.use('/api', router);
app.use(errorsMiddleware);

app.listen(process.env.SERVER_PORT, () => {
  mongoose.connect(process.env.MONGODB_CONNECTION_STRING, { useNewUrlParser: true })
    .then(() => {
      console.log(`Server started on ${process.env.SERVER_PORT} port`)
      console.log('Connected to DB');
    });
});
