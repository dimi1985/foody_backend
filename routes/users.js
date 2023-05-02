const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://dimi85:eshopdimi1234@cluster0.oq1a5ls.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

router.get('/', async (req, res) => {
    try {
        await client.connect();
        const db = client.db();
        const users = await db.collection('users').find().toArray();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    } finally {
        await client.close();
    }
});

router.post('/register', async (req, res) => {
    try {
        await client.connect();
        const db = client.db();
        const { username, email, password } = req.body;
        const existingUser = await db.collection('users').findOne({ email });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }
        const newUser = {
            username,
            email,
            password,
        };
        const result = await db.collection('users').insertOne(newUser);
        res.json(result.ops[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    } finally {
        await client.close();
    }
});

module.exports = router;
