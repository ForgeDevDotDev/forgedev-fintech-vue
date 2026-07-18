<template>
  <div class="budget-chart">
    <div class="budget-header">
      <h3>{{ budget.category?.name || 'Categoría' }}</h3>
      <span class="period">{{ budget.period }}</span>
    </div>

    <div class="budget-amounts">
      <div>
        <span class="label">Gastado</span>
        <span class="amount spent">{{ formatCents(budget.spent || 0) }}</span>
      </div>
      <div>
        <span class="label">Límite</span>
        <span class="amount limit">{{ formatCents(budget.limit) }}</span>
      </div>
      <div>
        <span class="label">Restante</span>
        <span class="amount remaining" :class="{ over: (budget.remaining || 0) < 0 }">
          {{ formatCents(budget.remaining || 0) }}
        </span>
      </div>
    </div>

    <!-- Simple progress bar instead of a real chart library -->
    <!-- TODO: Add a proper chart library (e.g. Chart.js) -->
    <div class="progress-bar">
      <div
        class="progress-fill"
        :style="{
          width: Math.min(budget.percentage || 0, 100) + '%',
          background: (budget.percentage || 0) > 100 ? '#d32f2f' : (budget.percentage || 0) > 80 ? '#ff9800' : '#4caf50'
        }"
      />
    </div>

    <p class="percentage" :class="{ over: (budget.percentage || 0) > 100 }">
      {{ Math.round(budget.percentage || 0) }}% utilizado
    </p>
  </div>
</template>

<script setup lang="ts">
import type { Budget } from '@/types';
import { formatCents } from '@/utils/format';

defineProps<{ budget: Budget }>();
</script>

<style scoped>
.budget-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.budget-header h3 {
  margin: 0;
  font-size: 1.1rem;
}

.period {
  font-size: 0.75rem;
  color: #999;
  text-transform: uppercase;
}

.budget-amounts {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.budget-amounts > div {
  text-align: center;
}

.budget-amounts .label {
  display: block;
  font-size: 0.75rem;
  color: #999;
  margin-bottom: 0.25rem;
}

.budget-amounts .amount {
  display: block;
  font-weight: 600;
  font-size: 0.95rem;
}

.progress-bar {
  height: 8px;
  background: #eee;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  transition: width 0.3s ease;
  border-radius: 4px;
}

.percentage {
  font-size: 0.85rem;
  text-align: center;
  color: #666;
}

.percentage.over {
  color: #d32f2f;
  font-weight: 600;
}
</style>
