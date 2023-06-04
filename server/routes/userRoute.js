const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecretKey = "try to hack this";
const Favorite = require("../models/favouriteModel");
const WatchLater = require('../models/watchLaterModel')
const  userAuth  = require("../middleware/userAuth");

// Route: POST /api/user/register
// Description: Register a new user
router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 'false', errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // Check if user with the same email already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ status: 'false', message: "User already exists" });
      }

      // Create a new user instance
      user = new User({ name, email, password });

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Save the user to the database
      await user.save();

      // Create a favorite for the new user
      const favorite = new Favorite({ user: user._id });
      await favorite.save();
      //crete a watchLater Model
      const watchLater = new WatchLater({ user: user._id });
      await watchLater.save();

      res.status(201).json({ status: 'true', message: "User registered successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'false', message: "Server Error" });
    }
  }
);
// Route: POST /api/user/login
// Description: Login and generate a JWT token
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status:'false',errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Compare the password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ status:'false',message: "Invalid credentials" });
      }

      // Generate a JWT token
      const payload = {
        user: {
          id: user.id,
        },
      };

      // const token = jwt.sign(payload, jwtSecretKey, { expiresIn: "1h" });
      const token = jwt.sign(payload, jwtSecretKey, );

      res.json({ status:'true',token,message:'Welcome Back '+ (user.name).charAt(0).toUpperCase()+(user.name).slice(1) });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status:'false',message: "Server Error" });
    }
  }
);

// Route: GET /api/user/getUser
// Description: Get user information by user email and password
router.get("/user", userAuth, async (req, res) => {
  try {
    // Retrieve the user ID from the authenticated request
    const userId = req.user.id;

    // Find the user by their ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user data
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

  

module.exports = router;
