const express = require('express');
const path = require('path');
const crypto = require('crypto'); // For generating random strings
const app = express();
const port = 3000;

// Number of cookies to create and Size
const numCookies = 500;
const cookieSize = 50;

// Function to generate a random string of capital letters
function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to set cookies
app.get('/set-cookies', (req, res) => {
    // Set multiple cookies with random payloads
    for (let i = 1; i <= numCookies; i++) {
        // Generate a random payload of a specific size
        const payload = generateRandomString(cookieSize);

        res.cookie(`cookie_${i}`, payload, {
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            httpOnly: true
        });
    }

    res.send(`Set ${numCookies} cookies with ${cookieSize} byte payloads.`);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
