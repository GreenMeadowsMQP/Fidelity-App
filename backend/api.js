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

async function getNews() {
    try {
        console.log("Getting News API")
        const response = await axios.get("https://gp-sandbox.fidelity.com/ftgw/fcat/md/asset/v1/equity/company/news?symbols=AAPL", {
            headers: {
                'x_gm_api_key': apiKey,
                'x_gm_ext_token': apiToken
            }
        });
        const newsData = response.data;
        console.log("API Response:", response.data);
        console.log("Succesfully Got News API")
        return response.data;
    } catch (error) {
        console.error('Error fetching news:', error);
        console.error(error.response ? error.response.data : error.message); 
        throw error;
    }
}

module.exports = {
    getToken,
    getNews
};
