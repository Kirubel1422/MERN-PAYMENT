const {
  loginController,
  signupController,
  deleteController,
} = require("../controllers/userController");
const router = require("express").Router();

router.post("/login", loginController);
router.post("/signup", signupController);
router.delete("/deleteAccount", deleteController);

module.exports = router;
