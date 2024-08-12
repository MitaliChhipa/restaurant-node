const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    orderedItem:{
        type:String
    },
    date:{
        type:String
    },
    orderedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
})

const order = mongoose.model('order',orderSchema);

module.exports= order;