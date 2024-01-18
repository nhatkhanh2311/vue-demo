<script setup lang="ts">
import { ref, Ref } from 'vue';
import axios from 'axios';
import Card from 'primevue/card';
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';

import { Post } from '../types/post.interface.ts';
import FormInputText from '../components/FormInputText.vue';
import FormInputDate from '../components/FormInputDate.vue';
import FormInputNumber from '../components/FormInputNumber.vue';
import FormInputTextArea from '../components/FormInputTextArea.vue';

const toast = useToast();

const post: Ref<Post | null> = ref({} as Post);

const onSubmit = (data: any) => {
  axios
    .post('https://my-json-server.typicode.com/nhatkhanh2311/json_server/posts', data)
    .then(() => {
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Create post successfully',
        life: 3000,
      });
    })
    .catch(() => {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Create post failed',
        life: 3000,
      });
    });
}
</script>

<template>
  <div v-if="post">
    <Card>
      <template #content>
        <form class="grid" @submit.prevent="onSubmit">
          <FormInputText class-name="col-6 mb-2" label="Title" name="title" v-model:value="post.title" />
          <FormInputDate class-name="col-6 mb-2" label="Date" name="date" v-model:value="post.date" />
          <FormInputNumber class-name="col-6 mb-2" label="Number" name="number" v-model:value="post.number" />
          <FormInputTextArea class-name="col-6 mb-2" label="Description" name="description" v-model:value="post.description" rows="5" />
          <div class="col-12 align-content-center">
            <Button type="submit" icon="pi pi-save" label="Create" />
          </div>
        </form>
      </template>
    </Card>
  </div>
</template>

<style scoped>
</style>
