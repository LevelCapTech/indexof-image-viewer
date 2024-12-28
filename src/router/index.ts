import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ListView from '../views/ListView.vue';
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
    path: '/list2',
    name: 'List',
    component: ListView
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
