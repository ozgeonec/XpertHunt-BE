let express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController')
const adController = require('../controllers/AdvertController')

const passport = require('passport');
const authenticate = require('passport');
const passportConfig = require('../config/passport');
const cors = require("cors");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/home',function (req,res){
  res.json({ greeting: 'hello API' });

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
  console.log(req.body)
  let createdUser = await userController.createUser(req.body.email,req.body.username,req.body.password)
  console.log(createdUser)
  req.logIn(createdUser,function (err) {
    if (err) return next(err);
    res.redirect('/');
  })
  res.send("You are a registered user now");
})
/* LOGIN ROUTE */
router.post('/login', passport.authenticate('local-login', {
  session:false,
  successRedirect : '/profile', // redirect to the secure profile section
  failureRedirect : '/signup', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}),function (req,res){
  console.log(res)
})

/* PROFILE ROUTE */
router.get('/profile', passportConfig.isAuthenticated, (req, res) => {
  console.log("hello")
  console.log(res.json())
});

/*ANOTHER PERSON'S PROFILE*/
router.get('/:username', async function (req,res,next){
  let user = await userController.getUserByUsername(req.params.username)
  res.json(user)
})

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
