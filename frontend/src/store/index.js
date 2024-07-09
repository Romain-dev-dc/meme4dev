import { createStore } from 'vuex';
import apiService from '../services/apiService';

const store = createStore({
  state: {
    authenticated: false,
    token: '',
    memes: [],
    images: []
  },
  mutations: {
    setAuthenticated(state, { authenticated, token }) {
      state.authenticated = authenticated;
      state.token = token;
      if (authenticated) {
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('token');
      }
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
        commit('setAuthenticated', { authenticated: response.data.authenticated, token: response.data.token });
        return response.data.authenticated;
      } catch (error) {
        console.error("Authentication failed:", error);
        return false;
      }
    },
    checkAuthentication({ commit }) {
      const token = localStorage.getItem('token');
      if (token) {
        commit('setAuthenticated', { authenticated: true, token });
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
        throw error;
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
    },
    logout({ commit }) {
      commit('setAuthenticated', { authenticated: false, token: '' });
    }
  }
});

export default store;
