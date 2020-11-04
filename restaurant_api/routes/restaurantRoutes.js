const express = require('express');
const router = express.Router();
const auth = require ('../middleware/auth');
const multerConfig = require('../middleware/multerConfig');
const restaurantCtrl=require('../controllers/restaurantController');


router.get('/all',auth, restaurantCtrl.getAllRestaurants);
router.post('/add', multerConfig, restaurantCtrl.addRestaurant);
router.get('/:id', auth, restaurantCtrl.getOneRestaurant);
router.put('/:id', multerConfig, restaurantCtrl.modifyRestaurant);
router.delete('/:id', restaurantCtrl.deleteRestaurant);



module.exports = router;