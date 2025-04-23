/** @format */

const express = require('express');
const path = require('path');
const PORT = 3000;
const conn = require('../lib/config/user');
const User = require('../lib/models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const haki = express();
haki.use(express.json()); // Add this line to parse JSON request bodies
haki.use(express.static(path.join(__dirname, '../public')));
require('dotenv').config();
haki.get('/dash', (req, res) => {
	res.sendFile(path.join(__dirname, '../public', 'index.html'));
});
haki.get('/ai', (req, res) => {
	res.sendFile(path.join(__dirname, '../public', 'ai.html'));
});
haki.get('/download', (req, res) => {
	res.sendFile(path.join(__dirname, '../public', 'download.html'));
});
haki.get('/search', (req, res) => {
	res.sendFile(path.join(__dirname, '../public', 'search.html'));
});
haki.get('/stalker', (req, res) => {
	res.sendFile(path.join(__dirname, '../public', 'stalker.html'));
});
haki.get('/tools', (req, res) => {
	res.sendFile(path.join(__dirname, '../public', 'tools.html'));
});
haki.get('/profile', (req, res) => {
	res.sendFile(path.join(__dirname, '../public', 'profile.html'));
});
haki.get('/anime', (req, res) => {
	res.sendFile(path.join(__dirname, '../public', 'anime.html'));
});
haki.get('/auth', (req, res) => {
	res.sendFile(path.join(__dirname, '../public', 'signup.html'));
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
haki.listen(PORT, async () => {
	console.log('syncing database');
	await conn();
	console.log('app listening on port 3000');
});
