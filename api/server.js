/** @format */

const express = require('express');
const path = require('path');
const PORT = 3000;

const haki = express();
haki.use(express.static(path.join(__dirname, '../public')));

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
haki.listen(PORT, () => {
	console.log('app listening on port 300');
});
