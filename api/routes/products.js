const express = require('express');
const router = express();
const mongoose = require('mongoose');
const Product = require('../../models/product');

router.get('/', (req, res, next) => {

    Product.find().exec().then((docs) => {
        res.status(200).json(docs);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

/**
 * Save product to the mongoose database.
 * the product constant is the model instance having api to work with the database.
 */
router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
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


/**
 * Get the product by unique mongoose object id passed through the uri
 */
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id).exec().then((doc) => {
        //if no product found null is returned.
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({
                message: 'Product Not found'
            })
        }
    }).catch((error) => {
        console.log(error);
        res.status(500).json({error: error});
    });
});


router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;

    const updateData = {};
    for (const opts in req.body) {
        updateData[opts] = req.body[opts];
    }

    Product.update({_id: id}, {
        $set: updateData//you will have to write $set which will be understood by mongoose.
    }).exec().then((response) => {
        res.status(200).json(response);
    }).catch((error) => {
        res.status(500).json({error: error});
    });

});

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;

    Product.remove({_id: id}).exec().then((response) => {
        res.status(200).json(response);
    }).catch((err) => {
        res.status(500).json({error: err});
    });
});

module.exports = router;