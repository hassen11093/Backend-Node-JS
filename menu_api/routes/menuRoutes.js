const express = require('express');
const router = express.Router();
const auth = require ('../middleware/auth');
const multerConfig = require('../middleware/multerConfig');
const menuCtrl=require('../controllers/menuController');


router.get('/all',auth, menuCtrl.getAllMenus);
router.post('/add', multerConfig, menuCtrl.addMenu);
router.get('/:id', auth, menuCtrl.getOneMenu);
router.put('/:id', multerConfig, menuCtrl.modifyMenu);
router.delete('/:id', menuCtrl.deleteMenu);



module.exports = router;