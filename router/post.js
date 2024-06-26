const express = require('express')
const router = express.Router()
const postController = require('../controller/post')

router
    .post('/postpics',postController.postApic)
    .post('/:id/likes',postController.LikePics)
    .get('/allposts',postController.getAllPost)
    .get('/:email/posts',postController.getAUserPost)
    .post('/:id/comment',postController.addCommentToPost)
    .delete('/:id/deletepost',postController.deletePic)
    .delete('/:postId/:commentId/deletecomment',postController.deleteComment)

exports.router = router