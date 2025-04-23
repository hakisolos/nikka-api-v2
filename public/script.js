/** @format */

const burger = document.querySelector('.burger');
const sidebar = document.querySelector('.sidebar');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.close-btn');

burger.addEventListener('click', () => {
	sidebar.classList.add('active');
	overlay.classList.add('active');
	burger.classList.add('toggle');
});

closeBtn.addEventListener('click', () => {
	sidebar.classList.remove('active');
	overlay.classList.remove('active');
	burger.classList.remove('toggle');
});

overlay.addEventListener('click', () => {
	sidebar.classList.remove('active');
	overlay.classList.remove('active');
	burger.classList.remove('toggle');
});

// Add cool hover effect to the logo
document.querySelector('.logo').addEventListener('mouseover', () => {
	document.querySelector('.logo').style.animation = 'pulse 1s infinite';
});

document.querySelector('.logo').addEventListener('mouseout', () => {
	document.querySelector('.logo').style.animation = 'none';
});

let visitorCount = 0;
let requestCount = 0;

// Update counters (this would be replaced with actual data in a real application)
function updateCounters() {
	visitorCount += Math.floor(Math.random() * 5);
	requestCount += Math.floor(Math.random() * 10);

	document.getElementById('visitor-count').textContent =
		visitorCount.toLocaleString();
	document.getElementById('request-count').textContent =
		requestCount.toLocaleString();

	// Simulate counter updates
	setTimeout(updateCounters, 5000);
}

// Battery API implementation
function updateBattery() {
	if ('getBattery' in navigator) {
		navigator.getBattery().then(function (battery) {
			function updateBatteryStatus() {
				const batteryPercentage = Math.floor(battery.level * 100);
				document.getElementById('battery-percentage').textContent =
					batteryPercentage + '%';

				const batteryLevel = document.getElementById('battery-level');
				batteryLevel.style.width = batteryPercentage + '%';

				// Change color based on level
				if (batteryPercentage <= 20) {
					batteryLevel.style.background =
						'linear-gradient(to right, #f00, #f50)';
				} else if (batteryPercentage <= 50) {
					batteryLevel.style.background =
						'linear-gradient(to right, #f50, #ff0)';
				} else {
					batteryLevel.style.background =
						'linear-gradient(to right, #ff0, #0f0)';
				}
			}

			// Update battery status initially
			updateBatteryStatus();

			// Update when battery status changes
			battery.addEventListener('levelchange', updateBatteryStatus);
		});
	} else {
		document.getElementById('battery-percentage').textContent = 'Not available';
	}
}

// IP Address fetch
function getIPAddress() {
	fetch('https://api.ipify.org?format=json')
		.then(response => response.json())
		.then(data => {
			document.getElementById('ip-address').textContent = data.ip;
		})
		.catch(error => {
			document.getElementById('ip-address').textContent = 'Failed to fetch';
		});
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function () {
	updateCounters();
	updateBattery();
	getIPAddress();
});

document.addEventListener('DOMContentLoaded', function () {
	// Mock user data - replace with actual data later
	const userData = {
		username: 'JohnDoe123',
		email: 'johndoe@example.com',
		apiKey: 'NK-API-5f8e9c2d71b84a3e9b7f6d8c0a1e3b5a',
		created: 'April 15, 2025',
		lastLogin: 'Today at 09:45 AM',
	};

	// Set user initials for avatar
	function setUserInitials() {
		const username = userData.username;
		let initials = '';

		// Get first character of username
		if (username && username.length > 0) {
			initials = username.charAt(0).toUpperCase();

			// If username has multiple words, get first char of second word
			if (username.indexOf(' ') > 0) {
				const secondPart = username.split(' ')[1];
				if (secondPart && secondPart.length > 0) {
					initials += secondPart.charAt(0).toUpperCase();
				}
			} else {
				// If no space, take first two chars or just one if length is 1
				if (username.length > 1) {
					initials += username.charAt(1).toUpperCase();
				}
			}
		}

		document.getElementById('user-initials').textContent = initials;
	}

	// Populate profile data
	function populateProfileData() {
		document.getElementById('username').textContent = userData.username;
		document.getElementById('user-email').textContent = userData.email;
		document.getElementById('api-key').textContent = userData.apiKey;
		document.getElementById('account-created').textContent = userData.created;
		document.getElementById('last-login').textContent = userData.lastLogin;
	}

	// Copy API key to clipboard
	document
		.getElementById('copy-api-key')
		.addEventListener('click', function () {
			const apiKey = document.getElementById('api-key').textContent;
			navigator.clipboard
				.writeText(apiKey)
				.then(function () {
					alert('API Key copied to clipboard!');
				})
				.catch(function (err) {
					console.error('Could not copy text: ', err);
				});
		});

	// Reset API Key functionality
	document
		.querySelector('.reset-key-btn')
		.addEventListener('click', function () {
			if (
				confirm(
					'Are you sure you want to reset your API key? This action cannot be undone.'
				)
			) {
				// Generate a new mock API key
				const newApiKey =
					'NK-API-' +
					Math.random().toString(36).substring(2, 15) +
					Math.random().toString(36).substring(2, 15);
				document.getElementById('api-key').textContent = newApiKey;
				userData.apiKey = newApiKey;
				alert('API Key has been reset successfully!');
			}
		});

	// Logout functionality
	document.querySelector('.logout-btn').addEventListener('click', function () {
		if (confirm('Are you sure you want to logout?')) {
			alert('Logout successful!');
			// In a real application, you would redirect to logout page or perform logout actions
			// window.location.href = 'logout.php'; // or any logout endpoint
		}
	});

	// Initialize profile
	setUserInitials();
	populateProfileData();
});

document.addEventListener('DOMContentLoaded', function () {
	// Test button event listeners
	const testBtns = document.querySelectorAll('.test-btn');
	const modal = document.getElementById('test-modal');
	const closeModalBtn = document.querySelector('.close-modal');
	const sendRequestBtn = document.getElementById('send-request');

	// Range value display
	const temperatureSlider = document.getElementById('param-temperature');
	const temperatureValue = document.querySelector('.range-value');

	if (temperatureSlider) {
		temperatureSlider.addEventListener('input', function () {
			temperatureValue.textContent = this.value;
		});
	}

	// Open modal when test button is clicked
	testBtns.forEach(btn => {
		btn.addEventListener('click', function () {
			const endpoint = this.getAttribute('data-endpoint');
			openTestModal(endpoint);
		});
	});

	// Close modal
	if (closeModalBtn) {
		closeModalBtn.addEventListener('click', function () {
			modal.style.display = 'none';
		});
	}

	// Close modal when clicking outside
	window.addEventListener('click', function (event) {
		if (event.target === modal) {
			modal.style.display = 'none';
		}
	});

	// Send request functionality
	if (sendRequestBtn) {
		sendRequestBtn.addEventListener('click', function () {
			sendTestRequest();
		});
	}

	// Function to open test modal
	function openTestModal(endpoint) {
		document.getElementById('test-endpoint-name').textContent =
			'Text Generation';
		document.getElementById('endpoint-url').textContent =
			'/api/v1/ai/generate-text';

		// Reset response area
		document.getElementById('response-data').textContent =
			'// Response will appear here after testing';

		// Display the modal
		modal.style.display = 'flex';
	}

	// Function to send test request
	function sendTestRequest() {
		const prompt = document.getElementById('param-prompt').value;
		const tokens = document.getElementById('param-tokens').value;
		const temperature = document.getElementById('param-temperature').value;

		// For demonstration purposes, we'll just create a mock response
		// In a real application, you would make an actual API call
		setTimeout(() => {
			const mockResponse = {
				success: true,
				data: {
					text: prompt
						? `Generated text based on: ${prompt}`
						: 'This is a sample generated text. The AI would respond with relevant content based on your prompt and parameters.',
					tokens_used: tokens,
					temperature: temperature,
				},
				timestamp: new Date().toISOString(),
			};

			document.getElementById('response-data').textContent = JSON.stringify(
				mockResponse,
				null,
				2
			);
		}, 1000);

		// Show loading state
		document.getElementById('response-data').textContent = 'Loading...';
	}

	// Category filter with navigation
	const categoryFilter = document.getElementById('category-filter');
	if (categoryFilter) {
		categoryFilter.addEventListener('change', function () {
			const category = this.value;
			if (category) {
				// Navigate to the selected category page
				window.location.href = '/' + category;
			}
		});
	}

	// Search functionality
	const searchInput = document.getElementById('endpoint-search');
	if (searchInput) {
		searchInput.addEventListener('input', function () {
			const searchTerm = this.value.toLowerCase();
			const rows = document.querySelectorAll('.table-row');

			rows.forEach(row => {
				const name = row
					.querySelector('.endpoint-name')
					.textContent.toLowerCase();
				const path = row
					.querySelector('.endpoint-path')
					.textContent.toLowerCase();

				if (name.includes(searchTerm) || path.includes(searchTerm)) {
					row.style.display = '';
				} else {
					row.style.display = 'none';
				}
			});
		});
	}
});

//==========================// VERIFICATION SCRIPT //=====================================================
// =============== SIGNUP ==================== //
