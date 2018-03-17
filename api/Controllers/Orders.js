const mongoose = require('mongoose');
const Order = require('../../models/order');
const Product = require('../../models/product');

/**
 * Get all Order
 * @param req
 * @param res
 * @param next
 */
exports.orders_get_all = (req, res, next) => {
    Order.find().select('product _id quantity').populate('product').exec().then((docs) => {
        const response = {
            count: docs.length,
            products: docs.map((doc) => {
                return {
                    quantity: doc.quantity,
                    product: doc.product,
                    _id: doc._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/orders' + doc._id
                    }
                }
            })
        };
        res.status(200).json(response);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
};

/**
 * Create Order
 * @param req
 * @param res
 * @param next
 */
exports.order_create = (req, res, next) => {
    Product.findById(req.body.product).then((product) => {
        if (!product) return res.status(404).json({error: 'Product Not Found'});
        const order = new Order({
            _id: mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            product: req.body.productId
        });
        return order.save();
    }).then((result) => {
        const response = {
            message: 'Order was created successfully',
            createdProduct: {
                quantity: result.quantity,
                product: result.product,
                _id: result._id,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/orders/' + result._id
                }
            }
        };
        res.status(200).json(response);
    }).catch((err) => {
        res.status(500).json({
            error: err
        });
    });
};

/**
 * Get Single Order By Id
 * @param req
 * @param res
 * @param next
 */
exports.order_single = (req, res, next) => {
    const id = req.params.orderId;
    Order.findById(id).select('_id quantity product').populate('product').exec().then((doc) => {
        //if no product found null is returned.
        if (doc) {
            res.status(200).json({
                order: doc,
                request: {
                    type: 'GET',
                    description: 'Get all orders',
                    url: 'http://localhost:3000/orders'
                }
            });
        } else {
            res.status(404).json({
                message: 'Product Not found'
            })
        }
    }).catch((error) => {
        console.log(error);
        res.status(500).json({error: error});
    });
};

/**
 * Update the order
 * @param req
 * @param res
 * @param next
 */
exports.order_update = (req, res, next) => {
    const id = req.params.orderId;
    res.status(200).json({
        order_id: id,
        message: 'Order Updated'
    })
};


/**
 * Delete Order
 * @param req
 * @param res
 * @param next
 */
exports.order_delete = (req, res, next) => {
    const id = req.params.orderId;

    Order.remove({_id: id}).exec().then((response) => {
        res.status(200).json({
            message: 'Order deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:3000/orders',
                data: {quantity: 'Number', product: 'Product Id'}
            }
        });
    }).catch((err) => {
        res.status(500).json({error: err});
    });
}