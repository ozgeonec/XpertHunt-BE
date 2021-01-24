let passport = require("passport");
let LocalStrategy = require("passport-local").Strategy;

const User = require("../models/UserModel");

passport.serializeUser(function (user, done) {
    console.log("serializing user: ");
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        //console.log("no im not serial");
        done(err, user);
    });
});

/* Sign in using Email and Password */
passport.use(
    "local-login",
    new LocalStrategy(

        function (username, password, done) {

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
        return next();
    } else {
        res.redirect("/profile2");
    }
};