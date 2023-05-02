const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;
const usersRouter = require('./routes/users');

const uri = "mongodb+srv://dimi85:eshopdimi1234@cluster0.oq1a5ls.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.use('/api/users', usersRouter);

// Connect the client to the server (async function)
async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  }
}

// Call the connectToDatabase function
connectToDatabase();

// Define your API endpoints here
app.get('/', (req, res) => {
  res.send('Connected to MongoDB');
});



// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
