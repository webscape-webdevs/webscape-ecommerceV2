const router = require("express").Router();
const userController = require("../controllers/userControllers");
const { isAuthenticated } = require("../middlewares/auth");

router.get("/get-user-data", isAuthenticated, userController.getUserData);

module.exports = router;
