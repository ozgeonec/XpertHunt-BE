var express = require('express');
var router = express.Router();
const userController = require('../controllers/UserController')

const passport = require('passport');
const passportConfig = require('../config/passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/home',function (req,res,next){
  res.json({ greeting: 'hello API' });
})
router.get('/create-save-user',  function (req,res,next){
  console.log(req.params)
  let createdUser = userController.createAndSaveUser()
  res.json(createdUser)
})
/* LOGIN ROUTE */
// router.get('/login')
//     .route('/login')
//     .get((req, res, next) => {
//       if (req.user)
//         return res.redirect('/');
//       res.render('accounts/login', {
//         message: req.flash('loginMessage')
//       });
//     })
//     .post(passport.authenticate('local-login', {
//       successRedirect: '/', // redirect to the secure profile section
//       failureRedirect: '/login', // redirect back to the signup page if there is an error
//       failureFlash: true // allow flash messages
//     }));

/* PROFILE ROUTE */
router.get('/profile', passportConfig.isAuthenticated, (req, res, next) => {
  res.render('accounts/profile');
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
