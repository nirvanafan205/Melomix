// Import Mongoose library
const mongoose = require("mongoose");

// Define a Mongoose schema named userSchema
const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
});

// Create a Mongoose model named userModel
// The model corresponds to the "users" collection in MongoDB
const userModel = mongoose.model("users", userSchema);

// Export the userModel so that it can be used in other parts of the application
// This allows other modules to interact with the "users" collection using the defined schema and model
module.exports = userModel;
