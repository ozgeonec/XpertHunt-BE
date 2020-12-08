const express = require('express')
let router = express.Router()
const loginController = require('../controllers/LoginController')




router.get('/login',async function (req,res,next){
    let loggedUser = loginController.saveLogin()
    res.json(loggedUser)
    next()
})

module.exports = router;

