const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const meals = mongoose.model('meal',new Schema({
    name: String,
    desc: String
}));

module.exports = meals;