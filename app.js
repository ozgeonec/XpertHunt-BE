require("dotenv").config({path: __dirname + './env'});
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const flash = require("express-flash");
const connectEnsureLogin = require("connect-ensure-login"); //authorization
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const indexRouter = require("./routes/index");

////////////////////////////////////////////////////////
const app = express();

/*MongoDB Connection*/
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
});
connection.on("error", console.error.bind(console, "connection error:"));
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

// catch 404 and forward to error handler
/*app.use(function (req, res, next) {
  next(createError(404));
});*/

/* CORS Settings*/
// app.use(function (req, res, next) {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Credentials", "true");
//     res.setHeader(
//         "Access-Control-Allow-Methods",
//         "GET,HEAD,OPTIONS,POST,PUT,DELETE"
//     );
//     res.setHeader("Access-Control-Allow-Headers", "*");
//     if (req.method === "OPTIONS") {
//         return res.status(200).end();
//     }
//     next();
// });
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({credentials: true,origin:"http://localhost:3000"}));
//routes

app.use("/create-save-user", indexRouter);
app.use("/home", indexRouter);
app.use("/signup", indexRouter);

app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser());
app.use(
    session({
        secret: "cats",
        resave: true,
        saveUninitialized: false,
        cookie: { maxAge: 6000000 },
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(indexRouter);


app.use(function (req, res, next) {
    res.locals.user = req.user;
    next();
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));



// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
