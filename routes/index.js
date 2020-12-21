let express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController')
const adController = require('../controllers/AdvertController')


const passport = require('passport');
const passportConfig = require('../config/passport');
const cors = require("cors");

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });
});
router.get('/home',cors(),function (req,res,next){
  res.json({ greeting: 'hello API' });
  next();
})
router.get('/create-save-user', async function (req,res,next){
  console.log(req.params)
  let createdUser = await userController.createAndSaveUser()
  res.json(createdUser)
})
/* USER ROUTE */
//router.get('/user')


/* SIGNUP ROUTE */
router.post('/signup', async function (req,res,next){
  // console.log(req.body.user.email)
  // console.log(req.query)
  console.log(req.body)
  let createdUser = await userController.createUser(req.body.email,req.body.username,req.body.password)
  console.log(createdUser)
  req.logIn(createdUser,function (err) {
    if (err) return next(err);
    res.redirect('/');

  })
  res.send("You are a registered user now");
})

/* PROFILE ROUTE */
router.get('/profile', passportConfig.isAuthenticated, (req, res, next) => {
  res.render('accounts/profile');
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});
/* ADVERT ROUTE */
router.get('/create-ad', async function (req,res,next){
  let newGig = await adController.createAdvert()
  res.json(newGig)
})



module.exports = router;
