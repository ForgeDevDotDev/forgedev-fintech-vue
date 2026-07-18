import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('@/views/DashboardView.vue'),
  },
  {
    path: '/transactions',
    name: 'transactions',
    component: () => import('@/views/TransactionsView.vue'),
  },
  {
    path: '/transfer',
    name: 'transfer',
    component: () => import('@/views/TransferView.vue'),
  },
  {
    path: '/budgets',
    name: 'budgets',
    component: () => import('@/views/BudgetsView.vue'),
  },
  {
    path: '/audit-logs',
    name: 'audit-logs',
    component: () => import('@/views/AuditLogView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
