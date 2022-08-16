import * as controller from "../controllers"
const express = require('express')
const router = express.Router();

// Register endpoint
router.post("/register", controller.register);

// Login endpoint
router.post("/login", controller.login);

// Find all users endpoint
router.get("/all", controller.getAllUsers);

// Find user with custom query endpoint
router.post("/search", controller.getUsersByQuery);

// Update user endpoint
router.put("/update", controller.updateUsers);

// Delete user endpoint
router.delete("/delete", controller.deleteUsers);

export default router;
