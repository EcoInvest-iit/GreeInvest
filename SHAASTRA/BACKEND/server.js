const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '..', 'FRONTEND'))); // Adjusted path

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html')); // Adjusted path
});

const flaskApiUrl = "http://127.0.0.1:5000/api/predict"; // Change this URL when Flask is deployed

app.post('/api/predict', async (req, res) => {
    const { field1 } = req.body; // Extracting data from the frontend request
    try {
        const response = await axios.post(flaskApiUrl, { field1 });
        res.json(response.data); // Send the response from Flask API back to the frontend
    } catch (error) {
        console.error("Error fetching data from Flask API:", error);
        res.status(500).json({ error: "Failed to fetch data from Flask API." });
    }
});

app.listen(3000, function () {
    console.log("Server is listening on port: 3000");
});
