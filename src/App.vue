<template>
  <div id="app">
    <nav class="navbar">
      <router-link to="/">Dashboard</router-link>
      <router-link to="/transactions">Transacciones</router-link>
      <router-link to="/transfer">Transferir</router-link>
      <router-link to="/budgets">Presupuestos</router-link>
      <router-link to="/audit-logs">Auditoría</router-link>
    </nav>
    <main class="container">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
// App shell
</script>
