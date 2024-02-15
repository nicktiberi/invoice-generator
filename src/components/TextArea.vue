<script setup lang="ts">
const value = defineModel<string>({ required: true });

defineProps<{
  id: string;
  label: string;
}>();
</script>

<template>
  <div class="col">
    <label :for="id" class="form-label">{{ label }}</label>
    <textarea :id="id" v-model="value" class="form-control" rows="4"></textarea>
  </div>
</template>
