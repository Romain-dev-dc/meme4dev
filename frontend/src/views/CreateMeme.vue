<template>
  <div>
    <h1>Create Meme</h1>
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
