const mongoose = require('mongoose');

const ingredientSchema = mongoose.Schema({
    name:{type: String, required: true},
    weight:{type:String, required: true},
    type:{type:String, required: true},
    colories:{type: String, required:true}
});

module.exports = mongoose.model('Ingredient', ingredientSchema);