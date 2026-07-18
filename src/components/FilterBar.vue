<template>
  <div class="filter-bar">
    <div class="filter-group">
      <label>Cuenta</label>
      <select :value="filters.accountId || ''" @change="onAccountChange">
        <option value="">Todas</option>
        <option v-for="acc in accounts" :key="acc.id" :value="acc.id">{{ acc.name }}</option>
      </select>
    </div>

    <div class="filter-group">
      <label>Categoría</label>
      <select :value="filters.categoryId || ''" @change="onCategoryChange">
        <option value="">Todas</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
      </select>
    </div>

    <div class="filter-group">
      <label>Estado</label>
      <select :value="filters.status || ''" @change="onStatusChange">
        <option value="">Todos</option>
        <option value="completed">Completado</option>
        <option value="pending">Pendiente</option>
        <option value="failed">Fallido</option>
      </select>
    </div>

    <div class="filter-group">
      <label>Desde</label>
      <input type="date" :value="filters.startDate || ''" @input="onStartDateChange" />
    </div>

    <div class="filter-group">
      <label>Hasta</label>
      <input type="date" :value="filters.endDate || ''" @input="onEndDateChange" />
    </div>

    <button class="btn btn-secondary" @click="$emit('reset')">Limpiar filtros</button>
  </div>
</template>

<script setup lang="ts">
import type { Account, Category } from '@/types';

const props = defineProps<{
  filters: {
    accountId: string | null;
    categoryId: string | null;
    startDate: string | null;
    endDate: string | null;
    status: string | null;
  };
  accounts: Account[];
  categories: Category[];
}>();

const emit = defineEmits<{
  'filter-change': [key: string, value: string | null];
  'reset': [];
}>();

const onAccountChange = (e: Event) => {
  const val = (e.target as HTMLSelectElement).value;
  emit('filter-change', 'accountId', val || null);
};

const onCategoryChange = (e: Event) => {
  const val = (e.target as HTMLSelectElement).value;
  emit('filter-change', 'categoryId', val || null);
};

const onStatusChange = (e: Event) => {
  const val = (e.target as HTMLSelectElement).value;
  emit('filter-change', 'status', val || null);
};

const onStartDateChange = (e: Event) => {
  const val = (e.target as HTMLInputElement).value;
  emit('filter-change', 'startDate', val || null);
};

const onEndDateChange = (e: Event) => {
  const val = (e.target as HTMLInputElement).value;
  emit('filter-change', 'endDate', val || null);
};
</script>

<style scoped>
.filter-bar {
  display: flex;
  gap: 1rem;
  align-items: flex-end;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.filter-group label {
  font-size: 0.75rem;
  color: #666;
  font-weight: 600;
}

.filter-group select,
.filter-group input {
  padding: 0.4rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.875rem;
}
</style>
