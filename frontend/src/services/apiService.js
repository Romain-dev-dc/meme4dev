import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Ajouter un intercepteur pour inclure le token dans les en-têtes des requêtes
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default {
  authenticate(password) {
    return apiClient.post('/authenticate', { password });
  },
  fetchMemes() {
    return apiClient.get('/memes');
  },
  deleteMeme(id) {
    return apiClient.delete(`/memes/${id}`);
  },
  createMeme(memeData) {
    const formData = new FormData();
    if (memeData.image) {
      formData.append('image', memeData.image);
    } else {
      formData.append('imagePath', memeData.imagePath);
    }
    formData.append('title', memeData.title);
    formData.append('topText', memeData.topText);
    formData.append('middleText', memeData.middleText);
    formData.append('bottomText', memeData.bottomText);
    formData.append('topColor', memeData.topColor);
    formData.append('middleColor', memeData.middleColor);
    formData.append('bottomColor', memeData.bottomColor);
    return apiClient.post('/memes', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  fetchImages() {
    return apiClient.get('/images');
  }
};
