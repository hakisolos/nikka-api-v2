/** @format */
const jwt = require('jsonwebtoken');
// Authentication middleware function - FIXED VERSION
const isAuthenticated = (req, res, next) => {
	// Check for token in cookies, headers, or query params only
	// REMOVED: localStorage reference that was causing the error
	const token =
		req.cookies?.authToken ||
		req.headers.authorization?.replace('Bearer ', '') ||
		req.query.token;

	// No token found, redirect to auth page
	if (!token) {
		console.log('No authentication token found');
		return res.redirect('/auth');
	}

	try {
		// Verify the token
		const decodedUser = jwt.verify(token, process.env.JWT_SECRET);

		// Add user info to the request object for use in route handlers
		req.user = decodedUser;

		// Token is valid, proceed to the requested route
		next();
	} catch (error) {
		console.log('Invalid token:', error.message);
		return res.redirect('/auth');
	}
};
module.exports = isAuthenticated;
