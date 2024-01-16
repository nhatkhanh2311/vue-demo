import HelloWorld from './components/HelloWorld.vue';
import PostList from './pages/PostList.vue';
import { createRouter, createWebHashHistory, Router } from 'vue-router';
import PostDetail from './pages/PostDetail.vue';

const routes = [
  { path: '/', component: HelloWorld },
  { path: '/posts', component: PostList },
  { path: '/posts/:id', component: PostDetail },
];

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
