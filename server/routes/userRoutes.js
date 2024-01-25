const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/profile', auth.verifyToken, userController.getProfile);
router.post('/register', userController.register);
router.post('/login', userController.login);


module.exports = router;