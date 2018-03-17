const mongoose = require('mongoose');

//Create a schema
const userSchema = mongoose.Schema({
    //js object to determine how my schema should look like
    _id: mongoose.Schema.Types.ObjectId,//id database later passed from products routes
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('User', userSchema);