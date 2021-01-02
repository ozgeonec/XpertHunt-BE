let express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController')
const adController = require('../controllers/AdvertController')
const orderController = require('../controllers/OrderController')

const passport = require('passport');
const {authenticate} = require('passport');
const passportConfig = require('../config/passport');
const cors = require("cors");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/home',cors(),function (req,res,next){
  res.json({ greeting: 'hello API' });
})

router.get('/create-save-user', async function (req,res,next){
  let createdUser = await userController.createAndSaveUser()
  res.json(createdUser)
})

/* USER ROUTE */
//router.get('/user')


/* SIGNUP ROUTE */
router.post('/signup', async function (req,res,next){
  let createdUser = await userController.createUser(req.body.email,req.body.username,req.body.password)
  req.logIn(createdUser,function (err) {
    if (err) return next(err);
    res.redirect('/');
  })
  res.send("You are a registered user now");
})

/* LOGIN ROUTE */
router.post('/login', passport.authenticate('local-login', {
  successRedirect : '/profile', // redirect to profile
  failureRedirect : '/profile2', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}),function (req,res){
  //console.log(req);
  //console.log(res);
 // return res.json(req.body)
})

router.get('/checkauth', passportConfig.isAuthenticated, function(req, res){

  res.status(200).json({
    status: 'Login successful!',
    user : req.user
  });
});

/*router.get('/:username', function (req,res,next){
  //let user = await userController.getUserByUsername(req.params.username)
  //res.json(user)
  res.json({ greeting: 'hello API' });
})*/

/* PROFILE ROUTE */
router.get('/profile', (req, res, next) => {

  res.json({  greeting: 'login is successful' });
});

/* PROFILE FAILED ROUTE */
router.get('/profile2', (req, res, next) => {
  console.log("hello profile2");
  //console.log(req.body);
  res.json({ greeting: '2hello API' });
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

/* ORDER ROUTE */
router.get('/create-save-order', async function (req,res,next){
  let newOrder = await orderController.createAndSaveOrder()
  res.json(newOrder)
})

router.post('/create-order', async function (req,res,next){
  let createdOrder = await orderController.createOrder(req.user._id,req.body.description,req.body.budget)
  res.json(createdOrder)
})
router.get('/myOrders', async function (req,res,next){
  //console.log(req.user)
  let orders = await orderController.getAllOrdersByUser(req.user)
  //let user = await userController.getUsernameById(req.user.id)
  console.log(orders)
  //console.log("user" + user)

  res.json(orders)
})

module.exports = router;

