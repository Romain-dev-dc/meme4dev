const fs = require('fs');
const path = require('path');
const jimp = require('jimp');
const Meme = require('../models/meme');

const uploadsDir = path.join(__dirname, '../uploads');

exports.getAllMemes = async (req, res) => {
    try {
        const memes = await Meme.find();
        res.json(memes);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching memes' });
    }
};

exports.getMeme = async (req, res) => {
    try {
        const meme = await Meme.findById(req.params.id);
        if (meme) {
            res.sendFile(path.join(uploadsDir, meme.path));
        } else {
            res.status(404).json({ message: 'Meme not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error fetching meme' });
    }
};

exports.getImages = async (req, res) => {
    try {
        const memes = await Meme.find({}, 'title path');
        res.json(memes);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching images' });
    }
};

exports.createMeme = async (req, res) => {
    const { title, topText, middleText, bottomText, topColor, middleColor, bottomColor, imagePath } = req.body;
    console.log('Received data:', req.body);

    try {
        let image;
        if (req.file) {
            console.log('Uploading new image');
            image = await jimp.read(req.file.path);
        } else {
            console.log('Using existing image:', imagePath);
            image = await jimp.read(path.join(uploadsDir, imagePath));
        }

        const font = await jimp.loadFont(jimp.FONT_SANS_32_BLACK);

        if (topText) {
            console.log('Adding top text');
            image.print(font, 10, 10, {
                text: topText,
                alignmentX: jimp.HORIZONTAL_ALIGN_CENTER
            }, 1000, 40);
        }
        if (middleText) {
            console.log('Adding middle text');
            image.print(font, 10, image.getHeight() / 2, {
                text: middleText,
                alignmentX: jimp.HORIZONTAL_ALIGN_CENTER
            }, 1000, 40);
        }
        if (bottomText) {
            console.log('Adding bottom text');
            image.print(font, 10, image.getHeight() - 50, {
                text: bottomText,
                alignmentX: jimp.HORIZONTAL_ALIGN_CENTER
            }, 1000, 40);
        }

        const outputPath = path.join(uploadsDir, 'meme-' + (req.file ? req.file.filename : path.basename(imagePath)));
        await image.writeAsync(outputPath);

        const meme = new Meme({
            title: title,
            path: 'meme-' + (req.file ? req.file.filename : path.basename(imagePath)),
            topText: topText,
            middleText: middleText,
            bottomText: bottomText,
            topColor: topColor,
            middleColor: middleColor,
            bottomColor: bottomColor
        });
        await meme.save();

        if (req.file) fs.unlinkSync(req.file.path);

        res.status(201).json(meme);
    } catch (err) {
        console.error('Error processing image:', err);
        res.status(500).json({ message: 'Error processing image', error: err.message });
    }
};

exports.deleteMeme = async (req, res) => {
    try {
        const meme = await Meme.findById(req.params.id);
        if (meme) {
            fs.unlinkSync(path.join(uploadsDir, meme.path));
            await meme.remove();
            res.json({ message: 'Meme deleted' });
        } else {
            res.status(404).json({ message: 'Meme not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error deleting meme' });
    }
};
