<template>
    <div class="presentation">
      <div class="hero">

        <div class="contenu">
          <h1>Meme4dev</h1>
          <h2>Découvrez vos créations</h2>
          <p>Bienvenue sur votre espace personnel de création ! 
            Ici, vous trouverez tous les mèmes que vous avez créés et partagés avec la communauté meme4dev.
            Cet espace est votre galerie personnelle où chaque œuvre reflète votre sens de l'humour unique et votre perspective en tant que développeur.</p>
            <a href="http://localhost:8080/new">Créer un meme</a>
        </div>
        <img src="../assets/home.png"/>
      </div>
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

  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

  .presentation{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  

  .presentation .hero{
    display: flex;
    margin: 5%;
    justify-content: space-around;
    align-items: center;
    position: relative;
  }

  .presentation .hero .contenu{
    width: 40%;
  }

  .presentation .hero .contenu h1{
    font-family: "Roboto", sans-serif;
    color: #1e2149;
    position: relative;
    font-size: 4em;
    margin: 0;
  }

  .presentation .hero .contenu h2{
    font-family: "Roboto", sans-serif;
    color: #00D09E;
    position: relative;
    font-size: 2em;
    margin: 0;
  }

  .presentation .hero .contenu p{
    font-family: "Roboto", sans-serif;
    color: #1e2149;
    position: relative;
    margin-bottom: 35px;
    font-weight: 500;
  }

  .presentation .hero .contenu a{
    font-family: "Roboto", sans-serif;
    color: #1e2149;
    position: relative;
    text-decoration: unset;
    background-color: #00D09E;
    padding: 10px;
    border-radius: 15px;
    transition: all 0.5s;
  }

  .presentation .hero .contenu a:hover{
    font-family: "Roboto", sans-serif;
    color: white;
    position: relative;
    text-decoration: unset;
    background-color: #1e2149;
    padding: 10px;
    border-radius: 15px;
  }

  .presentation .hero img{
    height: 400px;
    width: auto;
  }


  </style>