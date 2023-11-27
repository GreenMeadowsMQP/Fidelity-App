require('dotenv').config();

const { MongoClient, ServerApiVersion } = require('mongodb');
const dbPwd = process.env.DB_PWD;
const uri = `mongodb+srv://stockade:${dbPwd}@stockade.4ducc.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


async function insertDocument(symbol, headline) {
    try {
      // Get a reference to the database and collection you want to insert into
      const db = client.db("StockADE"); // Replace "your_database_name" with the actual database name
      const collection = db.collection("Watchlist"); // Replace "your_collection_name" with the actual collection name
  
      // Define the document you want to insert
      const document = {
        Symbol: symbol,
        Headline: headline,
        // Add more key-value pairs as needed
      };
  
      // Insert the document into the collection
      const result = await collection.insertOne(document);
  
      // Log the result
      console.log(`Inserted document with _id: ${result.insertedId}`);
    } catch (err) {
      console.error("Error inserting document:", err);
    }
  }

  async function addToWatchlist(symbol, headline) {
    try {
      await client.connect();
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
  
      // Call the function to insert a document
      await insertDocument(symbol, headline);
    } finally {
      // await client.close();
    }
  }

  async function getUniqueStocksymbols() {
    // Use connect method to connect to the server
    // const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
    try {
      // await client.connect();  
      const db = client.db("StockADE");
      const collection = db.collection('Watchlist');

      // Use aggregation pipeline to get unique stock symbols
      const result = await collection.aggregate([
        { $group: { _id: '$Symbol', count: { $sum: 1 } } },
        { $match: { count: { $gte: 1 } } },
        { $project: { _id: 0, symbol: '$_id' } }
      ]).toArray();
  
      const uniqueStocksymbols = result.map(item => item.symbol);
  
      console.log('Getting Unique Stock symbols:', uniqueStocksymbols);
      return uniqueStocksymbols.sort();

    } finally {
      // await client.close();
    }
  }

  async function removeFromWatchlist(valueToDelete) {
    // const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  
    try {
      await client.connect();
  
      const db = client.db('StockADE');
      const collection = db.collection('Watchlist'); // Replace with the actual name of your collection
  
      // Delete entries with the specified value
      console.log('Attempting deletion for: ', valueToDelete)
      const result = await collection.deleteMany({ Symbol: valueToDelete }); // Replace with the actual field name
  
      console.log(`${result.deletedCount} document(s) deleted`);
    } finally {
      // await client.close();
      // console.log('Connection to the database closed');
    }
  }

  async function isOnWatchlist(symbolToCheck) {
  
    try {  
      const db = client.db("StockADE");
      const watchlistCollection = db.collection("Watchlist"); 
      const query = { Symbol: symbolToCheck}; 
  
      // Check if the symbol exists in the watchlist
      var result = await watchlistCollection.countDocuments(query);
      
      console.log('Checking for symbol: ', symbolToCheck)
      console.log('IsOnWatchlist Result: ', result)

      return result;
    } finally {
      // await client.close();
    }
  }

  module.exports = {
    addToWatchlist,
    getUniqueStocksymbols,
    removeFromWatchlist,
    isOnWatchlist
  };
