import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ViewerView from '../views/ViewerView.vue';
import GalleryView from '../views/GalleryView.vue';
import FavoriteView from '../views/FavoriteView.vue';
// import AboutView from '../views/AboutView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/txt2img/:id',
    name: 'txt2img_detail',
    component: ViewerView
  },
  {
    path: '/list/:id',
    name: 'txt2img',
    component: GalleryView
  },
  {
    path: '/favorite/:id',
    name: 'editor_favorite',
    component: FavoriteView
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
