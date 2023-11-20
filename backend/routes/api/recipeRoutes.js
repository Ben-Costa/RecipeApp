// api2.js
const express = require('express');
const router = express.Router();

//TODO: look into  search index
//TOD: set query so does wildcard on

//routes: \
//get/Recipes -> no query, get to a limit, query, do a search for all that match name

// Define routes for API 2
router.get('/Recipes', async (req, res) => {
  const query = req.query;
  const db = req.app.locals.db;
  const collection = db.collection('Recipes');
  //const sort = { score: { $meta: "textScore" } };

  //query logic
    //see if name query key exists
    //see if ingredients query exists
    //const query = { name: { $regex: queryText, $options: 'i' }, ingredients.name: { $regex: queryText, $options: 'i' } };


  let recipes;
  // If name query parameter exists, filter users by name
  if (Object.keys(query).length != 0) {
    users = await collection.find(query).limit(25).toArray();
    process.stdout.write(JSON.stringify(users));
  } else {
    // If name query parameter is not provided, retrieve all users
    users = await collection.find().toArray();
    process.stdout.write(JSON.stringify(users));
  }
  if(users.length == 0){
    res.send('...');
  }
  else{
    res.send(JSON.stringify(users));
  }
});


router.post('/Recipes', async (req, res) => {
    const db = req.app.locals.db;
    const collection = db.collection('Users');
    const docCount = await collection.countDocuments({});
    res.send(`Number of users: ${docCount}`);
  });


module.exports = router;