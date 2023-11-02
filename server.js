require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const productRouter = require('./routes/ProductsRoutes.js')
const userRouter = require('./routes/UsersRoutes.js')

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

//Middleware
app.use(express.json());

//Routing
app.use('/Product', productRouter)
app.use('/User', userRouter)
app.get('/', (req, res) => {
    res.send('API REST');
});

//MONGODB CONNECTION
mongoose.set('strictQuery', false);
mongoose.connect(MONGODB_URL).
then(() => {
    //SERVER START
    app.listen(PORT, () => {
        console.log(`API REST | Server started | Port ${PORT}`);
      });      
    console.log('API REST | Database connected on MongoDB Atlas');
}).catch(err => {
    console.log('API REST | Database connection error');
    console.log(err);
});