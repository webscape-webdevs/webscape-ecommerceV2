const router = require('express').Router();
const orderController = require ('../controllers/orderController')
const {isAuthenticated} = require("../middlewares/auth");
const {isAdmin} = require("../middlewares/auth");

router.get('/get-orders-admin', isAuthenticated, isAdmin, orderController.getOrdersAdmin);
router.put('/delete-order-admin', isAuthenticated, isAdmin, orderController.deleteOrder);
router.put('/update-order-admin', isAuthenticated, isAdmin, orderController.updateOrder);
router.get('/get-orders-user', isAuthenticated, orderController.getOrdersUser);
router.post('/create-order', isAuthenticated, orderController.createOrder);

module.exports = router;