import { defineStore } from 'pinia';
import type { Transaction } from '../types';
import api from '../api';

export const useTransactionsStore = defineStore('transactions', {
  state: () => ({
    transactions: [] as Transaction[],
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 1,
    loading: false,
    error: null as string | null,
    filters: {
      accountId: null as string | null,
      categoryId: null as string | null,
      startDate: null as string | null,
      endDate: null as string | null,
      status: null as string | null,
    },
  }),

  getters: {
    hasNextPage: (state) => state.page < state.totalPages,
    hasPrevPage: (state) => state.page > 1,
  },

  actions: {
    async fetchTransactions() {
      this.loading = true;
      this.error = null;
      try {
        const params: any = {
          page: this.page,
          limit: this.limit,
        };
        if (this.filters.accountId) params.accountId = this.filters.accountId;
        if (this.filters.categoryId) params.categoryId = this.filters.categoryId;
        if (this.filters.startDate) params.startDate = this.filters.startDate;
        if (this.filters.endDate) params.endDate = this.filters.endDate;
        if (this.filters.status) params.status = this.filters.status;

        const res = await api.getTransactions(params);
        this.transactions = res.data.data;
        this.total = res.data.pagination.total;
        this.totalPages = res.data.pagination.totalPages;
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch transactions';
        // FIXME: Should show a user-friendly error message
      } finally {
        this.loading = false;
      }
    },

    async createTransaction(data: Partial<Transaction>) {
      try {
        const res = await api.createTransaction(data);
        this.transactions.unshift(res.data);
        return res.data;
      } catch (err: any) {
        this.error = err.message || 'Failed to create transaction';
        throw err;
      }
    },

    async updateTransaction(id: string, data: Partial<Transaction>) {
      try {
        const res = await api.updateTransaction(id, data);
        const idx = this.transactions.findIndex(t => t.id === id);
        if (idx !== -1) this.transactions[idx] = res.data;
        return res.data;
      } catch (err: any) {
        this.error = err.message || 'Failed to update transaction';
        throw err;
      }
    },

    async deleteTransaction(id: string) {
      try {
        await api.deleteTransaction(id);
        this.transactions = this.transactions.filter(t => t.id !== id);
      } catch (err: any) {
        this.error = err.message || 'Failed to delete transaction';
        throw err;
      }
    },

    setFilter(key: string, value: string | null) {
      // BUG: Setting a filter doesn't reset to page 1
      // This means if you're on page 3 and change a filter,
      // you'll still be on page 3 of the new filtered results
      (this.filters as any)[key] = value;
    },

    setPage(page: number) {
      this.page = page;
    },

    resetFilters() {
      this.filters = {
        accountId: null,
        categoryId: null,
        startDate: null,
        endDate: null,
        status: null,
      };
      this.page = 1;
    },
  },
});
