import { defineStore } from 'pinia';
import type { Budget } from '../types';
import api from '../api';

export const useBudgetsStore = defineStore('budgets', {
  state: () => ({
    budgets: [] as Budget[],
    loading: false,
    error: null as string | null,
  }),

  getters: {
    totalBudget: (state) => state.budgets.reduce((sum, b) => sum + b.limit, 0),
    totalSpent: (state) => state.budgets.reduce((sum, b) => sum + (b.spent || 0), 0),
    overBudget: (state) => state.budgets.filter(b => (b.percentage || 0) > 100),
  },

  actions: {
    async fetchBudgets(accountId?: string) {
      this.loading = true;
      this.error = null;
      try {
        const res = await api.getBudgets(accountId);
        this.budgets = res.data;
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch budgets';
      } finally {
        this.loading = false;
      }
    },

    async createBudget(data: Partial<Budget>) {
      try {
        const res = await api.createBudget(data);
        this.budgets.push(res.data);
        return res.data;
      } catch (err: any) {
        this.error = err.message || 'Failed to create budget';
        throw err;
      }
    },

    async updateBudget(id: string, data: Partial<Budget>) {
      try {
        const res = await api.updateBudget(id, data);
        const idx = this.budgets.findIndex(b => b.id === id);
        if (idx !== -1) this.budgets[idx] = res.data;
        return res.data;
      } catch (err: any) {
        this.error = err.message || 'Failed to update budget';
        throw err;
      }
    },

    async deleteBudget(id: string) {
      try {
        await api.deleteBudget(id);
        this.budgets = this.budgets.filter(b => b.id !== id);
      } catch (err: any) {
        this.error = err.message || 'Failed to delete budget';
        throw err;
      }
    },
  },
});
