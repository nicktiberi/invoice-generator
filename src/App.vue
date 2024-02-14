<script setup lang="ts">
import { computed, ref } from 'vue';
import InputField from './components/InputField.vue';
import ItemInput from './components/ItemInput.vue';
import ItemTable from './components/ItemTable.vue';
import LogoInput from './components/LogoInput.vue';
import TextArea from './components/TextArea.vue';
import { formatCurrency, newLineToBr } from './utils';
import type { InvoiceCache } from './types/InvoiceCache';

enum ViewMode {
  Invoice,
  Form
}

let invoiceCache: InvoiceCache | undefined;
const cache = localStorage.getItem('invoiceData');
if (cache) {
  invoiceCache = JSON.parse(cache);
}

const logoUrl = ref(invoiceCache ? invoiceCache.logoUrl : '');
const invoiceNumber = ref(invoiceCache ? invoiceCache.invoiceNumber : 1);
const billFrom = ref(invoiceCache ? invoiceCache.billFrom : '');
const billTo = ref(invoiceCache ? invoiceCache.billTo : '');
const notes = ref(invoiceCache ? invoiceCache.notes : '');
const items = ref(invoiceCache ? invoiceCache.items : []);
const date = ref(new Date());
const viewMode = ref<ViewMode>(ViewMode.Invoice);

const editInvoice = () => {
  viewMode.value = ViewMode.Form;
};

const generateInvoice = () => {
  const invoiceData = {
    logoUrl: logoUrl.value,
    invoiceNumber: invoiceNumber.value,
    billFrom: billFrom.value,
    billTo: billTo.value,
    items: items.value,
    notes: notes.value
  }

  localStorage.setItem('invoiceData', JSON.stringify(invoiceData));

  viewMode.value = ViewMode.Invoice;
};

const formattedInvoiceNumber = computed(() =>
  `${date.value.getFullYear()}-${date.value.getMonth() + 1}-${date.value.getDate()}-${invoiceNumber.value}`
);

const total = computed(() => items.value.reduce((result, item) => {
  return result + (item.quantity * item.unitCost);
}, 0));
</script>

<template>
  <div class="container my-5">
    <form v-if="viewMode === ViewMode.Form" @submit.prevent="generateInvoice">
      <div class="row">
        <div class="col">
          <h1>Invoice Generator</h1>

          <div class="mb-3">
            <LogoInput v-model="logoUrl" />
          </div>

          <div class="mb-3">
            <InputField id="invoiceNumber" label="Invoice Number" v-model="invoiceNumber" type="text" />
          </div>

          <div class="row mb-3">
            <div class="col">
              <TextArea id="billFrom" label="Bill From" v-model="billFrom" />
            </div>

            <div class="col">
              <TextArea id="billTo" label="Bill To" v-model="billTo" />
            </div>
          </div>

          <div class="mb-3">
            <TextArea id="notes" label="Notes/Memo" v-model="notes" />
          </div>

          <div class="row mt-5 mb-3">
            <div class="col">
              <ItemTable v-model="items" show-actions />
            </div>
          </div>

          <ItemInput v-model="items" />
        </div>
      </div>

      <div class="row mb-5 d-print-none">
        <div class="col">
          <button type="submit" class="btn btn-primary btn-lg">Generate Invoice</button>
        </div>
      </div>
    </form>

    <div v-if="viewMode === ViewMode.Invoice">
      <div class="row mb-5 d-print-none">
        <div class="col">
          <button type="button" @click="editInvoice" class="btn btn-primary btn-lg">Edit Invoice</button>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <h5 class="fw-bold">Bill From:</h5>
          <address v-html="newLineToBr(billFrom)">
          </address>
        </div>

        <div v-if="logoUrl" class="col text-end">
          <img :src="logoUrl" height="150" />
        </div>
      </div>

      <hr />

      <div class="row my-5">
        <div class="col">
          <h5 class="fw-bold">Bill To:</h5>
          <address v-html="newLineToBr(billTo)">
          </address>
        </div>

        <div class="col">
          <table class="table table-borderless">
            <tbody>
              <tr>
                <th scope="row">
                  Invoice #
                </th>
                <td>
                  {{ formattedInvoiceNumber }}
                </td>
              </tr>
              <tr>
                <th scope="row">
                  Invoice Date
                </th>
                <td>
                  {{ date.toLocaleDateString('en-us') }}
                </td>
              </tr>
              <tr class="table-secondary">
                <th scope="row">
                  Amount Due
                </th>
                <th scope="row">
                  {{ formatCurrency(total) }}
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="row my-5">
        <div class="col">
          <ItemTable v-model="items" />
        </div>
      </div>

      <div class="row my-5">
        <div class="col">
          <h5 class="fw-bold">Notes/Memo</h5>
          <p v-html="newLineToBr(notes)"></p>
        </div>

        <div class="col">
          <table class="table table-borderless">
            <tbody>
              <tr class="table-secondary">
                <th scope="row">
                  Total
                </th>
                <th scope="row">
                  {{ formatCurrency(total) }}
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
