const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session')


const indexRouter = require('./routes/index');

////////////////////////////////////////////////////////
const app = express();
/* CORS Settings*/
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {return res.status(200).end();}
  next();
});



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//routes
app.use(indexRouter)
app.use('/create-save-user',indexRouter)
app.use('/home', indexRouter)
app.use('/signup', indexRouter)

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(cookieParser());
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(passport.initialize.bind(passport));
app.use(passport.session.bind(passport));
app.use(flash());

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: "false" }))

app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});






// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');



app.use(logger('dev'));




/*MongoDB Connection*/
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {console.log("MongoDB database connection established successfully");})
connection.on("error", console.error.bind(console, "connection error:"));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
