const express = require('express');
const router = express();
const checkAuth = require('../middleware/check-auth');
const OrderController = require('../Controllers/Orders');


router.get('/', OrderController.orders_get_all);

router.post('/', checkAuth, OrderController.order_create);

router.get('/:orderId', OrderController.order_single);


router.patch('/:orderId', OrderController.order_update);

router.delete('/:orderId', OrderController.order_delete);

module.exports = router;