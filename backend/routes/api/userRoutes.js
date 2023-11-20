// api2.js
const express = require('express');
const router = express.Router();


//routes: \
//get/Users (username, name, location only if no query provided use for getting user lists), single user search for login
//post/Users (make one user given all info is present and username does not exist)


//**** add in try blocks */

// Define routes for API 2
router.get('/Users', async (req, res) => {
  //return all users to a limit

  const projection = { _id: 0, password: 0 };

  const query = req.query;
  const db = req.app.locals.db;
  const collection = db.collection('Users');
 
  let users;
  // If name query parameter exists, filter users by name
  try{
    if (Object.keys(query).length != 0) {
        process.stdout.write('1')
        process.stdout.write(JSON.stringify(query))
        users = await collection.find(query).limit(5).toArray();
        process.stdout.write(JSON.stringify(users));
    } else {
        // If name query parameter is not provided, retrieve all users
        users = await collection.find().project(projection).toArray();
        process.stdout.write(JSON.stringify(users));
    }
    if(users.length == 0){
        res.send('...');
    }
    else{
        res.send(JSON.stringify(users))
    }
    }catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.post('/Users', async (req, res) => {
    const db = req.app.locals.db;
    const collection = db.collection('Users');
    const docCount = await collection.countDocuments({});
    res.send(`Number of users: ${docCount}`);
  });


module.exports = router;