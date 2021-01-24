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
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
router.get('/home', cors(), function (req, res, next) {
    res.json({greeting: 'hello API'});
})

router.get('/create-save-user', async function (req, res, next) {
    let createdUser = await userController.createAndSaveUser()
    res.json(createdUser)
})

/* USER ROUTE */
//router.get('/user')
router.get('/all-applied', async function (req, res) {
    let allApplied = await orderController.appliedOrders(req.user)
    res.json(allApplied)
})
router.post('/signup', async function (req,res,next){
    let createdUser = await userController.createUser(req.body.email,req.body.username,req.body.password,next)
    req.logIn(createdUser,function (err) {
        if (err) return next(err);
        res.redirect('/');
    })
    res.send("You are a registered user now");
})
/* SIGNUP ROUTE */
/*router.post('/signup', async function (req, res, next) {
    let createdUser = await userController.createUser(req.body.email, req.body.username, req.body.password,next)

    req.logIn(createdUser, function (err) {
        if (err) {
            return next(err);

        }
        res.status(500).send('Something broke!')
        return res.redirect('/');
    })


})*/
router.get('/login2', function (req, res, next) {
    passport.authenticate('local-login', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/login2');
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            return res.redirect('/profile');
        });
    })(req, res, next);
});
/* LOGIN ROUTE */
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile', // redirect to profile
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
}), function (req, res, next) {
    //res.status(500).send('Birşeyler bozuldu')

    return res.status(401).json({message: 'Unauthorized user!'});
})

router.get('/checkauth', passportConfig.isAuthenticated, function (req, res, next) {

    res.status(200).json({
        status: 'Login successful!',
        user: req.user
    });

});

/*router.get('/:username', function (req,res,next){
  //let user = await userController.getUserByUsername(req.params.username)
  //res.json(user)
  res.json({ greeting: 'hello API' });
})*/

/* PROFILE ROUTE */
router.get('/profile', (req, res, next) => {

    res.json({greeting: 'login is successful'});
});

/* PROFILE FAILED ROUTE */
router.get('/profile2', (req, res, next) => {
    console.log("hello profile2");
    //console.log(req.body);
    res.json({greeting: '2hello API'});
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});
/* ADVERT ROUTE */
router.get('/create-save-ad', async function (req, res, next) {
    let newAd = await adController.createAndSaveAdvert()
    res.json(newAd)
})

router.post('/create-ad', async function (req, res) {

    let newAd = await adController.createAdvert(req.user.id, req.body.title, req.body.about, req.body.price)
    res.json(newAd)
})
router.get('/myAds', async function (req, res, next) {

    let ads = await adController.getAllAdsByUser(req.user)
    res.json(ads)
})

router.get('/allAds', async function (req, res, next) {
    console.log("ozge")
    let ads = await adController.getAllAdverts()
    res.json(ads)
})

/* ORDER ROUTE */
router.get('/create-save-order', async function (req, res, next) {
    let newOrder = await orderController.createAndSaveOrder()
    res.json(newOrder)
})

router.post('/create-order', async function (req, res, next) {
    let createdOrder = await orderController.createOrder(req.user._id, req.body.description, req.body.budget)
    res.json(createdOrder)
})
router.get('/myOrders', async function (req, res, next) {
    console.log("emre")
    let orders = await orderController.getAllOrdersByUser(req.user)
    res.json(orders)
})

router.get('/allOrders', async function (req, res, next) {
    console.log("dfsfsafsdvg")
    let orders = await orderController.getAllOrders()
    res.json(orders)
})
router.post('/apply', async function (req, res, next) {
    let orders = await orderController.apply(req.body._id, req.user)
    res.json(orders)
})

module.exports = router;

