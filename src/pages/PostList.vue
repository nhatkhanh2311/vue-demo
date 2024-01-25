<template>
  <div class="grid">
    <div class="col-6" v-for="post in posts" :key="post.id">
      <Card class="flex justify-content-center">
        <template #header>
          <img
            class="w-20rem h-20rem border-round-2xl"
            alt="header"
            :src="post.image"
          />
        </template>
        <template #title>{{ post.title }}</template>
        <template #content>{{ post.description }}</template>
        <template #footer>
          <Button
            icon="pi pi-file-edit"
            label="Edit"
            @click="goToPost(post.id)"
          />
        </template>
      </Card>
    </div>
  </div>

  <SpeedDial direction="down-right" @click="createPost" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Button from "primevue/button";
import Card from "primevue/card";
import SpeedDial from "primevue/speeddial";
import { useToast } from "primevue/usetoast";

import { Post } from "@/types/post.interface";

export default defineComponent({
  components: {
    Button,
    Card,
    SpeedDial,
  },
  setup() {
    const router = useRouter();
    const toast = useToast();

    const posts = ref<Post[]>([]);

    onMounted(() => {
      fetchPosts();
    });

    const fetchPosts = () => {
      axios
        .get(
          "https://my-json-server.typicode.com/nhatkhanh2311/json_server/posts"
        )
        .then((res: any) => {
          posts.value = res.data;
        })
        .catch(() => {
          toast.add({
            severity: "error",
            summary: "Error",
            detail: "Fetch posts failed",
            life: 3000,
          });
        });
    };

    const goToPost = (id: number) => {
      router.push(`posts/${id}`);
    };

    const createPost = () => {
      router.push("posts/create");
    };

    return {
      posts,
      goToPost,
      createPost,
    };
  },
});
</script>

<style scoped></style>
