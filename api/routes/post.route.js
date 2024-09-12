const express = require('express');
const { verifyToken } = require('../utils/verifyUser.js');
const postController = require('../controller/post.controller.js');

const router = express.Router();

router.post('/create', verifyToken, postController.create)
router.get('/getposts', postController.getposts)
router.get('/gettintucsukien', postController.getpostsTinTucSuKien)
router.delete('/deletepost/:postId/:userId', verifyToken, postController.deletepost)
router.put('/updatepost/:postId/:userId', verifyToken, postController.updatepost)


module.exports = router;