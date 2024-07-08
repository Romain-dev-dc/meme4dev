import { createStore } from 'vuex';
import apiService from '../services/apiService';

const store = createStore({
  state: {
    authenticated: false,
    memes: [],
    images: []
  },
  mutations: {
    setAuthenticated(state, value) {
      state.authenticated = value;
    },
    setMemes(state, memes) {
      state.memes = memes;
    },
    setImages(state, images) {
      state.images = images.map(image => ({
        path: image.path,
        title: image.title,
        url: `/uploads/${image.path}`
      }));
    }
  },
  actions: {
    async authenticate({ commit }, password) {
      try {
        const response = await apiService.authenticate(password);
        if (response.data) {
          commit('setAuthenticated', true);
        }
        return response.data;
      } catch (error) {
        console.error("Authentication failed:", error);
        return false;
      }
    },
    async fetchMemes({ commit }) {
      try {
        const response = await apiService.fetchMemes();
        commit('setMemes', response.data);
      } catch (error) {
        console.error("Failed to fetch memes:", error);
      }
    },
    async deleteMeme({ dispatch }, id) {
      try {
        await apiService.deleteMeme(id);
        dispatch('fetchMemes');
      } catch (error) {
        console.error("Failed to delete meme:", error);
      }
    },
    async createMeme({ dispatch }, memeData) {
      try {
        await apiService.createMeme(memeData);
        dispatch('fetchMemes');
      } catch (error) {
        console.error("Failed to create meme:", error);
        throw error;
      }
    },
    async fetchImages({ commit }) {
      try {
        const response = await apiService.fetchImages();
        commit('setImages', response.data);
      } catch (error) {
        console.error("Failed to fetch images:", error);
      }
    }
  }
});

export default store;
