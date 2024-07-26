const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Number of cookies to create
const numCookies = 800;

// Small payload for cookies
const payload = 'smallPayload';

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to set cookies
app.get('/set-cookies', (req, res) => {
    // Set multiple cookies
    for (let i = 1; i <= numCookies; i++) {
        res.cookie(`cookie_${i}`, payload, {
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            httpOnly: true
        });
    }

    res.send('Set ' + numCookies + ' cookies with payload: "' + payload + '"');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
