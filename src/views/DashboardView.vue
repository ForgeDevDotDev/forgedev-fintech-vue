<template>
  <div class="dashboard">
    <h1>Panel Principal</h1>

    <div class="summary-cards">
      <div class="card">
        <h3>Balance Total</h3>
        <p class="balance">{{ formatCents(totalBalance) }}</p>
      </div>
      <div class="card">
        <h3>Cuentas Activas</h3>
        <p class="balance">{{ activeCount }}</p>
      </div>
      <div class="card">
        <h3>Transacciones del Mes</h3>
        <p class="balance">{{ monthlyTransactions.length }}</p>
      </div>
    </div>

    <h2>Mis Cuentas</h2>
    <div v-if="accountsStore.loading" class="card">
      <p>Cargando cuentas...</p>
    </div>
    <div v-else-if="accountsStore.error" class="card">
      <p class="text-danger">Error: {{ accountsStore.error }}</p>
    </div>
    <div v-else class="accounts-grid">
      <AccountCard
        v-for="account in accountsStore.accounts"
        :key="account.id"
        :account="account"
        @click="goToAccount(account.id)"
      />
    </div>

    <h2 class="mt-3">Transacciones Recientes</h2>
    <div class="card">
      <TransactionTable :transactions="recentTransactions" :compact="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAccountsStore } from '@/stores/accounts';
import { useTransactionsStore } from '@/stores/transactions';
import AccountCard from '@/components/AccountCard.vue';
import TransactionTable from '@/components/TransactionTable.vue';
import { formatCents } from '@/utils/format';

const router = useRouter();
const accountsStore = useAccountsStore();
const transactionsStore = useTransactionsStore();

const recentTransactions = computed(() => transactionsStore.transactions.slice(0, 5));
const totalBalance = computed(() => accountsStore.totalBalance);
const activeCount = computed(() => accountsStore.activeAccounts.length);

const monthlyTransactions = computed(() => {
  const now = new Date();
  return transactionsStore.transactions.filter(t => {
    const date = new Date(t.date);
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  });
});

const goToAccount = (id: string) => {
  router.push(`/transactions?accountId=${id}`);
};

onMounted(async () => {
  // FIXME: Should handle errors individually
  await accountsStore.fetchAccounts();
  await transactionsStore.fetchTransactions();
});
</script>

<style scoped>
.dashboard h1 {
  margin-bottom: 1.5rem;
}

.summary-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.summary-cards .card {
  margin-bottom: 0;
}

.balance {
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 0.5rem;
}

.accounts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}
</style>
