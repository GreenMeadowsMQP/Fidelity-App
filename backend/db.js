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

  module.exports = {
    addToWatchlist,
  };
