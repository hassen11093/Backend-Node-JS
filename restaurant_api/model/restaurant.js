const mongoose = require('mongoose');

const restaurantSchema = mongoose.Schema({
  userId: {type :String ,required:true},
  name: { type: String ,required:true},
  location: {
    address:  String,
    latitude: String,
    longitude: String 
  },
  contact_email: { type: String ,required:true},
  restaurant_image: { type: String ,required:true},
  type: { type: String ,required:true},
  status: { type: String ,required:true}  
});

module.exports = mongoose.model('Restaurant', restaurantSchema);