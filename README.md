# DataHub Catalogue UI (React + Tailwind)

A lightweight React app that replicates a **DataHub-style** UI:

- ✅ Login screen
- ✅ Catalogue/Dashboard with left **category tree** and right **results table**
- ✅ **Dataset switching** (India & States ↔ Dataset – IMF)
- ✅ **Pagination** (10 rows per page)
- ✅ Performance optimizations for large JSON (IMF) using a **Web Worker**

---

## Demo Credentials

Use the following credentials to login:

- **Email:** `admin@demo.com`
- **Password:** `Admin@123`

> Authentication is demo-only (client-side) and intended for UI flow.

---

## Features

### 1) Login Page
- Clean login UI (similar to the provided reference image)
- Basic credential check
- Stores auth flag in `localStorage`

### 2) Catalogue/Dashboard
- **Top navbar** with search input (UI only), dataset switcher, and user avatar/logout
- **Sidebar**: dynamically renders categories from JSON
  - Lazy expansion: children nodes render only when expanded (keeps UI snappy)
- **Right pane**: table of frequent items

### 3) Pagination
- 10 records per page
- Simple Prev/Next controls and page status

### 4) Dataset Switching
- **India & States** → loads `src/data/response1.json`
- **Dataset – IMF** → loads `src/data/response2.json`

### 5) Performance for Large `response2.json`
- The IMF dataset is loaded on-demand and parsed in a **Web Worker**
- Prevents main-thread blocking and UI freezing
- Sidebar tree is lazily rendered on expand to avoid heavy upfront rendering

---

## Tech Stack

- **React** (Vite)
- **JavaScript**
- **Tailwind CSS**
- **React Router**
- **Web Worker** (for large JSON parse)
