<script setup lang="ts">
import { ref } from 'vue';
import { v4 as uuid } from 'uuid';
import InputField from './InputField.vue';
import type { Item } from '@/types/Item';

const items = defineModel<Item[]>({ required: true });

const itemName = ref('');
const itemDescription = ref('');
const itemQuantity = ref(0);
const itemUnitCost = ref(0);

const addItem = () => {
  items.value.push({
    id: uuid(),
    name: itemName.value,
    description: itemDescription.value,
    quantity: itemQuantity.value,
    unitCost: itemUnitCost.value
  });

  itemName.value = '';
  itemDescription.value = '';
  itemQuantity.value = 0;
  itemUnitCost.value = 0;
};
</script>

<template>
  <div class="row mb-3">
    <div class="col">
      <InputField id="itemName" label="Item" v-model="itemName" type="text" />
    </div>
    <div class="col">
      <InputField id="itemDescription" label="Description" v-model="itemDescription" type="text" />
    </div>
    <div class="col">
      <InputField id="itemQuantity" label="Quantity" v-model="itemQuantity" type="number" />
    </div>
    <div class="col">
      <InputField id="itemUnitCost" label="Unit Cost" v-model="itemUnitCost" type="number" />
    </div>
  </div>

  <button @click="addItem" type="button" class="btn btn-success mb-5">Add Item</button>
</template>
