const express = require('express');
const router = express();
const mongoose = require('mongoose');
const Product = require('../../models/product');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /products'
    });
});

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    //you can use a call back or a promise
    // product.save((err,result)=>{
    //
    // });

    product
        .save()
        .then((result) => {
        console.log(result);
    }).catch(err => console.log(err));

    res.status(200).json({
        message: 'Handling POST requests to /products',
        product: product
    });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    res.status(200).json({
        product_id: id,
    })
});


router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    res.status(200).json({
        product_id: id,
        message: 'Product Updated'
    })
});

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    res.status(200).json({
        product_id: id,
        message: 'Delete Updated'
    })
});

module.exports = router;