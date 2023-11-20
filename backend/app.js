const express = require('express')
const { connectToDB, closeDB } = require('./config/db.js');

const app = express()
const port = 3000

// Import routes
const api1Routes = require('./routes/api/ingredientRoutes');
const api2Routes = require('./routes/api/userRoutes');
const api3Routes = require('./routes/api/recipeRoutes');

// Use imported routes in the application
app.use('/ingredientRoutes', api1Routes);
app.use('/userRoutes', api2Routes);
app.use('/recipeRoutes', api3Routes);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/users', async (req, res) => {
  const db = req.app.locals.db;
  const collection = db.collection('Users');
  const docCount = await collection.countDocuments({});
  res.send(`Number of users: ${docCount}`);
});

async function startServer() {
  try {
    const db = await connectToDB(); // Establish database connection
    app.locals.db = db; // Store the database connection

    const server = app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

    // Graceful shutdown: Close database connection when server exits
    process.on('SIGINT', async () => {
      await closeDB();
      server.close(() => {
        console.log('Server shut down');
        process.exit(0);
      });
    });
  } catch (error) {
    console.error('Error starting 65yg nthe server:', error);
  }
}

startServer();