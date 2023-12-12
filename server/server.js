const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const userModel = require("./models/user");

// Import Genius lyrics package
const Genius = require("genius-lyrics");
const Client = new Genius.Client();
const app = express();

app.use(express.json());
app.use(cors( 
  {
    origin: "*",
    methods: ["POST", "GET"],
    credentials: false
  }
));

mongoose.connect("mongodb://127.0.0.1:27017/Users");

//test method
app.get('/test', (req, res) => {
  res.status(200).send(); // Respond with a 200 OK status
});

//lyrics backend here
app.get('/scrape/:songName', async (req, res) => {
  const songName = req.params.songName;
  console.log("searching for " + songName);
  try {
      const searches = await Client.songs.search(songName);
      if (searches.length === 0) {
          return res.status(404).send({ error: "No songs found" });
      }

      // Pick the first song from the search results
      const firstSong = searches[0];
      const lyrics = await firstSong.lyrics();

      console.log(lyrics);
      return res.send({ title: firstSong.title, lyrics: lyrics });
  } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "Error fetching lyrics" });
  }
});


app.post("/register", async (req, res) => {
  try {
    // Validate the data (similar to client-side validation logic)
    console.log("someone registering");
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
    console.log("someone logging in");
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

// Combined Settings endpoint for changing username, changing password, and deleting account
app.post("/settings", async (req, res) => {
  try {
    const {
      currentUsername,
      newUsername,
      password,
      username,
      newPassword,
      deleteAccount,
      email,
    } = req.body;

    // For deleting an account
    if (deleteAccount && email && username && password) {
      // Find the user by email and username
      const user = await userModel.findOne({ email: email, name: username });
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Check if the provided password matches the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Delete the user account from the database
      await userModel.deleteOne({ _id: user._id });

      res.json({ message: "Account deleted successfully." });
    }
    // For changing username
    else if (currentUsername && newUsername && password) {
      // Validate new username
      const usernameRegex = /\d/;
      if (!usernameRegex.test(newUsername)) {
        return res
          .status(400)
          .json({ error: "New username must contain at least one number." });
      }

      // Check if new username already exists
      const usernameExists = await userModel.findOne({ name: newUsername });
      if (usernameExists) {
        return res.status(400).json({ error: "Username already taken." });
      }

      // Verify current password
      const user = await userModel.findOne({ name: currentUsername });
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials." });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid credentials." });
      }

      // Update username
      user.name = newUsername;
      await user.save();

      res.json({
        message: "Username changed successfully.",
        newUsername: user.name,
      });
    }
    // For changing password
    else if (username && newPassword) {
      // Validate new password
      if (
        newPassword.length < 6 ||
        !/[A-Z]/.test(newPassword) ||
        !/\d/.test(newPassword) ||
        !/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)
      ) {
        return res
          .status(400)
          .json({ error: "Password does not meet criteria." });
      }

      // Find the user
      const user = await userModel.findOne({ name: username });
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Hash and update the new password
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedNewPassword;
      await user.save();

      res.json({ message: "Password changed successfully." });
    } else {
      // If none of the conditions match, send an error response
      return res.status(400).json({ error: "Invalid request parameters." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
