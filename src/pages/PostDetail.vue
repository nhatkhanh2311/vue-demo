<template>
  <div v-if="post">
    <Card class="flex justify-content-center">
      <template #content>
        <img
          class="w-20rem h-20rem border-round-2xl mb-2"
          alt="header"
          :src="post.image"
        />
        <form class="grid" @submit.prevent="onSubmit">
          <FormInputText
            class-name="col-6 mb-2"
            label="Title"
            name="title"
            v-model:value="post.title"
          />
          <FormInputDate
            class-name="col-6 mb-2"
            label="Date"
            name="date"
            v-model:value="post.date"
          />
          <FormInputNumber
            class-name="col-6 mb-2"
            label="Number"
            name="number"
            v-model:value="post.number"
          />
          <FormInputTextArea
            class-name="col-6 mb-2"
            label="Description"
            name="description"
            v-model:value="post.description"
            rows="5"
          />
          <div class="col-12 align-content-center">
            <Button type="submit" icon="pi pi-save" label="Save" />
          </div>
          <span class="p-error" name="error">{{ error }}</span>
        </form>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import Card from "primevue/card";
import Button from "primevue/button";
import { useToast } from "primevue/usetoast";

import { Post } from "@/types/post.interface";
import FormInputText from "../components/FormInputText.vue";
import FormInputDate from "../components/FormInputDate.vue";
import FormInputNumber from "../components/FormInputNumber.vue";
import FormInputTextArea from "../components/FormInputTextArea.vue";

export default defineComponent({
  components: {
    Card,
    Button,
    FormInputText,
    FormInputDate,
    FormInputNumber,
    FormInputTextArea,
  },
  setup() {
    const route = useRoute();
    const toast = useToast();

    const post = ref<Post | null>(null);
    const error: Ref<string | undefined> = ref(undefined);

    onMounted(() => {
      fetchPost();
    });

    const validate = (): { ok: boolean; message?: string } => {
      if (!post.value) return { ok: false, message: "Post is required" };
      if (!post.value.title || post.value.title.trim() === "") {
        return { ok: false, message: "Title is required" };
      }
      if (!post.value.date || new Date(post.value.date) > new Date()) {
        return { ok: false, message: "Date must be in history" };
      }
      if (!post.value.number || post.value.number < 0) {
        return { ok: false, message: "Number must be greater than 0" };
      }
      if (!post.value.description || post.value.description.trim() === "") {
        return { ok: false, message: "Description is required" };
      }
      return { ok: true };
    };

    const fetchPost = () => {
      axios
        .get(
          `https://my-json-server.typicode.com/nhatkhanh2311/json_server/posts/${route.params.id}`
        )
        .then((res: any) => {
          post.value = res.data;
        })
        .catch(() => {
          toast.add({
            severity: "error",
            summary: "Error",
            detail: "Fetch post failed",
            life: 3000,
          });
        });
    };

    const onSubmit = (data: any) => {
      const { ok, message } = validate();
      if (ok) {
        axios
          .put(
            `https://my-json-server.typicode.com/nhatkhanh2311/json_server/posts/${route.params.id}`,
            data
          )
          .then(() => {
            toast.add({
              severity: "success",
              summary: "Success",
              detail: "Update post successfully",
              life: 3000,
            });
          })
          .catch(() => {
            toast.add({
              severity: "error",
              summary: "Error",
              detail: "Update post failed",
              life: 3000,
            });
          });
      } else {
        toast.add({
          severity: "error",
          summary: "Error",
          detail: message,
          life: 3000,
        });
        error.value = message;
      }
    };

    return {
      post,
      error,
      onSubmit,
    };
  },
});
</script>

<style scoped></style>
