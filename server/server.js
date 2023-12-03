const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const userModel = require("./models/user");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/Users");

app.post("/register", async (req, res) => {
  try {
    // Validate the data (similar to client-side validation logic)
    let errors = [];

    if (req.body.password.length < 6) {
      errors.push("Password is too short (min 6 characters)");
    }

    if (!/[A-Z]/.test(req.body.password)) {
      errors.push("Password must contain at least one uppercase letter");
    }

    if (!/\d/.test(req.body.password)) {
      errors.push("Password must contain at least one number");
    }

    if (!/\d/.test(req.body.username)) {
      errors.push("Username must contain at least one number");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
      errors.push("Enter a valid email address");
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(req.body.password)) {
      errors.push("Password must contain at least one special character");
    }
    if (errors.length > 0) {
      // If there are validation errors, return them to the client
      return res.status(400).json({ errors });
    }

    // Check if the username already exists
    const existingUser = await userModel.findOne({ name: req.body.username });

    if (existingUser) {
      // If the username exists, return an error message to the client
      return res.status(400).json({ errors: ["Username already exists"] });
    }

    // Hash the password with bcrypt
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Save user data to the database using the userModel
    const user = new userModel({
      name: req.body.username,
      password: hashedPassword,
      email: req.body.email,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login endpoint
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username exists
    const user = await userModel.findOne({ name: username });

    if (!user) {
      // If the username does not exist, return an error message
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check if the provided password matches the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      // If the passwords do not match, return an error message
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // You can include additional user data in the response if needed
    res.json({
      message: "Login successful",
      username: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
