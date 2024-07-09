const fs = require('fs');
const path = require('path');
const { processImage } = require('../utils/imageProcessor');

const uploadsDir = path.join(__dirname, '../uploads');
const memesFile = path.join(__dirname, '../memes.json');

// Load memes from the JSON file
const loadMemes = () => {
  if (fs.existsSync(memesFile)) {
    return JSON.parse(fs.readFileSync(memesFile));
  }
  return [];
};

// Save memes to the JSON file
const saveMemes = (memes) => {
  fs.writeFileSync(memesFile, JSON.stringify(memes, null, 2));
};

exports.getAllMemes = (req, res) => {
  try {
    const memes = loadMemes();
    res.json(memes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching memes', error: err.message });
  }
};

exports.createMeme = (req, res) => {
  const { title, topText, middleText, bottomText, topColor, middleColor, bottomColor } = req.body;
  const imagePath = req.file ? req.file.path : req.body.imagePath;

  if (!imagePath) {
    return res.status(400).json({ message: 'Image path is required' });
  }

  processImage(imagePath, topText, middleText, bottomText, topColor, middleColor, bottomColor)
    .then((newImagePath) => {
      const memes = loadMemes();
      const newMeme = {
        id: Date.now().toString(),
        title,
        path: newImagePath,
        topText,
        middleText,
        bottomText,
        topColor,
        middleColor,
        bottomColor
      };
      memes.push(newMeme);
      saveMemes(memes);

      if (req.file) fs.unlinkSync(req.file.path); // Supprimez le fichier temporaire téléchargé

      res.json(newMeme);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error processing image', error: err.message });
    });
};

exports.getMemeById = (req, res) => {
  try {
    const meme = loadMemes().find((m) => m.id === req.params.id);
    if (meme) {
      res.json(meme);
    } else {
      res.status(404).json({ message: 'Meme not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error fetching meme', error: err.message });
  }
};

exports.deleteMeme = (req, res) => {
  try {
    const memes = loadMemes();
    const memeIndex = memes.findIndex((m) => m.id === req.params.id);
    if (memeIndex !== -1) {
      const meme = memes[memeIndex];
      fs.unlinkSync(path.join(uploadsDir, meme.path));
      memes.splice(memeIndex, 1);
      saveMemes(memes);
      res.json({ success: true });
    } else {
      res.status(404).json({ message: 'Meme not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error deleting meme', error: err.message });
  }
};
