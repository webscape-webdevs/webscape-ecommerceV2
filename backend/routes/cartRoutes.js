const router = require('express').Router();
const cartController = require ('../controllers/cartController')
const {isAuthenticated} = require("../middlewares/auth");

router.get('/get-user-cart', isAuthenticated, cartController.getUserCart);
router.post('/add-to-cart', isAuthenticated, cartController.addToCart);
router.put('/remove-from-cart', isAuthenticated, cartController.removeFromCart);

module.exports = router;