<template>
  <div class="audit-log-view">
    <h1>Registro de Auditoría</h1>

    <div class="card">
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Usuario</th>
            <th>Acción</th>
            <th>Entidad</th>
            <th>IP</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="log in auditLogs" :key="log.id">
            <!-- FIXME: inconsistent date formatting — using toLocaleString directly -->
            <td>{{ new Date(log.createdAt).toLocaleString() }}</td>
            <td>{{ log.user?.name || 'Sistema' }}</td>
            <td>{{ log.action }}</td>
            <td>{{ log.entity || '—' }}</td>
            <td>{{ log.ipAddress || '—' }}</td>
          </tr>
          <tr v-if="auditLogs.length === 0">
            <td colspan="5" class="text-center">No hay registros de auditoría</td>
          </tr>
        </tbody>
      </table>

      <div class="pagination">
        <button class="btn btn-secondary" :disabled="page <= 1" @click="changePage(page - 1)">
          ← Anterior
        </button>
        <span class="page-info">Página {{ page }}</span>
        <button class="btn btn-secondary" @click="changePage(page + 1)">
          Siguiente →
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import api from '@/api';
import type { AuditLog } from '@/types';

const auditLogs = ref<AuditLog[]>([]);
const page = ref(1);
const limit = ref(20);

const fetchLogs = async () => {
  try {
    const res = await api.getAuditLogs(page.value, limit.value);
    auditLogs.value = res.data.data;
  } catch (err) {
    console.error('Failed to fetch audit logs', err);
  }
};

const changePage = (newPage: number) => {
  page.value = newPage;
  fetchLogs();
};

onMounted(fetchLogs);
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
