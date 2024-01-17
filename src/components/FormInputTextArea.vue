<script setup lang="ts">
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import Textarea from 'primevue/textarea';

const { label, name } = defineProps<{
  label: string;
  name: string;
  rows?: string;
  className?: string;
}>();

const value = defineModel('value');
</script>

<template>
  <div :class="className">
    <label :for="name">{{ label }}</label>
    <InputGroup>
      <InputGroupAddon>A</InputGroupAddon>
      <Textarea :id="name" :name="name" :rows="rows" v-model="value" />
    </InputGroup>
  </div>
</template>

<style scoped>
</style>
