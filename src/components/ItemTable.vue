<script setup lang="ts">
import { formatCurrency } from '@/utils';
import type { Item } from '@/types/Item';

const items = defineModel<Item[]>({ required: true });

defineProps<{
  showActions?: boolean
}>();

const removeItem = (item: Item) => {
  items.value = items.value.filter((i) => i.id != item.id);
};
</script>

<template>
  <table class="table">
    <thead>
      <tr class="table-secondary">
        <th>
          Item
        </th>
        <th>
          Description
        </th>
        <th>
          Quantity
        </th>
        <th>
          Unit Cost
        </th>
        <th>
          Line Total
        </th>
        <th v-if="showActions">
          Actions
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id">
        <td>
          {{ item.name }}
        </td>
        <td>
          {{ item.description }}
        </td>
        <td>
          {{ item.quantity }}
        </td>
        <td>
          {{ formatCurrency(item.unitCost) }}
        </td>
        <td>
          {{ formatCurrency(item.unitCost * item.quantity) }}
        </td>
        <td v-if="showActions">
          <button @click="removeItem(item)" type="button" class="btn btn-danger btn-sm">Remove</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
