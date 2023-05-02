const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

// Set up a MongoDB client and connect to the database
const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('Connected to MongoDB');

  // Set up your API endpoints here using app.get(), app.post(), etc.

  // Start the server
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});


app.get('/api/users', async (req, res) => {
  const db = client.db();
  const users = await db.collection('users').find().toArray();
  res.json(users);
});
