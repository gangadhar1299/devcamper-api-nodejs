const express = require('express');
const { register, login, logout, getCurrentUser, forgotPassword, resetPassword, updateDetails, updatePassword } = require('../controllers/auth');

const router = express.Router();

const { protect } = require('../middlewares/auth');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(protect, logout);
router.route('/profile').get(protect, getCurrentUser);
router.route('/updatedetails').put(protect, updateDetails);
router.route('/updatepassword').put(protect, updatePassword);
router.route('/forgotpassword').post(forgotPassword);
router.route('/resetpassword/:resetToken').put(resetPassword);

module.exports = router;