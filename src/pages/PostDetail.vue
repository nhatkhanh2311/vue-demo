<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import Card from 'primevue/card';
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';

import { Post } from '../types/post.interface.ts';
import FormInputText from '../components/FormInputText.vue';
import FormInputDate from '../components/FormInputDate.vue';
import FormInputNumber from '../components/FormInputNumber.vue';
import FormInputTextArea from '../components/FormInputTextArea.vue';

const route = useRoute();
const toast = useToast();

const post: Ref<Post | null> = ref(null);

onMounted(() => {
  fetchPost();
});

const fetchPost = () => {
  axios
    .get(`https://my-json-server.typicode.com/nhatkhanh2311/json_server/posts/${route.params.id}`)
    .then((res: any) => {
      console.log(res.data);
      post.value = res.data;
    })
    .catch((err: any) => {
      console.log(err);
    });
}

const onSubmit = (data: any) => {
  console.log(data);
  axios
    .put(`https://my-json-server.typicode.com/nhatkhanh2311/json_server/posts/${route.params.id}`, data)
    .then((res: any) => {
      console.log(res.data);
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Update post successfully',
        life: 3000,
      });
    })
    .catch((err: any) => {
      console.log(err);
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Update post failed',
        life: 3000,
      });
    });
}
</script>

<template>
  <div class="col-12" v-if="post">
    <Card>
      <template #content>
        <form @submit.prevent="onSubmit">
          <FormInputText class-name="mb-2" label="Title" name="title" v-model:value="post.title" />
          <FormInputDate class-name="mb-2" label="Date" name="date" v-model:value="post.date" />
          <FormInputNumber class-name="mb-2" label="Number" name="number" v-model:value="post.number" />
          <FormInputTextArea class-name="mb-2" label="Description" name="description" v-model:value="post.description" rows="5" />
          <Button type="submit" icon="pi pi-save" label="Save" />
        </form>
      </template>
    </Card>
  </div>
</template>

<style scoped>
</style>
