import { defineStore } from 'pinia';
import type { Account } from '../types';
import api from '../api';

export const useAccountsStore = defineStore('accounts', {
  state: () => ({
    accounts: [] as Account[],
    currentAccount: null as Account | null,
    loading: false,
    error: null as string | null,
  }),

  getters: {
    totalBalance: (state) => state.accounts.reduce((sum, a) => sum + a.balance, 0),
    activeAccounts: (state) => state.accounts.filter(a => a.isActive),
    byType: (state) => (type: string) => state.accounts.filter(a => a.type === type),
  },

  actions: {
    async fetchAccounts(userId?: string) {
      this.loading = true;
      this.error = null;
      try {
        const res = await api.getAccounts(userId);
        this.accounts = res.data;
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch accounts';
      } finally {
        this.loading = false;
      }
    },

    async fetchAccount(id: string) {
      this.loading = true;
      this.error = null;
      try {
        const res = await api.getAccount(id);
        this.currentAccount = res.data;
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch account';
      } finally {
        this.loading = false;
      }
    },

    async createAccount(data: Partial<Account> & { initialBalance?: number }) {
      try {
        const res = await api.createAccount(data);
        this.accounts.push(res.data);
        return res.data;
      } catch (err: any) {
        this.error = err.message || 'Failed to create account';
        throw err;
      }
    },

    async updateAccount(id: string, data: Partial<Account>) {
      try {
        const res = await api.updateAccount(id, data);
        const idx = this.accounts.findIndex(a => a.id === id);
        if (idx !== -1) this.accounts[idx] = res.data;
        return res.data;
      } catch (err: any) {
        this.error = err.message || 'Failed to update account';
        throw err;
      }
    },

    async deleteAccount(id: string) {
      try {
        await api.deleteAccount(id);
        this.accounts = this.accounts.filter(a => a.id !== id);
      } catch (err: any) {
        this.error = err.message || 'Failed to delete account';
        throw err;
      }
    },

    clearError() {
      this.error = null;
    },
  },
});
