<template>
  <div class="meme-form">
    <h2>Create Meme</h2>
    <div>
      <label>
        <input type="radio" v-model="imageSource" value="upload" /> Upload Image
      </label>
      <label>
        <input type="radio" v-model="imageSource" value="existing" /> Select Existing Image
      </label>
    </div>
    <div v-if="imageSource === 'upload'">
      <input type="file" @change="onFileChange" />
    </div>
    <div v-else>
      <select v-model="selectedImage">
        <option v-for="image in images" :key="image.path" :value="image.path">
          {{ image.title }}
        </option>
      </select>
    </div>
    <div v-if="imageUrl">
      <canvas ref="canvas" :width="canvasWidth" :height="canvasHeight"></canvas>
      <input v-model="title" type="text" placeholder="Title" />
      <input v-model="topText" type="text" placeholder="Top text" @input="drawMeme" />
      <input v-model="middleText" type="text" placeholder="Middle text" @input="drawMeme" />
      <input v-model="bottomText" type="text" placeholder="Bottom text" @input="drawMeme" />
      <input type="color" v-model="topColor" @input="drawMeme" />
      <input type="color" v-model="middleColor" @input="drawMeme" />
      <input type="color" v-model="bottomColor" @input="drawMeme" />
    </div>
    <button @click="createMeme">Create</button>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      imageSource: 'upload',
      selectedImage: '',
      image: null,
      imageUrl: '',
      title: '',
      topText: '',
      middleText: '',
      bottomText: '',
      topColor: '#000000',
      middleColor: '#000000',
      bottomColor: '#000000',
      canvasWidth: 500,
      canvasHeight: 500
    };
  },
  watch: {
    selectedImage() {
      this.loadImage(`/uploads/${this.selectedImage}`);
    },
    image() {
      if (this.image) {
        this.imageUrl = URL.createObjectURL(this.image);
        this.loadImage(this.imageUrl);
      }
    }
  },
  methods: {
    onFileChange(e) {
      this.image = e.target.files[0];
    },
    loadImage(url) {
      const img = new Image();
      img.onload = () => {
        this.canvasWidth = img.width;
        this.canvasHeight = img.height;
        this.drawMeme();
      };
      img.src = url;
      this.imageUrl = url;
    },
    drawMeme() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = this.imageUrl;

      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        ctx.font = '30px Arial';
        ctx.fillStyle = this.topColor;
        ctx.textAlign = 'center';
        ctx.fillText(this.topText, canvas.width / 2, 50);

        ctx.fillStyle = this.middleColor;
        ctx.fillText(this.middleText, canvas.width / 2, canvas.height / 2);

        ctx.fillStyle = this.bottomColor;
        ctx.fillText(this.bottomText, canvas.width / 2, canvas.height - 50);
      };
    },
    createMeme() {
      const canvas = this.$refs.canvas;
      canvas.toBlob((blob) => {
        const memeData = new FormData();
        memeData.append('title', this.title);
        memeData.append('topText', this.topText);
        memeData.append('middleText', this.middleText);
        memeData.append('bottomText', this.bottomText);
        memeData.append('topColor', this.topColor);
        memeData.append('middleColor', this.middleColor);
        memeData.append('bottomColor', this.bottomColor);
        if (this.imageSource === 'upload') {
          memeData.append('image', this.image);
        } else {
          memeData.append('imagePath', this.selectedImage);
        }

        this.$emit('create-meme', memeData);
      });
    }
  }
};
</script>

<style scoped>
.meme-form {
  display: flex;
  flex-direction: column;
}
.meme-form input,
.meme-form select,
.meme-form button {
  margin: 10px 0;
}
canvas {
  border: 1px solid #000;
  margin-top: 10px;
}
</style>
