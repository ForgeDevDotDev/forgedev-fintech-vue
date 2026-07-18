# ForgeDev Fintech (Vue)

> Banking dashboard + transactions — Vue 3 + Vite + TypeScript + Pinia

**Part of [ForgeDev](https://forgedev.dev)** — Structured work simulation for junior developers.

---

## 📜 License

This project is dual-licensed:

| Version | License | Use Case |
|---------|---------|----------|
| Community | AGPL-3.0 | Free for personal and open-source use. Network service modifications must be published. |
| Commercial | Commercial License | For organizations that want to use this project without AGPL obligations. Contact **info@forgedev.dev** |

See [LICENSE](./LICENSE), [COMMERCIAL-LICENSE.md](./COMMERCIAL-LICENSE.md), and [CLA.md](./CLA.md) for details.

---

## 🤝 Contributing

Contributions are welcome! Please read:

- [CONTRIBUTING.md](./CONTRIBUTING.md) — Contribution guide, revenue sharing model, and PR process
- [CLA.md](./CLA.md) — Contributor License Agreement (must sign before merging)

---

## 🏗 Project Structure

```
src/
├── api/
│   └── index.ts           # API client with all endpoints
├── stores/
│   ├── accounts.ts         # Account store
│   ├── transactions.ts     # Transaction store
│   └── budgets.ts          # Budget store
├── views/
│   ├── DashboardView.vue   # Account overview + balance
│   ├── TransactionsView.vue # Transaction table with pagination + filters
│   ├── TransferView.vue    # Transfer form
│   ├── BudgetsView.vue     # Budget list + charts
│   └── AuditLogView.vue    # Audit log viewer
├── components/
│   ├── TransactionTable.vue
│   ├── AccountCard.vue
│   ├── TransferForm.vue
│   ├── BudgetChart.vue
│   └── FilterBar.vue
├── router/
│   └── index.ts
├── types/
│   └── index.ts
├── assets/
│   └── main.css
├── App.vue
└── main.ts
```

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server (connects to backend at localhost:3000)
npm run dev
```

---

## 📊 Domain

**Fintech — Banking dashboard + transactions**

Features:
- Dashboard with account overview and balance cards
- Transaction feed with pagination, filtering, and sorting
- Transfer flow between accounts with form validation
- Budget analytics with visual charts
- Audit log viewer for compliance

---

## 🔗 Links

- **ForgeDev:** https://forgedev.dev
- **GitHub Org:** https://github.com/ForgeDevDotDev
- **Contact:** info@forgedev.dev

---

## 📁 Related Repositories

Part of the **Fintech** domain:

| Repo | Role |
|------|------|
| forgedev-fintech-backend | Backend API |
| forgedev-fintech-vue | Vue 3 frontend (this repo) |
| forgedev-fintech-react | React frontend |
