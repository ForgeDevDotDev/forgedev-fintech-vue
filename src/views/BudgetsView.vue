<template>
  <div class="budgets-view">
    <h1>Presupuestos</h1>

    <!-- Missing loading state here — should show spinner when budgetsStore.loading -->
    <div v-if="budgetsStore.error" class="card">
      <p class="text-danger">Error: {{ budgetsStore.error }}</p>
    </div>

    <div class="budgets-grid">
      <div v-for="budget in budgetsStore.budgets" :key="budget.id" class="card">
        <BudgetChart :budget="budget" />
      </div>
    </div>

    <div v-if="budgetsStore.budgets.length === 0 && !budgetsStore.loading" class="card text-center">
      <p>No hay presupuestos creados.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useBudgetsStore } from '@/stores/budgets';
import BudgetChart from '@/components/BudgetChart.vue';

const budgetsStore = useBudgetsStore();

onMounted(() => {
  budgetsStore.fetchBudgets();
});
</script>

<style scoped>
.budgets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1rem;
}
</style>
