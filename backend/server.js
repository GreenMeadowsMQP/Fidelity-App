const express = require('express');
const cors = require('cors');
const { getToken, getNews } = require('./api.js');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/getToken', async (req, res) => {
    try {
        const token = await getToken();
        res.json({ token });
    } catch (error) {
        console.error('Error fetching token:', error);
        res.status(500).send('Error fetching token.');
    }
});

app.get('/getNews', async (req, res) => {
    try {
        const news = await getNews();
        res.json(news);
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).send('Error fetching news.');
    }
});

console.log("About to fetch initial token...");
getToken().then(token => {
    console.log('Received token');
}).catch(error => {
    console.error('Error during initial token fetch:', error);
});

console.log("About to start server...");
try {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
} catch (error) {
    console.error("Error starting server:", error);
}