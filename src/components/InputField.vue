<script setup lang="ts">
const value = defineModel<string | number>({ required: true });

defineProps<{
  id: string;
  label: string;
  type: 'text' | 'number';
}>();
</script>

<template>
  <div class="col">
    <label :for="id" class="form-label">{{ label }}</label>
    <input :id="id" v-model="value" :type="type" class="form-control" />
  </div>
</template>
