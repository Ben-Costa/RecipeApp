const { MongoClient, ServerApiVersion } = require('mongodb');
const credentials = '../X509-cert-4296977779543572507.pem'
const client = new MongoClient('mongodb+srv://cluster0.mjscpn4.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority', {
  tlsCertificateKeyFile: credentials,
  serverApi: ServerApiVersion.v1
});

async function connectToDB() {
    try {
      await client.connect();
      console.log('Connected to the database');
      return client.db('RecipeApp');
    } catch (error) {
      console.error('Error connecting to the database:', error);
      throw error;
    }
  }
  
  async function closeDB() {
    try {
      await client.close();
      console.log('Database connection closed');
    } catch (error) {
      console.error('Error closing database connection:', error);
    }
  }
  
  module.exports = { connectToDB, closeDB };


// async function run() {
//   try {
//     await client.connect();
//     const database = client.db("RecipeApp");
//     const collection = database.collection("Users");
//     const docCount = await collection.countDocuments({});
//     console.log(docCount);
//     // perform actions using client
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);