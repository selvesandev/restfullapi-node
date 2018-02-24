const express = require('express');
const router = express();
const mongoose = require('mongoose');
const multer = require('multer');

const storage = multer.diskStorage({
    //this configuration basically allows us to handle how the file have to be saved.
    //multer will execute the function when a new file is uploaded.
    destination: function (req, file, cb) {
        //request,file and a callback
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + '_' + file.originalname);
    }

});


const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);//will store the file
    } else {
        cb(new Error('File size not match'), false);//will reject the file
    }
};


const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1025 * 5,//file size limit in bytes here 5mb
    },
    fileFilter: fileFilter
});


const Product = require('../../models/product');


router.get('/', (req, res, next) => {
    Product.find().select('name _id price product_image').exec().then((docs) => {
        const response = {
            count: docs.length,
            products: docs.map((doc) => {
                return {
                    name: doc.name,
                    price: doc.price,
                    product_image: doc.product_image,
                    _id: doc._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/' + doc._id
                    }
                }
            })
        };
        res.status(200).json(response);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

/**
 * Save product to the mongoose database.
 * the product constant is the model instance having api to work with the database.
 */
router.post('/', upload.single('productImage'), (req, res, next) => {
    console.log(req.file);//this is the new object that will be available to use due to the upload.single middleware/handler being executed.
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        product_image: req.file.path
    });

    product
        .save()
        .then((result) => {
            const response = {
                message: 'Product was created successfully',
                createdProduct: {
                    name: result.name,
                    price: result.price,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/' + result._id
                    }
                }
            };
            res.status(200).json(response);
        }).catch(err => console.log(err));
});


/**
 * Get the product by unique mongoose object id passed through the uri
 */
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id).select('_id name price product_image').exec().then((doc) => {
        //if no product found null is returned.
        if (doc) {
            res.status(200).json({
                product: doc,
                request: {
                    type: 'GET',
                    description: 'Get all products',
                    url: 'http://localhost:3000/products'
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
});


/**
 * Update Request
 */
router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;

    const updateData = {};
    for (const opts in req.body) {
        updateData[opts] = req.body[opts];
    }

    Product.update({_id: id}, {
        $set: updateData//you will have to write $set which will be understood by mongoose.
    }).exec().then((response) => {
        res.status(200).json({
            message: 'Product updated',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/' + id
            }
        });
    }).catch((error) => {
        res.status(500).json({error: error});
    });

});

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;

    Product.remove({_id: id}).exec().then((response) => {
        res.status(200).json({
            message: 'Product deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:3000/products',
                data: {name: 'String', price: 'Number'}
            }
        });
    }).catch((err) => {
        res.status(500).json({error: err});
    });
});

module.exports = router;