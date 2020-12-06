const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController')
let USER = require('../models/user.model');

// function (err,data){
//   if (err) {return next(err);}
//   if (!data) {
//     return next({ message: "Missing callback argument" });
//   }
//   USER.findById(data._id, function (err, user) {
//     if (err) {return next(err);}
//     res.json(user);
//     //user.remove();
//   })
// }
/* GET users listing. */
router.get('/:id', async function(req, res, next) {
  const user = await userController.getUser(req.params.id)
  res.send(user);
});

router.get('/create-save-user', async function (req,res,next){
  let createdUser = await userController.createAndSaveUser()
  res.json(createdUser)
})

module.exports = router;
