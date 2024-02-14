<script setup lang="ts">
const value = defineModel<string | number>({ required: true });

defineProps<{
  id: string;
  label: string;
  type: 'text' | 'number'
}>();
</script>

<template>
  <div class="col">
    <label :for="id" class="form-label">{{ label }}</label>
    <input v-model="value" :type="type" class="form-control" :id="id">
  </div>
</template>
