require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Example = require('./models/exampleModel');

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API REST');
});

app.get('/example', (req, res) => {
    res.send('API REST | EXAMPLE');
});

app.post('/example', async(req, res) => {
    try {
        const example = await Example.create(req.body);
        res.status(200).json(example);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});

mongoose.set('strictQuery', false);
mongoose.connect(MONGODB_URL).
then(() => {
    app.listen(PORT, () => {
        console.log(`API REST | Server started | Port ${PORT}`);
      });      
    console.log('API REST | Database connected on MongoDB Atlas');
}).catch(err => {
    console.log('API REST | Database connection error');
    console.log(err);
});