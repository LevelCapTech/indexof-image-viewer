import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ViewerView from '../views/ViewerView.vue';
import GalleryView from '../views/GalleryView.vue';
// import AboutView from '../views/AboutView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/image/:id',
    name: 'image',
    component: ViewerView
  },
  {
    path: '/list',
    name: 'list',
    component: GalleryView
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
