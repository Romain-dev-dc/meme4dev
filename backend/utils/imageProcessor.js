const jimp = require('jimp');
const path = require('path');

const processImage = async (imagePath, textTop, textMiddle, textBottom, topColor, middleColor, bottomColor) => {
  try {
    console.log('Processing image at path:', imagePath); // Log the image path being processed
    const image = await jimp.read(imagePath);
    const font = await jimp.loadFont(jimp.FONT_SANS_32_BLACK);

    if (textTop) {
      image.print(font, 10, 10, {
        text: textTop,
        alignmentX: jimp.HORIZONTAL_ALIGN_CENTER
      }, 1000, 40);
    }
    if (textMiddle) {
      image.print(font, 10, image.getHeight() / 2, {
        text: textMiddle,
        alignmentX: jimp.HORIZONTAL_ALIGN_CENTER
      }, 1000, 40);
    }
    if (textBottom) {
      image.print(font, 10, image.getHeight() - 50, {
        text: textBottom,
        alignmentX: jimp.HORIZONTAL_ALIGN_CENTER
      }, 1000, 40);
    }

    const outputPath = path.join(__dirname, '../uploads', `meme-${Date.now()}.jpg`);
    console.log('Output image path:', outputPath); // Log the output path of the processed image
    await image.writeAsync(outputPath);
    return outputPath;
  } catch (error) {
    console.error('Error processing image:', error);
    throw error;
  }
};

module.exports = { processImage };
