const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;
const Example = require('./models/exampleModel');

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
mongoose.connect('mongodb+srv://Les_Jailes:Les_Jailes123@boutiqueclothing.wsg961s.mongodb.net/API-REST?retryWrites=true&w=majority').
then(() => {
    app.listen(port, () => {
        console.log('API REST | Server started | Port 3000');
      });      
    console.log('API REST | Database connected on MongoDB Atlas');
}).catch(err => {
    console.log('API REST | Database connection error');
    console.log(err);
});