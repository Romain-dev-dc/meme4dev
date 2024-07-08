<template>
    <div class="meme-item">
      <img :src="`/uploads/${meme}`" @click="$emit('view-meme', meme)" />
      <button @click="$emit('delete-meme', meme)">Delete</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      meme: {
        type: String,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  .meme-item img {
    max-width: 100%;
    height: auto;
    cursor: pointer;
  }
  </style>