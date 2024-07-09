<template>
    <div class="connexion">
      <img src="../assets/login.png" />
      <h1>Meme4dev</h1>
      <h2>Connectez-vous</h2>
      <p>Pour pouvoir accéder aux fonctionnalités du site veuillez vous connecter</p>
      <div class="accepter">
        <input v-model="password" type="password" placeholder="Enter password" />
        <button @click="login">Se connecter</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        password: 'romain'
      };
    },
    methods: {
      async login() {
        const success = await this.$store.dispatch('authenticate', this.password);
        if (success) {
          this.$router.push('/');
        } else {
          alert('Wrong password');
        }
      }
    }
  };
  </script>

  <style scoped>

@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');



  .connexion{
    width: 100%;
    height: 60vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .connexion img{
    position: absolute;
    z-index: -1;
    height: 700px;
    width: auto;
    top: 50px;
  }

  .connexion h1{
    color: #1e2149;
    font-family: "Roboto", sans-serif;
    margin: 0;
    text-shadow: 3px 2px 1px white;
    font-size: 4em;
  }

  .connexion h2{
    color: #ffffff;
    font-family: "Roboto", sans-serif;
    margin: 0;
    text-shadow: 2px 1px 2px black;
  }

  .connexion p{
    color: #ffffff;
    font-family: "Roboto", sans-serif;
    margin: 0;
    text-shadow: 2px 1px 2px black;
    background-color: #1e2149;
    padding: 10px;
    border-radius: 15px;
    margin: 20px;
  }

  .connexion .accepter input{
    padding: 10px;
    border: 2px solid #00D09E;
    border-radius: 15px 0px 0px 15px;
  }

  .connexion .accepter button{
    padding: 10px;
    border: 2px solid #00D09E;
    border-radius: 0px 15px 15px 0px;
    background-color: #00D09E;
    color: #1e2149;
    font-weight: 500;
    font-family: "Roboto", sans-serif;
    transition: all 0.5s;
  }

  .connexion .accepter button:hover{
    padding: 10px;
    border: 2px solid #1e2149;
    border-radius: 0px 15px 15px 0px;
    background-color: #1e2149;
    color: #fff;
    font-weight: 500;
    font-family: "Roboto", sans-serif;
    cursor: pointer;
  }

  </style>