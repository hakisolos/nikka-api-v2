/** @format */

const mongoose = require('mongoose');

// Define the schema for the User
const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true, // Ensure email is unique in the database
		match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, // Basic regex for validating email
	},
	password: {
		type: String,
		required: true, // Password is required
		min: 6, // Optional: Password must be at least 6 characters
	},
});

// Create the User model based on the schema
const User = mongoose.model('User', UserSchema);

module.exports = User; // Export the model for use in other files
