require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const productRouter = require('./src/routes/ProductsRoutes.js')
const userRouter = require('./src/routes/UsersRoutes.js')
let cors = require('cors')
const errorMiddleware = require('./src/middleware/errorMiddleware.js')

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;
const FRONTEND1 = process.env.FRONTEND1;
const FRONTEND2 = process.env.FRONTEND2;
const TEST_ENVIRONMENT = process.env.TEST_ENVIRONMENT

let corsOptions = {
    origin: [FRONTEND1, FRONTEND2, TEST_ENVIRONMENT],
    optionsSuccessStatus: 200
}
//Cors
app.use(cors());

//Middleware
app.use(express.json());

//Routing
app.use('/Product', productRouter)
app.use('/User', userRouter)
app.get('/', (req, res) => {
    res.send('API REST');
});

app.use(errorMiddleware);

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