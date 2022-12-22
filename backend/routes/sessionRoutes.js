const router = require("express").Router();
const sessionController = require("../controllers/sessionController");
const {isAuthenticated} = require("../middlewares/auth");

router.get("/get-session", sessionController.getSession);

router.post("/register", sessionController.register);

router.post("/login", sessionController.login);

router.get("/logout", sessionController.logout);

module.exports = router;
