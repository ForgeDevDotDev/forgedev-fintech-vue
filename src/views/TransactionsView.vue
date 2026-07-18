<template>
  <div class="transactions-view">
    <h1>Transacciones</h1>

    <FilterBar
      :filters="transactionsStore.filters"
      :accounts="accountsStore.accounts"
      :categories="categories"
      @filter-change="onFilterChange"
      @reset="onResetFilters"
    />

    <div class="card">
      <TransactionTable :transactions="transactionsStore.transactions" :loading="transactionsStore.loading" />

      <div class="pagination">
        <button
          class="btn btn-secondary"
          :disabled="!transactionsStore.hasPrevPage"
          @click="changePage(transactionsStore.page - 1)"
        >
          ← Anterior
        </button>
        <span class="page-info">
          Página {{ transactionsStore.page }} de {{ transactionsStore.totalPages }}
        </span>
        <button
          class="btn btn-secondary"
          :disabled="!transactionsStore.hasNextPage"
          @click="changePage(transactionsStore.page + 1)"
        >
          Siguiente →
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useTransactionsStore } from '@/stores/transactions';
import { useAccountsStore } from '@/stores/accounts';
import api from '@/api';
import TransactionTable from '@/components/TransactionTable.vue';
import FilterBar from '@/components/FilterBar.vue';
import type { Category } from '@/types';

const route = useRoute();
const transactionsStore = useTransactionsStore();
const accountsStore = useAccountsStore();
const categories = ref<Category[]>([]);

const onFilterChange = (key: string, value: string | null) => {
  transactionsStore.setFilter(key, value);
  // BUG: We should reset to page 1 when filters change
  // but setFilter doesn't do that, and we don't do it here either
  transactionsStore.fetchTransactions();
};

const onResetFilters = () => {
  transactionsStore.resetFilters();
  transactionsStore.fetchTransactions();
};

const changePage = (page: number) => {
  transactionsStore.setPage(page);
  transactionsStore.fetchTransactions();
};

onMounted(async () => {
  const accountId = route.query.accountId as string;
  if (accountId) {
    transactionsStore.setFilter('accountId', accountId);
  }

  // Fetch accounts for filter dropdown
  await accountsStore.fetchAccounts();

  // Fetch categories for filter dropdown
  try {
    const res = await api.getCategories();
    categories.value = res.data;
  } catch (err) {
    console.error('Failed to fetch categories', err);
  }

  // Fetch transactions
  await transactionsStore.fetchTransactions();
});
</script>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.page-info {
  font-size: 0.875rem;
  color: #666;
}
</style>
