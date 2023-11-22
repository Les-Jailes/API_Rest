require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const productRouter = require('./src/routes/ProductsRoutes.js')
const userRouter = require('./src/routes/UsersRoutes.js')
const checkoutPaymentRouter = require('./src/routes/CheckoutPaymentRoutes.js'); 
const cors = require('cors')
const errorMiddleware = require('./src/middleware/errorMiddleware.js')
const stripe = require('stripe');
const countryRouter = require('./src/routes/CountryRoutes.js');

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;
const FRONTEND1 = process.env.FRONTEND1;
const FRONTEND2 = process.env.FRONTEND2;
const DEV_ENVIRONMENT = process.env.DEV_ENVIRONMENT

let corsOptions = {
    origin: [FRONTEND1, FRONTEND2, DEV_ENVIRONMENT],
    optionsSuccessStatus: 200
}
//Cors
app.use(cors());

//Middleware
app.use(express.json());

//Routing
app.use('/Product', productRouter)
app.use('/User', userRouter)
app.use('/CheckoutPayment', checkoutPaymentRouter);
app.use('/Country', countryRouter)
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