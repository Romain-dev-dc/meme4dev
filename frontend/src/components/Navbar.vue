<template>
    <nav>
      <a href="http://localhost:8080"><img src="../assets/logo.png"></a>
      <ul>
        <li><router-link to="/">Vos Créations</router-link></li>
        <li><router-link to="/new">Création de meme</router-link></li>
        <li v-if="!authenticated"><router-link to="/login">Se connecter</router-link></li>
        <li v-if="authenticated"><button @click="logout">Se déconnecter</button></li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    computed: {
      authenticated() {
        return this.$store.state.authenticated;
      }
    },
    methods: {
      logout() {
        this.$store.commit('setAuthenticated', false);
        this.$router.push('/login');
      }
    }
  };
  </script>
  
  <style scoped>

@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

nav {
    background-color: #1e2149;
    color: #00D09E;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    height: fit-content;
    align-items: center;
    border-radius: 15px;
    font-family: "Roboto", sans-serif;

  }
  
  ul {
    list-style: none;
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0;
    align-items: center;
  }
  
  ul button{
    padding: 10px;
    background-color: #00D09E ;
    border-radius: 15px ;
    font-family: "Roboto", sans-serif;
    color: #1e2149;
    font-size: 15px;
    border: 0px solid transparent;
    cursor: pointer;
  }

  li {
    margin: 0 10px;
  }
  
  a {
    color: white;
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
  }

  nav img{
    filter: invert(1);
    height: 80px;
    width: auto;
  }
  </style>