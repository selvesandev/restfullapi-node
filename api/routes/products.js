const express = require('express');
const router = express();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /products'
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling POST requests to /products'
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