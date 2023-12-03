const express = require('express');
const cors = require('cors');
const {getGraphData, getToken, getNews, getLastTrade, pricesFromSymbols, getPricingProduct, getVolumeProduct, getCompanyInfo,getAccountNumber, getPositions, getAccountBalance, postOrder } = require('./api.js');
const { addToWatchlist, getUniqueStocksymbols, isOnWatchlist, removeFromWatchlist, getActiveSymbols,getAllSymbols, updateStockStatus } = require('./db')

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
app.post('/postOrder', async (req, res) => {
    try {
        // // Extract parameters from the request body
        const {quantity,quantityType,action,instrumentId } = req.body;
        
        // // Validate the parameters
        // if (!reqAction || !accountNum || !orderType || !quantity || !action || !symbol || !quantityType) {
        //     return res.status(400).send('Missing required parameters');
        // }

        // Call the postOrder function
        const orderResponse = await postOrder(quantity,quantityType,action,instrumentId);

        // Send the response back to the client
        res.json(orderResponse);
    } catch (error) {
        console.error('Error in /postOrder endpoint:', error);
        res.status(500).send('Error processing order.');
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
        const {symbols} = req.query;
        console.log("Getting News")
        const news = await getNews(symbols);
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

app.get('/getPricingProduct', async(req,res)=>{
    try {
        const {symbols} = req.query;
        if (!symbols) {
            return res.status(400).send('Missing required query parameters: symbols');
        }
        console.log("Getting PricingProduct")
        const lastTrade = await getPricingProduct(symbols);
        res.json(lastTrade);
    } catch (error) {
        console.error('Error fetching Pricing Product in express:', error);
        res.status(500).send('Error fetching Pricing Product in express.');
    }
})

app.get('/getVolumeProduct', async(req,res)=>{
    try {
        const {symbols} = req.query;
        if (!symbols) {
            return res.status(400).send('Missing required query parameters: symbols');
        }
        console.log("Getting PricingProduct")
        const volProduct = await getVolumeProduct(symbols);
        res.json(volProduct);
    } catch (error) {
        console.error('Error fetching Volume Product in express:', error);
        res.status(500).send('Error fetching Volume Product in express.');
    }
})

app.get('/getCompanyInfo', async(req,res)=>{
    try {
        const {symbols} = req.query;
        if (!symbols) {
            return res.status(400).send('Missing required query parameters: symbols');
        }
        console.log("Getting CompanyInfo")
        const companyInfo = await getCompanyInfo(symbols);
        res.json(companyInfo);
    } catch (error) {
        console.error('Error fetching Company Info in express:', error);
        res.status(500).send('Error fetching Company Info in express.');
    }
})
app.get('/getAccountNumber',async(req,res)=>{
    
    try{
        console.log("Fetching account data...")
        const accounts =await getAccountNumber();
        res.json(accounts);
    }catch{
        console.error('Error fetching accounts in express:');
        res.status(500).send('Error fetching watchlist symbols in express.');
    }
});

app.get('/getActiveSymbols', async(req, res) => {
    try {
        console.log("Fetching Active Symbols...")
        const symbols = await getActiveSymbols();

        res.header('Content-Type', 'application/json');
        res.json(symbols);
    } catch (error) {
        console.error('Error fetching active symbols in express:', error);
        res.status(500).send('Error fetching active symbols in express.');
    }
});

app.get('/getAllSymbols', async(req, res) => {
    try {
        console.log("Fetching All Filter Symbols...")
        const symbols = await getAllSymbols();

        res.header('Content-Type', 'application/json');
        res.json(symbols);
    } catch (error) {
        console.error('Error fetching All Filter symbols in express:', error);
        res.status(500).send('Error fetching All Filter symbols in express.');
    }
});

app.post('/getPositions',async(req,res)=>{
    try{
        const {account} = req.body;
        console.log("Server getPositions acc: ", req.body);
        const accountPositions = await getPositions(account);
        res.json(accountPositions);
    }catch(error){
        console.error('Error fetching account Positions in express:', error);
    }
});

app.post('/getAccountBalance',async(req,res)=>{
    try {
        const {account} = req.body;
        console.log("Server getBalance acc: ", req.body);
        const accountBalance = await getAccountBalance(account);
        res.json(accountBalance);
    } catch (error) {
        console.error('Error fetching Balance in express:', error);
        res.status(500).send('Error fetching Balance in express.');
    }
})

app.post('/storeData', (req, res) => {
    const { Symbol, Headline } = req.body;
    addToWatchlist(Symbol, Headline);
    res.send('Data received successfully'); // Send a response back to the client
});

app.post('/removeWatchlist', async (req, res) => {
    const { Symbol } = req.body;
    await removeFromWatchlist(Symbol);
    res.send('Data successfully removed'); // Send a response back to the client
});


app.post('/isOnWatchlist', async (req, res) => {
    const {Symbol} = req.body;
    console.log("Server.js Symbol: ", Symbol)
    const status = await isOnWatchlist(Symbol)
    res.json(status); 
});

app.post('/updateStockStatus', async (req, res) => {
    const { Symbol, Active } = req.body;
    await updateStockStatus(Symbol, Active);
    res.send('Data successfully removed'); // Send a response back to the client
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


