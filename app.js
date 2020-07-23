require('dotenv').config()

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const dishRouter = require('./routes/dish.routes');
const promoRouter = require('./routes/promotions.routes');
const leaderRouter = require('./routes/leaders.routes');

const mongoose = require('mongoose')
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/conFusion'
const connect = mongoose.connect(url, {useFindAndModify: false,  useUnifiedTopology: true})

connect
  .then((db) => {
    console.log('Connnected to the db')
  })
  .catch(e => console.log('error - ', e))

const Dishes = require('./models/dish.model')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res, next) => {
  res.json({msg: "your sever was started"})
});

app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404)
  next();
});

// const PORT = process.evn.PORT || 3000
//
// app.listen(PORT, () => {
//   console.log('started')
// })

module.exports = app;
