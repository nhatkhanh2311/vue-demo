<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Button from 'primevue/button';
import Card from 'primevue/card';
import SpeedDial from 'primevue/speeddial';
import { useToast } from 'primevue/usetoast';

import { Post } from '../types/post.interface.ts';

const router = useRouter();
const toast = useToast();

const posts: Ref<Post[]> = ref([]);

onMounted(() => {
  fetchPosts();
});

const fetchPosts = () => {
  axios
    .get('https://my-json-server.typicode.com/nhatkhanh2311/json_server/posts')
    .then((res: any) => {
      posts.value = res.data;
    })
    .catch(() => {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Fetch posts failed',
        life: 3000,
      });
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
          <Button icon="pi pi-file-edit" label="Edit" @click="router.push(`posts/${post.id}`)" />
        </template>
      </Card>
    </div>
  </div>

  <SpeedDial direction="down-right" @click="router.push('posts/create')" />
</template>

<style scoped>
</style>
