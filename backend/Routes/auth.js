const express = require("express")
const Router = express.Router()
const authController = require("../controllers/authController")
const auth = require("../middleware/auth")

Router.post("/signup", authController.signup)
Router.post("/login", authController.login)

// Placeholder routes for the rest
Router.post("/logout", authController.logout)
Router.get("/me",auth, authController.getProfile)
Router.put("/me", auth, authController.updateProfile)

Router.post("/forgot-password", authController.forgotPassword)
// Route for resetting password
Router.post("/reset-password/:token", authController.resetPassword)

module.exports = Router
