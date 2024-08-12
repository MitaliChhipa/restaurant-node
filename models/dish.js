const mongoose= require('mongoose');

const dishSchema = new mongoose.Schema({
    dishName: {
        type: String,
        required: true,
        unique: true,
    },
    quantity:{
        type: Number,
        required: true
    }
})

const dish = mongoose.model('dish',dishSchema);
module.exports = dish