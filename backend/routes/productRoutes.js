const router = require('express').Router();
const productController = require ('../controllers/productController')
const {isAuthenticated} = require("../middlewares/auth");
const {isAdmin} = require("../middlewares/auth");

router.get('/get-products-admin', isAuthenticated, isAdmin, productController.getProductsAdmin);
router.post('/create-product-admin', isAuthenticated, isAdmin, productController.createProduct);
router.put('/delete-product-admin', isAuthenticated, isAdmin, productController.deleteProduct);
router.put('/update-product-admin', isAuthenticated, isAdmin, productController.updateProduct);
router.get('/get-products', productController.getProducts);

module.exports = router;