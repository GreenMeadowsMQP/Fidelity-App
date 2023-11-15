const axios = require('axios');
require('dotenv').config();

const apiKey = process.env.X_GM_API_KEY;
const userId = process.env.X_GM_USER_ID;
let apiToken = null;

async function getToken() {
    try {
        const response = await axios.get('https://gp-sandbox.fidelity.com/token/retail', {
            headers: {
                'accept': '*/*',
                'x_gm_api_key': apiKey,
                'x_gm_user_id': userId
            }
        });
       apiToken = response.data;
       console.log("apiToken:", apiToken);
    } catch (error) {
        console.error('Error fetching token:', error);
        
        throw error;
    }
}
// async function getPricing(){ //Work in progress 
//     try{
//         const response = await axios.get('https://example.com/ftgw/fcat/md/asset/v1/equity/analytics/pricing',{
//             headers:{
//                 'accept': '*/*',
//                 'x_gm_api_key': apiKey,
//                 'x_gm_ext_token': apiToken
//             }
//         })
//     }


// }

async function getNews() {
    try {
        console.log("Getting News API")
        const response = await axios.get("https://gp-sandbox.fidelity.com/ftgw/fcat/md/asset/v1/equity/company/news?symbols=AAPL", { //the querry params are after ?symbols = ...& limit/count/perpage
            headers: {
                'x_gm_api_key': apiKey,
                'x_gm_ext_token': apiToken
            }
        });
        const newsData = response.data;
        // console.log("API Response:", response.data);
        console.log("Succesfully Got News API")
        return response.data;
    } catch (error) {
        console.error('Error fetching news in API:', error);
        // console.error(error.response ? error.response.data : error.message); 
        throw error;
    }
}
async function getGraphData(symbols, startDate, endDate){
    try {
        console.log("Getting Graph Data")
        const response =await axios.get("https://gp-sandbox.fidelity.com/ftgw/fcat/md/asset/v1/equity/historical/market-close",{
            headers:{
                'accept': '*/*',
                'x_gm_api_key': apiKey,
                'x_gm_ext_token': apiToken
            },
            params:{
                symbols: symbols,
                startDate:startDate,
                endDate:endDate
            }
        });
        const graphData = response.data;
        // console.log("Respone Length",response.data.content[0].records.length)
        // console.log("Respone Length",response.data.content[0].records)
        // console.log("API Response:", response.data);
        console.log("Successfully Got Graph Data");
        return graphData;
    } catch(error) {
        console.error("Error fetching Graph Data in API");
        // console.error(error.response ? error.response.data : error.message);
        throw error;
    }
}
async function getLastTrade(symbols){
    try{
        console.log("getting Last Trade Product for "+ symbols)
        const response = await axios.get("https:///gp-sandbox.fidelity.com/ftgw/fcat/md/asset/v2/equity/last-trade",{
            headers:{
                'accept': '*/*',
                'x_gm_api_key': apiKey,
                'x_gm_ext_token': apiToken
            },
            params:{
                symbols: symbols,
                display:false //change this later on
            }
        })
        const lastTradeData = response.data;
        console.log(lastTradeData)
        return lastTradeData;
    }catch(error){
        console.error("Error fetchin LastTradeProduct")
        // console.error(error.response ? error.response.data:error.message);
    }
}

async function pricesFromSymbols(symbs) {
    try {
        const prices = await Promise.all(symbs.map(async (symbol) => {
            try {
                const lastTradeData = await getLastTrade(symbol);
                const price = lastTradeData.content[0].price;
                const change = lastTradeData.content[0].netChange;                
                return { symbol, price, change };
            } catch (error) {
                // Handle errors for individual symbols, e.g., if getLastTrade fails for a symbol
                console.error(`Error fetching price for symbol ${symbol}:`, error);
                // return { symbol, price: null, change:null }; // You can adjust this as needed
            }
        }));
        return prices;
    } catch (error) {
        console.error('Error fetching prices for symbols:', error);
        throw error; // You might want to handle or log this error in the calling code
    }
}

module.exports = {
    getToken,
    getNews,
    getGraphData,
    getLastTrade,
    pricesFromSymbols
};
