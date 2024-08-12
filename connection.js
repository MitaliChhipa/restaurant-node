const mongoose = require('mongoose');

function setConnection(url){
    mongoose.connect(url);
}

module.exports = setConnection;