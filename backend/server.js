const express = require('express');
const cors = require('cors');
const {getGraphData, getToken, getNews, getLastTrade, pricesFromSymbols,getAccountNumber } = require('./api.js');
const { addToWatchlist, getUniqueStocksymbols } = require('./db')

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
app.get('/getGraphData', async (req, res) => {
    try {
        // Extract query parameters from the request
        const { symbols, startDate, endDate } = req.query;

        // Validate the required parameters
        if (!symbols || !startDate || !endDate) {
            return res.status(400).send('Missing required query parameters: symbols, startDate, endDate');
        }

        // Call getGraphData with the query parameters
        const graphData = await getGraphData(symbols, startDate, endDate);

        // Send the graph data back to the client
        res.json(graphData);
        // console.log("Server Printing",graphData)
    } catch (error) {
        console.error('Error fetching graph data in express:', error);
        res.status(500).send('Error fetching graph data in express.');
    }
});
app.get('/getLastTrade',async(req,res)=>{
    try {
        const {symbols} = req.query;
        if (!symbols) {
            return res.status(400).send('Missing required query parameters: symbols');x
        }
        console.log("Getting LastTrade")
        const lastTrade = await getLastTrade(symbols);
        res.json(lastTrade);
    } catch (error) {
        console.error('Error fetching Last Trade in express:', error);
        res.status(500).send('Error fetching Last Trade in express.');
    }
})

app.get('/getNews', async (req, res) => {
    try {
        console.log("Getting News")
        const news = await getNews();
        res.json(news);
    } catch (error) {
        console.error('Error fetching news in express:', error);
        res.status(500).send('Error fetching news in express.');
    }
});

app.get('/getWatchlist', async(req, res) => {
    try {
        console.log("Fetching watchlist data...")
        const symbs = await getUniqueStocksymbols();
        const prices = await pricesFromSymbols(symbs);

        res.header('Content-Type', 'application/json');
        res.json(prices);
    } catch (error) {
        console.error('Error fetching watchlist symbols in express:', error);
        res.status(500).send('Error fetching watchlist symbols in express.');
    }
});
app.get('/getAccountNumber',async(req,res)=>{
    
    try{
        console.log("Fetching account data...")
        const accounts =await getAccountNumber();
        res.json(accounts);
    }catch{
        console.error('Error fetching accounts in express:', error);
        res.status(500).send('Error fetching watchlist symbols in express.');
    }
});
app.post('/storeData', (req, res) => {
    const { Symbol, Headline } = req.body;
    addToWatchlist(Symbol, Headline);
    res.send('Data received successfully'); // Send a response back to the client
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


