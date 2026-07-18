<template>
  <form @submit.prevent="onSubmit" class="transfer-form">
    <div class="form-group">
      <label for="fromAccount">Cuenta Origen</label>
      <select id="fromAccount" v-model="form.fromAccountId" required>
        <option value="">Selecciona una cuenta</option>
        <option v-for="acc in accounts" :key="acc.id" :value="acc.id">
          {{ acc.name }} ({{ formatCents(acc.balance) }})
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="toAccount">Cuenta Destino</label>
      <select id="toAccount" v-model="form.toAccountId" required>
        <option value="">Selecciona una cuenta</option>
        <option v-for="acc in accounts" :key="acc.id" :value="acc.id">
          {{ acc.name }} ({{ formatCents(acc.balance) }})
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="amount">Importe (€)</label>
      <input
        id="amount"
        v-model="amountInput"
        type="number"
        step="0.01"
        min="0"
        required
        placeholder="0.00"
      />
    </div>

    <div class="form-group">
      <label for="description">Descripción</label>
      <input
        id="description"
        v-model="form.description"
        type="text"
        placeholder="Concepto de la transferencia"
      />
    </div>

    <p v-if="error" style="color: #d32f2f; margin-bottom: 1rem;">{{ error }}</p>

    <div class="form-actions">
      <button type="submit" class="btn btn-primary" :disabled="loading">
        {{ loading ? 'Procesando...' : 'Transferir' }}
      </button>
      <button type="button" class="btn btn-secondary" @click="$emit('cancel')">Cancelar</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Account } from '@/types';
import { formatCents } from '@/utils/format';

const props = defineProps<{
  accounts: Account[];
  loading?: boolean;
}>();

const emit = defineEmits<{
  submit: [data: { fromAccountId: string; toAccountId: string; amount: number; description?: string }];
  cancel: [];
}>();

const form = ref({
  fromAccountId: '',
  toAccountId: '',
  description: '',
});

const amountInput = ref('');
const error = ref('');

const onSubmit = () => {
  error.value = '';

  if (!form.value.fromAccountId || !form.value.toAccountId) {
    error.value = 'Selecciona ambas cuentas';
    return;
  }

  if (form.value.fromAccountId === form.value.toAccountId) {
    error.value = 'Las cuentas deben ser diferentes';
    return;
  }

  const amount = Math.round(parseFloat(amountInput.value) * 100);
  if (isNaN(amount) || amount <= 0) {
    error.value = 'Introduce un importe válido';
    return;
  }

  // TODO: Check if source account has sufficient balance

  emit('submit', {
    fromAccountId: form.value.fromAccountId,
    toAccountId: form.value.toAccountId,
    amount,
    description: form.value.description || undefined,
  });
};

// Reset form after successful submit
watch(() => props.loading, (loading, wasLoading) => {
  if (wasLoading && !loading) {
    form.value = { fromAccountId: '', toAccountId: '', description: '' };
    amountInput.value = '';
  }
});
</script>

<!-- FIXME: Should use CSS classes, not inline styles -->
<style scoped>
.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}
</style>
