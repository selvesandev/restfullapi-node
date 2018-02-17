const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://selvesan:selvesan002@node-rest-api-shard-00-00-jcnga.mongodb.net:27017,node-rest-api-shard-00-01-jcnga.mongodb.net:27017,node-rest-api-shard-00-02-jcnga.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-api-shard-0&authSource=admin', {
    // useMongoClient: true
});


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');//give access to all
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');//what type of header do we accept

    //Browser will always send a option request first
    //when you send a post request or a put request you cannot avoid this
    //so for this we can tell the browser
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        //telling the browser what request it might send
        return res.status(200).json({});
    }
    next();//if we are not having a OPTIONS request we should forward the request to next.
});

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


module.exports = app;