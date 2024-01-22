<script setup lang="ts">
import { defineProps, defineModel } from "vue";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import Calendar from "primevue/calendar";

defineProps<{
  label: string;
  name: string;
  className?: string;
}>();

const value = defineModel("value");
</script>

<template>
  <div :class="className">
    <label :for="name">{{ label }}</label>
    <InputGroup>
      <InputGroupAddon><i class="pi pi-calendar" /></InputGroupAddon>
      <Calendar :id="name" :name="name" v-model="value" />
    </InputGroup>
  </div>
</template>

<style scoped></style>
