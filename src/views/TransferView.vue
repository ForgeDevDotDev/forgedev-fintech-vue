<template>
  <div class="transfer-view">
    <h1>Transferencia</h1>

    <div class="card">
      <TransferForm
        :accounts="accountsStore.accounts"
        :loading="loading"
        @submit="onSubmit"
        @cancel="onCancel"
      />
    </div>

    <h2 class="mt-3">Transferencias Recientes</h2>
    <div class="card">
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Origen</th>
            <th>Destino</th>
            <th class="text-right">Importe</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="t in transfers" :key="t.id">
            <td>{{ t.createdAt.split('T')[0] }}</td>
            <td>{{ t.fromAccount?.name || '—' }}</td>
            <td>{{ t.toAccount?.name || '—' }}</td>
            <td class="text-right">{{ formatCents(t.amount) }}</td>
            <td>
              <span class="badge" :class="statusClass(t.status)">{{ t.status }}</span>
            </td>
          </tr>
          <tr v-if="transfers.length === 0">
            <td colspan="5" class="text-center">No hay transferencias</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAccountsStore } from '@/stores/accounts';
import TransferForm from '@/components/TransferForm.vue';
import api from '@/api';
import type { Transfer } from '@/types';
import { formatCents } from '@/utils/format';

const router = useRouter();
const accountsStore = useAccountsStore();
const transfers = ref<Transfer[]>([]);
const loading = ref(false);

const onSubmit = async (data: { fromAccountId: string; toAccountId: string; amount: number; description?: string }) => {
  loading.value = true;
  try {
    const res = await api.createTransfer(data);
    transfers.value.unshift(res.data);
    // Refresh accounts to show updated balances
    await accountsStore.fetchAccounts();
    // TODO: Show success toast
  } catch (err: any) {
    // FIXME: Should show error to user, not just console.error
    console.error('Transfer failed', err);
  } finally {
    loading.value = false;
  }
};

const onCancel = () => {
  router.push('/');
};

const statusClass = (status: string) => {
  if (status === 'completed') return 'badge-success';
  if (status === 'pending') return 'badge-warning';
  return 'badge-danger';
};

onMounted(async () => {
  await accountsStore.fetchAccounts();
  try {
    const res = await api.getTransfers();
    transfers.value = res.data;
  } catch (err) {
    console.error('Failed to fetch transfers', err);
  }
});
</script>
