const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the "music" folder
app.use('/music', express.static(path.join(__dirname, 'music')));

// Endpoint to get the list of MP3 files in the "music" folder
app.get('/tracks', (req, res) => {
    const musicFolder = path.join(__dirname, 'music');
    fs.readdir(musicFolder, (err, files) => {
        if (err) {
            res.status(500).json({ error: "Could not read music directory" });
            return;
        }

        // Filter only .mp3 files
        const mp3Files = files.filter(file => file.endsWith('.mp3'));
        res.json(mp3Files);
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
