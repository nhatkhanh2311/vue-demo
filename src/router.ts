import { createRouter, createWebHashHistory, Router } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
import PostList from './pages/PostList.vue';
import PostDetail from './pages/PostDetail.vue';
import CreatePost from './pages/CreatePost.vue';

const routes = [
  { path: '/', component: HelloWorld },
  { path: '/posts', component: PostList },
  { path: '/posts/:id', component: PostDetail },
  { path: '/posts/create', component: CreatePost },
];

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
