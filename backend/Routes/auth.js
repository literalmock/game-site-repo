const express = require("express")
const Router = express.Router()
const authController = require("../controllers/authController")

Router.post("/login", authController.login)
Router.post("/signup", authController.signup)

// Placeholder routes for the rest
Router.post("/logout", (req, res) => {
    res.send("Logout route")
})
Router.get("/me", (req, res) => {
    res.send("User profile route")
})
Router.put("/me", (req, res) => {
    res.send("Update user profile route")
})
Router.post("/forgot-password", (req, res) => {
    res.send("Forgot password route")
})

module.exports = Router
