# 🚀 Hostinger Production Deployment Guide: https://firstzonemarketing.com

This document provides step-by-step instructions for uploading **`frontend-hostinger.zip`** (Next.js Static Export) and **`laravel_api.zip`** (Laravel SQLite API) directly onto Hostinger shared hosting or hPanel.

---

## 📦 Deployment Packages

| ZIP Archive File | Size | Upload Destination on Hostinger | Description |
| :--- | :---: | :--- | :--- |
| **`frontend-hostinger.zip`** | **~1.9 MB** | `public_html/` | Pure static HTML/CSS/JS export containing `index.html`, `blogs.html`, `admin-leads.html`, `_next/`, `gallery/`, and static `.htaccess`. **Does NOT contain `index.php`**. |
| **`laravel_api.zip`** | **~8.0 MB** | `public_html/api/` | Production Laravel REST API with SQLite database, models, controllers, and vendor dependencies. |

---

## 🛠️ Step 1: Frontend Deployment (`frontend-hostinger.zip` -> `public_html/`)

1. Log in to **Hostinger hPanel** → Go to **Websites** → Select `firstzonemarketing.com` → Click **File Manager**.
2. Open the **`public_html/`** directory.
3. If there are default Hostinger files (e.g. `default.php`), delete them.
4. Upload **`frontend-hostinger.zip`** directly into `public_html/`.
5. Right-click **`frontend-hostinger.zip`** → Select **Extract** → Choose `public_html/`.
6. Delete `frontend-hostinger.zip` after extraction.

### Verification of `public_html/` Files:
Ensure `public_html/` contains these exact extracted files:
```text
public_html/
├── index.html            <-- Main Landing Page (184 KB)
├── blogs.html            <-- Public Blogs Listing Page (21 KB)
├── admin-leads.html      <-- Admin Command Deck Page (16 KB)
├── blog/                 <-- Static single blog detail pages
├── _next/                <-- Compiled CSS & JS bundles
├── gallery/              <-- Project flyer images
├── logo.jpg & icon.jpg   <-- Image assets
├── favicon.ico           <-- Site favicon
├── robots.txt            <-- Search crawler config
└── .htaccess             <-- Hostinger Pretty URL Rewrite Rules (NO index.php)
```

---

## 🛠️ Step 2: Backend Deployment (`laravel_api.zip` -> `public_html/api/`)

1. Open Hostinger **File Manager** → Open **`public_html/`**.
2. Create a folder named **`api`**.
3. Upload **`laravel_api.zip`** into `public_html/api/`.
4. Right-click **`laravel_api.zip`** → Select **Extract** → Choose `public_html/api/`.
5. Delete `laravel_api.zip` after extraction.

---

## ✅ Hostinger Verification Checklist

1. Open **`https://firstzonemarketing.com`**:
   - Renders the landing page (`index.html`) with 0 errors.
2. Open **`https://firstzonemarketing.com/blogs`**:
   - Renders the blog feed (`blogs.html`).
3. Open **`https://firstzonemarketing.com/admin-leads`**:
   - Renders the admin panel (`admin-leads.html`).
