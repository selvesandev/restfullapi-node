const express = require('express');
const router = express();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /orders'
    });
});

router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.product_id,
        quantity: req.body.quantity
    };
    res.status(201).json({
        message: 'Handling POST requests to /orders',
        order: order
    });
});

router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    res.status(200).json({
        order_id: id,
    })
});


router.patch('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    res.status(200).json({
        order_id: id,
        message: 'Order Updated'
    })
});

router.delete('/:orderId', (req, res, next) => {
    const id = req.params.productId;
    res.status(200).json({
        order_id: id,
        message: 'Delete Order'
    })
});

module.exports = router;