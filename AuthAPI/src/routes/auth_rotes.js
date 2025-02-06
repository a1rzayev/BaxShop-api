const express = require('express');
const auth_controller = require('../controllers/authController');
const auth_middleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', auth_controller.signup);
router.post('/login', auth_controller.login);
router.get('/profile', auth_middleware.authenticate, auth_controller.profile);
router.post('/logout', auth_middleware.authenticate, auth_controller.logout);

module.exports = router;
