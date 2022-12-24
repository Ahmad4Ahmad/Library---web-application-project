const express = require("express");
const router = express.Router();
const {registerUser, loginUser, logout, getUser, signinStatus, updateUser} = require("../controllers/userController");
const protect = require("../middleWare/authMiddleware");

router.post("/signup", registerUser);
router.post("/signin", loginUser);
router.post("/signout", logout);
router.post("/getuser", protect, getUser);
router.post("/signedin", signinStatus);
router.patch("/updateuser", protect, updateUser);

module.exports = router;