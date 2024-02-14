<script setup lang="ts">
import { ref } from 'vue';

const logoUrl = defineModel<string>({ required: true });

const logoInput = ref<HTMLInputElement | null>(null);

const handleLogoChange = () => {
  if (logoInput.value?.files?.length) {
    const file = logoInput.value.files[0];
    const fileReader = new FileReader();
    fileReader.addEventListener(
      'load',
      () => {
        if (typeof fileReader.result === 'string') {
          logoUrl.value = fileReader.result;
        }
      }
    );
    fileReader.readAsDataURL(file);
  } else {
    logoUrl.value = '';
  }
};

const removeLogo = () => {
  logoUrl.value = '';
};
</script>

<template>
  <label for="logo" class="form-label">Logo</label>
  <input v-if="!logoUrl" ref="logoInput" @change="handleLogoChange" type="file" class="form-control" id="logo">

  <div v-if="logoUrl">
    <img :src="logoUrl" class="d-block mb-3" height="150" />
    <button @click="removeLogo" type="button" class="btn btn-danger">Remove Logo</button>
  </div>
</template>
