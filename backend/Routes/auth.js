const express = require("express")
const Router = express.Router()
const authController = require("../controllers/authController")
const auth = require("../middleware/auth")

Router.post("/signup", authController.signup)
Router.post("/login", authController.login)

// Placeholder routes for the rest
Router.post("/logout", authController.logout)
Router.get("/me",auth, authController.getProfile)
Router.put("/me", auth, (req, res) => {
    res.send("Update user profile route")
})
Router.post("/forgot-password", (req, res) => {
    res.send("Forgot password route")
})

module.exports = Router
