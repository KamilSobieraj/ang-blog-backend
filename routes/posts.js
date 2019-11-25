const express = require('express');

const router = express.Router();
const Post = require('../models/Post');

// GET all the posts
router.get('/', async (req, res) => {
    try {
        // .find() is mongoose method that retur everything
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.json(err);
    }
});

// GET specific post
router.get('/:postID', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postID);
        res.json(post);
    } catch (err) {
        res.json(err);
    }
});

// DELETE specific post
router.delete('/:postID', async (req, res) => {
    try {
        // Mongo generates id named as _id
        const post = await Post.remove({_id: req.params.postID});
        res.json(post);
    } catch (err) {
        res.json(err);
    }
});

// UPDATE specific post
router.patch('/:postID', async (req, res) => {
    try {
        const post = await Post.updateOne({_id: req.params.postID}, {$set: {title: req.body.title}});
        res.json(post);
    } catch(err) {
        res.json(err);
    }
});

router.get('/special', (req, res) => {
    res.send('post specjalny');
});

// POST new post to DB
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });


    try {
        const savedPost = await post.save();
        res.json(savedPost)
    } catch (err) {
        res.json(err);
    }
});

module.exports = router;
