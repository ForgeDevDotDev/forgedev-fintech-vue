<template>
  <div class="transaction-table-wrapper">
    <div v-if="loading" class="loading">
      <p>Cargando transacciones...</p>
    </div>
    <table v-else>
      <thead>
        <tr>
          <th v-if="!compact">Cuenta</th>
          <th>Fecha</th>
          <th>Descripción</th>
          <th v-if="!compact">Comercio</th>
          <th>Categoría</th>
          <th class="text-right">Importe</th>
          <th v-if="!compact">Estado</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tx in transactions" :key="tx.id">
          <td v-if="!compact">{{ tx.account?.name || '—' }}</td>
          <!-- FIXME: inconsistent date formatting — should use a shared formatter -->
          <td>{{ new Date(tx.date).toLocaleDateString('es-ES') }}</td>
          <td>{{ tx.description }}</td>
          <td v-if="!compact">{{ tx.merchant || '—' }}</td>
          <td>
            <span
              v-if="tx.category"
              class="category-badge"
              :style="{ background: tx.category.color || '#ccc', color: '#fff' }"
            >
              {{ tx.category.name }}
            </span>
            <span v-else>—</span>
          </td>
          <td class="text-right" :class="{ 'text-danger': tx.amount < 0, 'text-success': tx.amount > 0 }">
            {{ formatCents(tx.amount) }}
          </td>
          <td v-if="!compact">
            <span class="badge" :class="statusClass(tx.status)">{{ tx.status }}</span>
          </td>
        </tr>
        <tr v-if="transactions.length === 0 && !loading">
          <td :colspan="compact ? 4 : 6" class="text-center">No hay transacciones</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { Transaction } from '@/types';
import { formatCents } from '@/utils/format';

defineProps<{
  transactions: Transaction[];
  loading?: boolean;
  compact?: boolean;
}>();

const statusClass = (status: string) => {
  if (status === 'completed') return 'badge-success';
  if (status === 'pending') return 'badge-warning';
  return 'badge-danger';
};
</script>

<style scoped>
.loading {
  padding: 2rem;
  text-align: center;
  color: #999;
}

.category-badge {
  display: inline-block;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}
</style>
