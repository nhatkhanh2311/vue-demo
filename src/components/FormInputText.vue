<script setup lang="ts">
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputText from 'primevue/inputtext';

const { label, name } = defineProps<{
  label: string;
  name: string;
  className?: string;
}>();

const value = defineModel('value');
</script>

<template>
  <div :class="className">
    <label :for="name">{{ label }}</label>
    <InputGroup>
      <InputGroupAddon>A</InputGroupAddon>
      <InputText :id="name" :name="name" v-model="value" />
    </InputGroup>
  </div>
</template>

<style scoped>
</style>
