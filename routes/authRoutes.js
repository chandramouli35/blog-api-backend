const express = require("express");
const {
  signup,
  login,
  verifyOTP,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

const router = express.Router();
// Routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/verify", verifyOTP);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;

// const express = require("express");
// const {
//   signup,
//   login,
//   verifyOTP,
//   forgotPassword,
//   resetPassword,
// } = require("../controllers/authController");
// const authMiddleware = require("../middleware/AuthMiddleware"); // Adjust the path as needed

// const router = express.Router();

// // Routes
// router.post("/signup", signup);
// router.post("/login", login);
// router.post("/verify", verifyOTP);
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password/:token", resetPassword);

// // Example of a protected route
// router.get("/protected-route", authMiddleware, (req, res) => {
//   res
//     .status(200)
//     .json({ message: "This is a protected route", user: req.user });
// });

// module.exports = router;
