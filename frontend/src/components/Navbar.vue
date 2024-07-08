<template>
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/new">Create Meme</router-link></li>
        <li v-if="!authenticated"><router-link to="/login">Login</router-link></li>
        <li v-if="authenticated"><button @click="logout">Logout</button></li>
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
  nav {
    background-color: #333;
    color: white;
    padding: 10px;
  }
  
  ul {
    list-style: none;
    display: flex;
    justify-content: space-around;
    margin: 0;
    padding: 0;
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
  </style>