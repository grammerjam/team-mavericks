const path = require('path');
const fs = require('fs');

//Function to read media JSON data
exports.getMediaJson = () => {
    const filePath = path.join(__dirname, '../../frontend/src/movies.json');
    const mediaData = fs.readFileSync(filePath);
    return JSON.parse(mediaData);
};

