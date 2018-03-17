const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('./config/database');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet')


const authentication = require('./routes/authentication');
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, config.option, (err) => {
  if (err) {
    console.log('Fail to connect DB', err);
  } else {
    console.log('Connected to DB');
  }
});

app.use(cors({ origin: 'http://localhost:4200' }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(helmet())

app.use(express.static(path.join(__dirname, '/angular-app/dist/')));

app.use('/authentication', authentication);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/angular-app/dist/index.html'));
});

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   const err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;