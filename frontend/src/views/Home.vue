<template>
    <div>
      <h1>Memes</h1>
      <div v-if="memes.length">
        <img v-for="meme in memes" :key="meme._id" :src="`/uploads/${meme.path}`" @click="selectMeme(meme._id)" style="cursor: pointer; max-width: 100px; margin: 10px;" />
      </div>
      <div v-else>No memes available</div>
      <div v-if="selectedMeme">
        <h1>Selected Meme</h1>
        <img :src="`/uploads/${selectedMeme.path}`" style="max-width: 500px; margin: 10px;" />
        <button @click="deleteMeme(selectedMeme._id)">Delete Meme</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedMeme: null
      };
    },
    computed: {
      memes() {
        return this.$store.state.memes;
      }
    },
    methods: {
      selectMeme(id) {
        this.selectedMeme = this.memes.find(meme => meme._id === id);
      },
      async deleteMeme(id) {
        try {
          await this.$store.dispatch('deleteMeme', id);
          this.selectedMeme = null;
          alert('Meme deleted successfully');
        } catch (error) {
          alert('Failed to delete meme');
          console.error(error);
        }
      }
    },
    created() {
      this.$store.dispatch('fetchMemes');
    }
  };
  </script>