const express = require('express');
const router = express.Router();
const auth = require ('../middleware/auth')
const userCtrl = require('../controllers/userController');

router.get('/', userCtrl.getAllUsers);
router.get('/:id', userCtrl.getOneUser);
router.delete('/:id', userCtrl.deleteUser)
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;