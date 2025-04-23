/** @format */

const express = require('express');
const path = require('path');
const PORT = 3000;
const conn = require('../lib/config/user');
const User = require('../lib/models/User');
const isAuthenticated = require('../lib/middlewares/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const haki = express();
haki.use(express.json()); // Add this line to parse JSON request bodies
haki.use(express.static(path.join(__dirname, '../public')));
haki.use(cookieParser());
require('dotenv').config();
haki.get('/', isAuthenticated, (req, res) => {
	res.redirect('/dash');
});

haki.get('/dash', isAuthenticated, (req, res) => {
	res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

haki.get('/ai', isAuthenticated, (req, res) => {
	res.sendFile(path.join(__dirname, '../public', 'ai.html'));
});

haki.get('/download', isAuthenticated, (req, res) => {
	res.sendFile(path.join(__dirname, '../public', 'download.html'));
});

haki.get('/search', isAuthenticated, (req, res) => {
	res.sendFile(path.join(__dirname, '../public', 'search.html'));
});

haki.get('/stalker', isAuthenticated, (req, res) => {
	res.sendFile(path.join(__dirname, '../public', 'stalker.html'));
});

haki.get('/tools', isAuthenticated, (req, res) => {
	res.sendFile(path.join(__dirname, '../public', 'tools.html'));
});

haki.get('/profile', isAuthenticated, (req, res) => {
	res.sendFile(path.join(__dirname, '../public', 'profile.html'));
});

haki.get('/anime', isAuthenticated, (req, res) => {
	res.sendFile(path.join(__dirname, '../public', 'anime.html'));
});

// Auth route should remain unprotected
haki.get('/auth', (req, res) => {
	res.sendFile(path.join(__dirname, '../public', 'signup.html'));
});

// A test endpoint to verify authentication
haki.get('/api/check-auth', isAuthenticated, (req, res) => {
	res.json({
		authenticated: true,
		user: req.user,
		message: 'Authentication successful',
	});
});
haki.post('/api/register', async (req, res) => {
	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.password, salt);
		const newUser = new User({
			email: req.body.email,
			password: hashedPassword,
		});
		const savedUser = await newUser.save();
		res.status(201).json({ message: 'User registered successfully ' });
	} catch (e) {
		console.log(e);
		res.status(500).json({ error: err.message });
	}
});

haki.post('/api/login', async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (!user) return res.status(404).json({ error: 'User not found' });

		const validPass = await bcrypt.compare(req.body.password, user.password);
		if (!validPass) return res.status(400).json({ error: 'Invalid password' });

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: '1d',
		});

		// Set token as cookie (this is additional to your localStorage approach)
		res.cookie('authToken', token, {
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000, // 1 day
		});

		// Keep the same response format you're currently using
		res.status(200).json({
			message: 'Login successful 🥰',
			token,
			user: {
				id: user._id,
				username: user.email.split('@')[0],
				email: user.email,
			},
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});
haki.post('/api/logout', (req, res) => {
	res.clearCookie('authToken');
	res.status(200).json({ message: 'Logged out successfully' });
});

haki.listen(PORT, async () => {
	console.log('syncing database');
	await conn();
	console.log('app listening on port 3000');
});
