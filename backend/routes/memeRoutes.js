const express = require('express');
const router = express.Router();
const memeController = require('../controllers/memeController');

router.get('/memes', memeController.getAllMemes);
router.post('/memes', memeController.createMeme);
router.get('/memes/:id', memeController.getMemeById);
router.delete('/memes/:id', memeController.deleteMeme);

module.exports = router;
