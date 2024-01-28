<script setup lang="ts">
  import { computed, ref } from 'vue';

  enum ViewMode {
    Invoice,
    Form
  }

  type InvoiceCache = {
    logoUrl: string;
    invoiceNumber: number;
    billFrom: string;
    billTo: string;
    item: string;
    description: string;
    quantity: number;
    unitCost: number;
    notes: string;
  };

  const currencyFormat = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
  });

  let invoiceCache: InvoiceCache | undefined;

  const cache = localStorage.getItem('invoiceData');
  if (cache) {
    invoiceCache = JSON.parse(cache);
  }

  const viewMode = ref<ViewMode>(ViewMode.Invoice);

  const logoInput = ref<HTMLInputElement | null>(null);
  const logoUrl = ref(invoiceCache ? invoiceCache.logoUrl : '');

  const invoiceNumber = ref(invoiceCache ? invoiceCache.invoiceNumber : 1);
  const date = ref(new Date());
  const billFrom = ref(invoiceCache ? invoiceCache.billFrom : '');
  const billTo = ref(invoiceCache ? invoiceCache.billTo : '');
  const item = ref(invoiceCache ? invoiceCache.item : '');
  const description = ref(invoiceCache ? invoiceCache.description : '');
  const quantity = ref(invoiceCache ? invoiceCache.quantity : 0);
  const unitCost = ref(invoiceCache ? invoiceCache.unitCost : 0);
  const notes = ref(invoiceCache ? invoiceCache.notes : '');

  const formattedDate = computed(() => date.value.toLocaleDateString('en-us'));
  const formattedInvoiceNumber = computed(() =>
    `${date.value.getFullYear()}-${date.value.getMonth() + 1}-${date.value.getDate()}-${invoiceNumber.value}`
  );
  const formattedBillFrom = computed(() => billFrom.value.replace(/\n/g, '<br />'));
  const formattedBillTo = computed(() => billTo.value.replace(/\n/g, '<br />'));
  const formattedUnitCost = computed(() => currencyFormat.format(unitCost.value));
  const formattedTotal = computed(() => currencyFormat.format(quantity.value * unitCost.value));
  const formattedNotes = computed(() => notes.value.replace(/\n/g, '<br />'));
  const displayButtonText = computed(() => viewMode.value === ViewMode.Invoice ? 'Edit Invoice' : 'Generate Invoice');

  const toggleDisplay = () => {
    const newViewMode = viewMode.value === ViewMode.Form ? ViewMode.Invoice : ViewMode.Form;

    if (newViewMode === ViewMode.Invoice) {
      const invoiceData = {
        logoUrl: logoUrl.value,
        invoiceNumber: invoiceNumber.value,
        billFrom: billFrom.value,
        billTo: billTo.value,
        item: item.value,
        description: description.value,
        quantity: quantity.value,
        unitCost: unitCost.value,
        notes: notes.value
      }

      localStorage.setItem('invoiceData', JSON.stringify(invoiceData));
    }

    viewMode.value = newViewMode;
  };

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
  <div class="container my-5">
    <form @submit.prevent="toggleDisplay">
      <div v-if="viewMode === ViewMode.Form" class="row">
        <div class="col">
          <h1>Invoice Generator</h1>

          <div class="mb-3">
            <label for="logo" class="form-label">Logo</label>
            <input v-if="!logoUrl" ref="logoInput" @change="handleLogoChange" type="file" class="form-control" id="logo">

            <div v-if="logoUrl">
              <img :src="logoUrl" class="d-block mb-3" height="150" />
              <button @click="removeLogo" type="button" class="btn btn-danger">Remove Logo</button>
            </div>
          </div>

          <div class="mb-3">
            <label for="invoiceNumber" class="form-label">Invoice Number</label>
            <input v-model="invoiceNumber" type="number" class="form-control" id="invoiceNumber">
          </div>

          <div class="mb-3">
            <label for="billFrom" class="form-label">Bill From</label>
            <textarea v-model="billFrom" class="form-control" id="billFrom" rows="4"></textarea>
          </div>

          <div class="mb-3">
            <label for="billTo" class="form-label">Bill To</label>
            <textarea v-model="billTo" class="form-control" id="billTo" rows="4"></textarea>
          </div>

          <div class="mb-3">
            <label for="item" class="form-label">Item</label>
            <input v-model="item" type="text" class="form-control" id="item">
          </div>

          <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <input v-model="description" type="text" class="form-control" id="description">
          </div>

          <div class="mb-3">
            <label for="quantity" class="form-label">Quantity</label>
            <input v-model="quantity" type="number" class="form-control" id="quantity">
          </div>

          <div class="mb-3">
            <label for="unitCost" class="form-label">Unit Cost</label>
            <input v-model="unitCost" type="number" class="form-control" id="unitCost">
          </div>

          <div class="mb-3">
            <label for="notes" class="form-label">Notes/Memo</label>
            <textarea v-model="notes" class="form-control" id="notes" rows="4"></textarea>
          </div>
        </div>
      </div>

      <div class="row mb-5 d-print-none">
        <div class="col">
          <button type="submit" class="btn btn-primary btn-lg">{{ displayButtonText }}</button>
        </div>
      </div>
    </form>

    <div v-if="viewMode === ViewMode.Invoice">
      <div class="row">
        <div class="col">
          <h5 class="fw-bold">Bill From:</h5>
          <address v-html="formattedBillFrom">
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
          <address v-html="formattedBillTo">
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
                  {{ formattedDate }}
                </td>
              </tr>
              <tr class="table-secondary">
                <th scope="row">
                  Amount Due
                </th>
                <th scope="row">
                  {{ formattedTotal }}
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="row my-5">
        <div class="col">
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
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {{ item }}
                </td>
                <td>
                  {{ description }}
                </td>
                <td>
                  {{ quantity }}
                </td>
                <td>
                  {{ formattedUnitCost }}
                </td>
                <td>
                  {{ formattedTotal }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="row my-5">
        <div class="col">
          <h5 class="fw-bold">Notes/Memo</h5>
          <p v-html="formattedNotes"></p>
        </div>

        <div class="col">
          <table class="table table-borderless">
            <tbody>
              <tr class="table-secondary">
                <th scope="row">
                  Total
                </th>
                <th scope="row">
                  {{ formattedTotal }}
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
