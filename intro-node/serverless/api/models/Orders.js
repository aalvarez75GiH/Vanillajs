const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const orders = mongoose.model('order',new Schema({
    // meal_id: String
    meal_id: { type: Schema.Types.ObjectId, ref: 'meal' },
    user_id: String,
}));

module.exports = orders;

    