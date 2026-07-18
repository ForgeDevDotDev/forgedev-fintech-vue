<template>
  <div class="account-card" :class="{ inactive: !account.isActive }">
    <div class="account-header">
      <h3>{{ account.name }}</h3>
      <span class="badge" :class="account.type">{{ typeLabel }}</span>
    </div>
    <p class="iban">{{ account.iban }}</p>
    <p class="balance" :class="{ negative: account.balance < 0 }">
      {{ formatCents(account.balance) }}
    </p>
    <div class="account-footer">
      <span>{{ account.currency }}</span>
      <span>{{ account.type }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Account } from '@/types';
import { formatCents } from '@/utils/format';

const props = defineProps<{ account: Account }>();

const typeLabel = computed(() => {
  const labels: Record<string, string> = {
    checking: 'Corriente',
    savings: 'Ahorro',
    credit: 'Crédito',
  };
  return labels[props.account.type] || props.account.type;
});
</script>

<!-- NOTE: Using inline styles here instead of proper CSS classes -->
<style scoped>
.account-card {
  background: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  cursor: pointer;
  transition: box-shadow 0.2s;
  /* FIXME: Should use a CSS variable for shadow */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.account-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.account-card.inactive {
  opacity: 0.5;
}

.account-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.account-header h3 {
  margin: 0;
  font-size: 1.1rem;
}

.iban {
  font-size: 0.8rem;
  color: #999;
  margin-bottom: 1rem;
  font-family: monospace;
}

.balance {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.balance.negative {
  color: #d32f2f;
}

.account-footer {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #999;
}

.badge {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.badge.checking { background: #e3f2fd; color: #1565c0; }
.badge.savings { background: #e8f5e9; color: #2e7d32; }
.badge.credit { background: #fce4ec; color: #c62828; }
</style>
