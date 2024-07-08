<template>
    <div>
      <h1>Login</h1>
      <input v-model="password" type="password" placeholder="Enter password" />
      <button @click="login">Login</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        password: ''
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