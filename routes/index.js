var express = require('express');
var router = express.Router();
const userController = require('../controllers/UserController')

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
module.exports = router;
