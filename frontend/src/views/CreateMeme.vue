<template>
  <div>
    <h1>Créez votre meme ici</h1>
    <MemeForm :images="images" @create-meme="createMeme" />
  </div>
</template>

<script>
import MemeForm from '../components/MemeForm.vue';

export default {
  components: {
    MemeForm
  },
  computed: {
    images() {
      return this.$store.state.images;
    }
  },
  methods: {
    async createMeme(memeData) {
      try {
        await this.$store.dispatch('createMeme', memeData);
        alert('Meme created successfully');
        this.$router.push('/');
      } catch (error) {
        alert('Failed to create meme');
        console.error(error);
      }
    }
  },
  created() {
    this.$store.dispatch('fetchImages');
  }
};
</script>


<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

  h1{
    font-family: "Roboto", sans-serif;
    color: #1e2149;
    text-align: center;
  }


</style>