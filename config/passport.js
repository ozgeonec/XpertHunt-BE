// let passport = require('passport');
// let LocalStrategy = require('passport-local').Strategy
//
// const User = require('../models/UserModel');
//
// passport.serializeUser(function(user, done) {
//     done(null, user.id);
// });
//
// passport.deserializeUser(function(id, done) {
//     User.findById(id, function(err, user) {
//         done(err, user);
//     });
// });
//
// /* Sign in using Email and Password */
// // passport.use('local-login', new LocalStrategy({
// //     // by default, local strategy uses username and password, we will override with email
// //     usernameField : 'username',
// //     passwordField : 'password',
// //     passReqToCallback : true // allows us to pass back the entire request to the callback
// // }, function(req, username, password, done) { // callback with email and password from our form
// //     // find a user whose email is the same as the forms email
// //     // we are checking to see if the user trying to login already exists
// //     User.findOne({ username:  username },'password', function(err, user) {
// //         // if there are any errors, return the error before anything else
// //         if (err)
// //             return done(err);
// //         // if no user is found, return the message
// //         if (!user)
// //             return done(null, false,console.log("no user"), req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
// //
// //         // if the user is found but the password is wrong
// //         if (!user.comparePassword(password))
// //             return done(null, false, console.log("wrong password"), {message: req.flash('loginMessage', 'Oops! Wrong password.')}); // create the loginMessage and save it to session as flashdata
// //
// //         // all is well, return successful user
// //         return done(null,console.log("found"), user);
// //     });
// //
// // }));
//
// passport.use(
//     "local-login",
//     new LocalStrategy(
//         /*{
//           // by default, local strategy uses username and password, we will override with email
//           usernameField: "username",
//           passwordField: "password",
//           passReqToCallback: true, // allows us to pass back the entire request to the callback
//         },*/
//         function (username, password, done) {
//
//             // callback with email and password from our form
//             // find a user whose email is the same as the forms email
//             // we are checking to see if the user trying to login already exists
//             User.findOne({ username: username }, function (err, user) {
//                 if (err) { return done(err); }
//                 if (!user) {
//                     return done(null, false, { message: 'Incorrect username.' });
//                 }
//                 if (!user.comparePassword(password)) {
//                     return done(null, false, { message: 'Incorrect password.' });
//                 }
//                 return done(null,console.log("found"), user);
//             });
//         }
//     )
// );
//
// exports.isAuthenticated = function (req, res, next) {
//     if (req.user) {
//         console.log("Authenticated as EMREEE");
//         console.log(req.user.username);
//         return next();
//     } else {
//         res.redirect("/profile2");
//     }
// };

let passport = require("passport");
let LocalStrategy = require("passport-local").Strategy;

const User = require("../models/UserModel");

passport.serializeUser(function (user, done) {
    console.log("serializing user: ");
    console.log(user);
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        console.log("no im not serial");
        done(err, user);
    });
});

/* Sign in using Email and Password */
passport.use(
    "local-login",
    new LocalStrategy(
        /*{
          // by default, local strategy uses username and password, we will override with email
          usernameField: "username",
          passwordField: "password",
          passReqToCallback: true, // allows us to pass back the entire request to the callback
        },*/
        function (username, password, done) {

            // callback with email and password from our form
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({ username: username }, function (err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                if (!user.comparePassword(password)) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            });
        }
    )
);

exports.isAuthenticated = function (req, res, next) {
    if (req.user) {
        console.log("Authenticated");
        console.log(req.user.username);
        return next();
    } else {
        res.redirect("/profile2");
    }
};