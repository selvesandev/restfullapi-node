const mongoose = require('mongoose');

//Create a schema
const productSchema = mongoose.Schema({
    //js object to determine how my schema should look like
    _id: mongoose.Schema.Types.ObjectId,//id database later passed from products routes
    name: String,
    price: Number
});

/**
 * When you define this schema
 * Use have by default created a rule that your table will contain id,name and price
 * Therefore you cannot send a third property(column) to this table
 * eg: only id,name,price is only valid if you also send for eg a view column it will be ignored.
 * @type {Model}
 */


module.exports = mongoose.model('Product', productSchema);