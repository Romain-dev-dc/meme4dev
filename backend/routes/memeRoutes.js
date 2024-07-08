const express = require('express');
const multer = require('multer');
const { getAllMemes, getMeme, createMeme, deleteMeme, getImages } = require('../controllers/memeController');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.get('/memes', getAllMemes);
router.get('/memes/:id', getMeme);
router.get('/images', getImages);
router.post('/memes', upload.single('image'), createMeme);
router.delete('/memes/:id', deleteMeme);

module.exports = router;
