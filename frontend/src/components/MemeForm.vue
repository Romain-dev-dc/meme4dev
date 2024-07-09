<template>
  <div class="meme-form">
    <div class="formulaire">
    
    
    <div v-if="imageUrl" class="meme-preview">
      <div class="image-container" ref="imageContainer">
        <img :src="imageUrl" alt="meme image" ref="memeImage" @load="setImageSize" />
        <div class="text top" :style="{ color: topColor, maxWidth: imageWidth + 'px' }">{{ topText }}</div>
        <div class="text middle" :style="{ color: middleColor, maxWidth: imageWidth + 'px' }">{{ middleText }}</div>
        <div class="text bottom" :style="{ color: bottomColor, maxWidth: imageWidth + 'px' }">{{ bottomText }}</div>
      </div>
    </div>
    </div>
  
    <div class="description">
      <h2>Faites parler votre créativité</h2>
      <p>Selectionner une photo pour créer votre meme</p>
    <div>
      <input type="file" @change="onFileChange" />
      <div>
      <input v-model="title" type="text" placeholder="Titre du meme" />
      </div>
      <div class="champs">
      <input v-model="topText" type="text" placeholder="Texte du haut" />
      <input type="color" v-model="topColor" />
      <label>Texte du haut</label>
      </div>
      <div class="champs">
      <input v-model="middleText" type="text" placeholder="Texte du milieu" />
      <input type="color" v-model="middleColor" />
      <label>Texte du milieu</label>
      </div>
      <div class="champs">
      <input v-model="bottomText" type="text" placeholder="Texte du bas" />
      <input type="color" v-model="bottomColor" />
      <label>Texte du bas</label>
      </div>
      <div>
      <button @click="createMeme">Créer mon meme</button>
      </div>
    </div>
  </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      image: null,
      imageUrl: '',
      title: '',
      topText: '',
      middleText: '',
      bottomText: '',
      topColor: '#000000',
      middleColor: '#000000',
      bottomColor: '#000000',
      imageWidth: 0,
      imageHeight: 0
    };
  },
  watch: {
    image() {
      if (this.image) {
        this.imageUrl = URL.createObjectURL(this.image);
      }
    }
  },
  methods: {
    onFileChange(e) {
      this.image = e.target.files[0];
    },
    setImageSize() {
      const img = this.$refs.memeImage;
      const container = this.$refs.imageContainer;
      const ratio = img.naturalWidth / img.naturalHeight;
      this.imageHeight = Math.min(500, img.naturalHeight);
      this.imageWidth = this.imageHeight * ratio;
      img.style.width = this.imageWidth + 'px';
      img.style.height = this.imageHeight + 'px';
      container.style.width = img.style.width;
      container.style.height = img.style.height;
    },
    drawText(ctx, text, x, y, maxWidth, lineHeight) {
      const words = text.split(' ');
      let line = '';
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          ctx.fillText(line, x, y);
          line = words[n] + ' ';
          y += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, x, y);
    },
    createMeme() {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';

        const maxWidth = canvas.width - 20;
        const lineHeight = 40;

        ctx.fillStyle = this.topColor;
        this.drawText(ctx, this.topText, canvas.width / 2, 50, maxWidth, lineHeight);

        ctx.fillStyle = this.middleColor;
        this.drawText(ctx, this.middleText, canvas.width / 2, canvas.height / 2, maxWidth, lineHeight);

        ctx.fillStyle = this.bottomColor;
        this.drawText(ctx, this.bottomText, canvas.width / 2, canvas.height - 50, maxWidth, lineHeight);

        canvas.toBlob((blob) => {
          const memeData = new FormData();
          memeData.append('title', this.title);
          memeData.append('image', blob);
          memeData.append('topText', this.topText);
          memeData.append('middleText', this.middleText);
          memeData.append('bottomText', this.bottomText);
          memeData.append('topColor', this.topColor);
          memeData.append('middleColor', this.middleColor);
          memeData.append('bottomColor', this.bottomColor);

          this.$emit('create-meme', memeData);
        });
      };

      img.src = this.imageUrl; // Déclencher l'événement onload

      if (!this.imageUrl) {
        alert('Veuillez sélectionner une image.');
      }
    }
  }
};
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

.meme-form {
  display: flex;
  justify-content: space-around;
  margin-top: 80px;
  align-items: center;
}
.meme-form input,
.meme-form select,
.meme-form button {
  margin: 10px 0;
}
.meme-preview {
  position: relative;
  display: inline-block;
}
.image-container {
  position: relative;
}
.image-container img {
  display: block;
  max-height: 500px;
  width: auto;
}
.text {
  position: absolute;
  width: 100%;
  text-align: center;
  font-size: 30px;
  font-family: "Roboto", sans-serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  word-wrap: break-word;
  overflow: hidden;
  white-space: pre-wrap;
}
.top {
  top: 10px;
}
.middle {
  top: 50%;
  transform: translateY(-50%);
}
.bottom {
  bottom: 10px;
}

.description{
  background-color: #00D09E;
  padding:3% 5%;
  border-radius: 15px;
}

.description h2{
  font-family: "Roboto", sans-serif;
  color: #1e2149;
}

.description p{
  font-family: "Roboto", sans-serif;
  color: #1e2149;
}

.description input{
  font-family: "Roboto", sans-serif;
  padding: 10px;
  border: 0px solid transparent;
  border-radius: 15px;
}

#app > div > div > div > div.description > div > div > input[type=color]{
  padding: 0px;
  border-radius: 0px;
  border: 1px solid #1e2149;
  border-radius: 3px;
}

.description .champs{
  display: flex;
  align-items: center;
  gap: 15px;
}

.description .champs label{
  font-family: "Roboto", sans-serif;
  color: #1e2149;
  font-weight: 500;
}

.description button{
  font-family: "Roboto", sans-serif;
  color: white;
  padding: 10px;
  border-radius: 15px;
  border: 0px solid transparent;
  background-color: #1e2149;
  transition: all 0.5s;
  font-weight: 500;
}

.description button:hover{
  font-family: "Roboto", sans-serif;
  color: #1e2149;
  padding: 10px;
  border-radius: 15px;
  border: 0px solid transparent;
  background-color: white;
  cursor: pointer;
}

#app > div > div > div > div.description > div > input[type=file]{
  padding: 10px;
  border: 0px solid transparent;
}

</style>
