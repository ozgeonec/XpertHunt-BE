var express = require('express');
var router = express.Router();
const userController = require('../controllers/UserController')
const loginController = require('../controllers/LoginController')

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
router.get('/login',async function (req,res,next){
  let loggedUser = loginController.saveLogin()
  res.json(loggedUser)
  next()
})

module.exports = router;
