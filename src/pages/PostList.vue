<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';
import axios from 'axios';
import Button from 'primevue/button';
import Card from 'primevue/card';
import { Post } from '../types/post.interface.ts';

const posts: Ref<Post[]> = ref([]);

onMounted(() => {
  fetchPosts();
});

const fetchPosts = () => {
  axios
    .get('https://my-json-server.typicode.com/nhatkhanh2311/json_server/posts')
    .then((res: any) => {
      console.log(res.data);
      posts.value = res.data;
    })
    .catch((err: any) => {
      console.log(err);
    });
}
</script>

<template>
  <div class="grid">
    <div class="col-6" v-for="post in posts" :key="post.id">
      <Card>
        <template #header class="w-10rem">
          <img class="w-20rem h-20rem border-round-2xl" alt="header" :src="post.image" />
        </template>
        <template #title>{{ post.title }}</template>
        <template #content>{{ post.description }}</template>
        <template #footer>
          <Button icon="pi pi-file-edit" label="Edit" />
        </template>
      </Card>
    </div>
  </div>
</template>

<style scoped>
</style>
