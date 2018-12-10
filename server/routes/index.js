const express = require('express');
const path = require('path');
const router = express.Router();
const multer = require('multer');
const { upload } = require('../../config');
const fileUpload = multer({ dest: path.resolve(process.cwd(), upload) });

const auth = require('../controllers/auth');
const user = require('../controllers/user');
const news = require('../controllers/news');
const requireAuth = require('../middleware/requireAuth');

router.post('/saveNewUser', auth.signUp)
router.post('/login',auth.signIn);
router.post('/authFromToken',auth.me);
router.put('/updateUser/:id', user.updateUserInfo);
router.post('/saveUserImage/:id',fileUpload.any(),user.updateUserAvatar);
router.get('/getUsers', user.getUsers)
router.delete('/deleteUser/:id', user.deleteUser)
router.put('/updateUserPermission/:id', user.updateUserPermission)

router.post('/newNews',news.create);
router.get('/getNews', news.getNews);
router.put('/updateNews/:id',news.update);
router.delete('/deleteNews/:id', news.delete)
module.exports = router;