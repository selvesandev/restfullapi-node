const mongoose = require('mongoose');

//Create a schema
const productSchema = mongoose.Schema({
    //js object to determine how my schema should look like
    _id: mongoose.Schema.Types.ObjectId,//id database later passed from products routes
    name: String,
    price: Number
});

module.exports = mongoose.model('Product', productSchema);