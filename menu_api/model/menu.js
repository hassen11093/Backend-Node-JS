const mongoose = require('mongoose');

const menuSchema = mongoose.Schema({
    restauranId: {type :String },
    name: { type: String },
    categories:{type: String},
    //items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingedient' }],
    image:{type:String}
});

module.exports = mongoose.model('Menu', menuSchema);