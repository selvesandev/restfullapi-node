const express = require('express');
const morgan = require('morgan');
const app = express();


//Routes
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

app.use('/orders', orderRoutes);
app.use('/products', productRoutes);


app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 400;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

app.use(morgan('dev'));


module.exports = app;