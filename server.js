const express = require('express');
const { MongoClient } = require('mongodb');
const MONGODB_URI = 'mongodb+srv://dimi85:eshopdimi1234@cluster0.oq1a5ls.mongodb.net/?retryWrites=true&w=majority';


const app = express();
const port = process.env.PORT || 3000;

// Set up a MongoDB client and connect to the database
const client = new MongoClient(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  app.get('/', (req, res) => {
    res.send('Connected to MongoDB');
  });



  // Set up your API endpoints here using app.get(), app.post(), etc.

  // Start the server
  app.listen(port, () => {
    app.get('/', (req, res) => {
      res.send('Server listening on port ${port}');
    });

  });
});


app.get('/api/users', async (req, res) => {
  const db = client.db();
  const users = await db.collection('users').find().toArray();
  res.json(users);
});
