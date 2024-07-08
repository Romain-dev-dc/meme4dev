import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import CreateMeme from '../views/CreateMeme.vue';

const routes = [
  { path: '/login', name: 'Login', component: Login },
  { path: '/', name: 'Home', component: Home },
  { path: '/new', name: 'CreateMeme', component: CreateMeme }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;