const express = require('express')
const app = express()
const port = 3000

// Import routes
const api1Routes = require('./routes/api/ingredientRoutes');
const api2Routes = require('./routes/api/userRoutes');

// Use imported routes in the application
app.use('/ingredientRoutes', api1Routes);
app.use('/userRoutes', api2Routes);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/RecipeBook', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})