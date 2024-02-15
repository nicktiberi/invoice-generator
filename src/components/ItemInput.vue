<script setup lang="ts">
import { v4 as uuid } from 'uuid';
import { ref } from 'vue';

import InputField from './InputField.vue';

import type { Item } from '../types/Item';

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
      <InputField id="itemName" v-model="itemName" label="Item" type="text" />
    </div>
    <div class="col">
      <InputField id="itemDescription" v-model="itemDescription" label="Description" type="text" />
    </div>
    <div class="col">
      <InputField id="itemQuantity" v-model="itemQuantity" label="Quantity" type="number" />
    </div>
    <div class="col">
      <InputField id="itemUnitCost" v-model="itemUnitCost" label="Unit Cost" type="number" />
    </div>
  </div>

  <button type="button" class="btn btn-success mb-5" @click="addItem">Add Item</button>
</template>
