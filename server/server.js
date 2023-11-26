const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const userModel = require("./models/user");

const app = express();

app.use(express.json());
app.use(cors()); // Enable CORS

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

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

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

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
