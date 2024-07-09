import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);

store.dispatch('checkAuthentication'); // Vérifiez l'authentification lors du chargement de l'application

app.use(store);
app.use(router);
app.mount('#app');
