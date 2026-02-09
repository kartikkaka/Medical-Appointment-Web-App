# MediPortal - Frontend-only Patient Portal

This repository contains a frontend-only React implementation of a healthcare appointment & records portal. It uses mock APIs (localStorage + simulated latency) and React Query for caching.

Demo credentials:
- email: patient@test.com
- password: 123456

Run locally:

```bash
npm install
npm run dev
```

Run tests:

```bash
npm run test
```

Notes:
- No backend required; all data is persisted in localStorage.
- Uses React Router v7-compatible APIs and lazy-loading.
- Accessibility: forms include ARIA labels and focus management in the booking wizard.
