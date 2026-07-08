# CONTEXT.md — Alexa Computindo Group Frontend

> File ini berisi ringkasan lengkap project agar AI dapat memahami codebase tanpa harus scan menyeluruh.

---

## 1. Identitas Project

| Field | Value |
|-------|-------|
| **Nama** | alexa-computindo-group-v3 |
| **Deskripsi** | Company profile website untuk **PT. Alexa Computindo Group** — perusahaan teknologi yang menaungi 3 divisi: MediaKampung (media digital), InetMedia (ISP), dan WebMedia (software dev). |
| **Bahasa UI** | Indonesia |
| **Target Audiens** | Klien enterprise / korporasi |
| **Repo** | `https://github.com/NeoCode29/alexa-profile-frontend.git` |

---

## 2. Tech Stack

| Layer | Teknologi | Versi |
|-------|-----------|-------|
| **Framework** | React | 19.2.7 |
| **Build Tool** | Vite | 8.1.1 |
| **Routing** | react-router-dom | 7.18.1 |
| **Animasi** | framer-motion | 12.42.2 |
| **Icon Library** | react-icons | 5.7.0 (menggunakan `fa` — FontAwesome dan `fi` — Feather) |
| **Marquee** | react-fast-marquee | 1.6.5 (terinstall tapi saat ini **di-comment** di Home.jsx) |
| **Linter** | oxlint | 1.71.0 |
| **Styling** | CSS Modules (`.module.css`) + Global CSS |
| **Language** | JavaScript (JSX) — **bukan TypeScript** |
| **Package Manager** | npm |

### Scripts
```json
{
  "dev": "vite",
  "build": "vite build",
  "lint": "oxlint",
  "preview": "vite preview"
}
```

---

## 3. Struktur Direktori

```
frontend/
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   └── logo.png                 # Logo AG Group (dipakai di Navbar & Footer)
├── src/
│   ├── assets/
│   │   ├── hero.png             # Hero image asset
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── components/
│   │   └── layout/
│   │       ├── Layout.jsx           # Shell: Navbar + main + Footer + FloatingWA
│   │       ├── Navbar.jsx           # Sticky navbar, responsive hamburger menu
│   │       ├── Navbar.module.css
│   │       ├── Footer.jsx           # 4-column footer (brand, layanan, perusahaan, kontak)
│   │       ├── Footer.module.css
│   │       ├── FloatingWA.jsx       # Floating WhatsApp button (fixed bottom-right)
│   │       ├── FloatingWA.module.css
│   │       ├── PageTransition.jsx   # framer-motion page transition wrapper
│   │       └── (tidak ada file lain di components/)
│   ├── data/
│   │   └── mockData.js          # Semua data mock (services, clients, articles, team, dll)
│   ├── pages/
│   │   ├── Home.jsx             # Landing page
│   │   ├── Home.module.css
│   │   ├── About.jsx            # Tentang kami, sejarah, visi-misi, tim, laporan
│   │   ├── About.module.css
│   │   ├── Services.jsx         # Detail layanan + pricing packages + portfolio
│   │   ├── Services.module.css
│   │   ├── Blog.jsx             # Daftar artikel + search + filter kategori
│   │   ├── Blog.module.css
│   │   ├── Contact.jsx          # Form kontak + info + Google Maps + FAQ
│   │   ├── Contact.module.css
│   │   ├── Careers.jsx          # Budaya kerja + lowongan pekerjaan
│   │   └── Careers.module.css
│   ├── App.jsx                  # Root: BrowserRouter → Layout → AnimatedRoutes
│   ├── App.css                  # CSS sisa template Vite (sebagian besar tidak terpakai)
│   ├── index.css                # Global styles: design system, utilities, typography
│   └── main.jsx                 # Entry point: ReactDOM.createRoot
├── index.html                   # HTML shell
├── vite.config.js               # Vite config (hanya plugin react)
├── package.json
├── package-lock.json
├── .oxlintrc.json
├── .gitignore
└── README.md
```

---

## 4. Routing

Semua route didefinisikan di `App.jsx` menggunakan `react-router-dom` dengan `AnimatePresence` dari framer-motion:

| Path | Page Component | Deskripsi |
|------|---------------|-----------|
| `/` | `Home` | Landing page — hero, intro, services overview, clients marquee, articles |
| `/about` | `About` | Sejarah, visi-misi, tim manajemen, laporan tahunan |
| `/services` | `Services` | Detail 3 divisi + pricing + portfolio + testimonial |
| `/blog` | `Blog` | Daftar artikel dengan search & filter kategori |
| `/contact` | `Contact` | Form kontak, info kontak, Google Maps, FAQ |
| `/careers` | `Careers` | Budaya kerja, daftar lowongan |

> **Belum ada**: 404 page, detail artikel (`/blog/:id`), halaman detail layanan.

---

## 5. Design System

### Warna (CSS Variables di `index.css`)
```css
--color-white: #FFFFFF;
--color-dark: #1D2A35;      /* Primary dark — navbar, footer, teks utama */
--color-green: #3BAE7C;     /* Accent green — CTA, highlight, underline */
--color-light-gray: #F4F6F8; /* Body background */
--color-border: #E5E7EB;
```

### Font
- **Font utama**: `Roboto` (Google Fonts), weight: 300, 400, 500, 700, 900

### Gaya Visual Khas
- **Sharp/geometric**: Tidak ada border-radius (`border-radius: 0`). Semua elemen menggunakan class `.sharp-box`.
- **Diagonal sections**: Menggunakan `clip-path: polygon(...)` untuk efek diagonal antar section (`.clip-diagonal-bottom`, `.clip-diagonal-top`).
- **Triangle corner accent**: Class `.clip-triangle-corner` menambahkan segitiga hijau kecil di pojok kanan atas elemen.
- **Typography**: Semua heading `text-transform: uppercase` + `letter-spacing: 1px`.
- **Section title underline**: Bar hijau dengan clip-path segitiga di bawah judul section.

### Button Variants (class global)
| Class | Style |
|-------|-------|
| `.btn` | Base: uppercase, sharp corners, hover fill animation |
| `.btn-primary` | Background hijau, teks putih |
| `.btn-secondary` | Background dark, teks putih |
| `.btn-outline` | Border dark, transparan, hover fill dark |

### Utility Classes (global)
`.container`, `.text-center`, `.mt-4`, `.mb-4`, `.py-5`, `.section-title`, `.section-subtitle`

---

## 6. Data Layer (mockData.js)

Semua data saat ini adalah **hardcoded mock data** di `src/data/mockData.js`. Tidak ada API call.

| Export | Tipe | Jumlah | Dipakai di |
|--------|------|--------|-----------|
| `servicesData` | Array | 3 items | Home, (icon mapping manual) |
| `clientsData` | Array | 6 items | Home (marquee section) |
| `articlesData` | Array | 7 items | Home, Blog |
| `teamData` | Array | 3 items | About (tim manajemen) |
| `reportsData` | Array | 3 items | About (laporan tahunan) |
| `pricingPackages` | Object | 2 keys (`webmedia`: 3 tiers, `inetmedia`: 3 tiers) | Services |
| `portfolios` | Array | 3 items | Services |
| `testimonials` | Array | 2 items | Services |
| `careersData` | Array | 3 items | Careers |

### Gambar
- Foto-foto menggunakan **Unsplash URLs** (external).
- Logo klien menggunakan **Google Favicon API** (`google.com/s2/favicons`).
- Logo perusahaan: `/logo.png` (di public folder).

---

## 7. Komponen Layout

### Layout.jsx
Shell utama: `<Navbar /> + <main> + <Footer /> + <FloatingWA />`
- Main memiliki `paddingTop: 80px` (karena navbar fixed).
- `minHeight: 100vh`.

### Navbar.jsx
- Fixed top, background putih.
- Logo kiri → nav links tengah → CTA "Hubungi Kami" kanan.
- Responsive: hamburger menu (`FiMenu` / `FiX`) untuk mobile.
- Active link detection via `useLocation().pathname`.
- Menu items: Beranda, Tentang Kami, Layanan, Artikel, Karir.

### Footer.jsx
- Background dark, 4 kolom: Brand/logo, Layanan Kami, Perusahaan, Hubungi Kami.
- Social icons: Facebook, Instagram, LinkedIn (links `#` placeholder).
- Copyright bar di bawah.

### FloatingWA.jsx
- Fixed bottom-right WhatsApp button.
- Link ke `wa.me/6283870120901` dengan pesan template.

### PageTransition.jsx
- Wraps setiap page route dengan `motion.div`.
- Animation: fade + slide up (enter), fade + slide up (exit).
- Auto scroll-to-top on mount.

---

## 8. Detail Setiap Halaman

### Home.jsx
| Section | Deskripsi |
|---------|-----------|
| **Hero** | Full-width dark bg, diagonal bottom. Badge "#1 Tech Corporate". Headline + 2 CTA buttons. Triangle accent. |
| **Intro** | 2-column: image (Unsplash) + text dengan stats (8+ tahun, 99.9% uptime, 200+ klien). |
| **Services** | 3 service cards dari `servicesData`. Masing-masing memiliki icon, title, subtitle, link, nomor urut. |
| **Clients** | CSS-only infinite marquee (bukan react-fast-marquee). Data di-triple untuk efek infinite scroll. |
| **Articles** | Grid artikel dari `articlesData`. Dark bg, diagonal top. Header + "Lihat Semua" button. |

### About.jsx
| Section | Deskripsi |
|---------|-----------|
| **Hero** | Dark bg, diagonal. "TENTANG KAMI" heading. |
| **History** | 2-column: teks sejarah + timeline vertikal (2018, 2020, 2023). |
| **Vision/Mission** | 2 cards side-by-side: Visi + Misi (list items). |
| **Team** | 3 team member cards dari `teamData`. Hover overlay menampilkan bio. |
| **Reports** | Daftar 3 annual report dengan tombol download (non-functional). |

### Services.jsx
| Section | Deskripsi |
|---------|-----------|
| **Hero** | Dark bg, diagonal. |
| **WebMedia** | Label + heading + pricing 3 tiers (Standard/Premium/Enterprise). Portfolio grid (2 items). |
| **InetMedia** | Dark bg section. Pricing 3 tiers (SOHO/Business Pro/Corporate). |
| **MediaKampung** | Banner card dengan link ke `mediakampung.com`. |
| **Testimonials** | 2 testimonial cards. |

### Blog.jsx
| Section | Deskripsi |
|---------|-----------|
| **Hero** | Dark bg, "DATABASE ARTIKEL". |
| **Content** | 2-column layout: sidebar (search + category filter) + main content (article cards). |
| **Features** | Client-side search by title, category filter, static pagination (non-functional). |

### Contact.jsx
| Section | Deskripsi |
|---------|-----------|
| **Hero** | Dark bg, "HUBUNGI KAMI". |
| **Content** | 2-column: info boxes (alamat/telp/email) + Google Maps embed → form kontak. |
| **Form** | Fields: nama, email, subjek, detail. Submit shows `alert()`. |
| **FAQ** | 3 accordion items (toggle open/close). |

### Careers.jsx
| Section | Deskripsi |
|---------|-----------|
| **Hero** | Dark bg, "Karir di AG GROUP". |
| **Culture** | 2-column: teks + image (Unsplash). |
| **Jobs** | 3 job cards dari `careersData` (department, type, location, description). |

---

## 9. Pattern & Konvensi Kode

### Styling
- **CSS Modules** untuk setiap komponen (`styles.className`).
- **Global CSS** di `index.css` untuk design tokens dan utility classes.
- Class global (`.container`, `.btn`, `.sharp-box`, `.clip-*`, `.section-title`) di-mix dengan CSS module classes.

### Animasi
- Semua section menggunakan framer-motion `motion.div` dengan pattern:
  ```jsx
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  // ...
  <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
  ```
- Staggered children menggunakan `transition={{ delay: idx * 0.15 }}`.

### Data Flow
- Semua data di-import langsung dari `mockData.js` — tidak ada state management (Redux/Zustand/Context).
- Hanya `Blog.jsx` dan `Contact.jsx` yang punya local state (`useState`).

### Icon Mapping
- `Home.jsx` memiliki manual icon mapper function `getIcon(iconName)` yang map string → React component.

---

## 10. Kontak & Info Bisnis (Hardcoded)

| Info | Value |
|------|-------|
| **Nama perusahaan** | PT. Alexa Computindo Group |
| **Alamat** | Jl. Teknologi No. 45, Jakarta Selatan |
| **Telepon** | (021) 555-0198 |
| **Email** | info@alexagroup.com |
| **WhatsApp** | +62 838-7012-0901 |
| **Social Media** | Facebook, Instagram, LinkedIn (link placeholder `#`) |
| **Portal Media** | https://mediakampung.com |
| **Berdiri** | 2018 |

---

## 11. Yang Belum Diimplementasi / TODO

- [ ] **Backend integration** — semua data masih mock, tidak ada API call
- [ ] **Detail halaman artikel** — route `/blog/:id` belum ada
- [ ] **404 page** — tidak ada catch-all route
- [ ] **Pagination** — Blog memiliki UI pagination tapi non-functional
- [ ] **Form submission** — Contact form hanya `alert()`, belum terhubung backend
- [ ] **SEO** — title masih default "alexa-computindo-group-v3"
- [ ] **Social media links** — semua masih `href="#"`
- [ ] **Download report** — tombol download annual report belum functional
- [ ] **react-fast-marquee** — sudah terinstall tapi import di-comment, menggunakan CSS custom marquee sebagai gantinya
- [ ] **TypeScript** — project masih JS, ada `@types/react` di devDeps tapi tidak digunakan
- [ ] **Environment variables** — tidak ada `.env` file
- [ ] **Testing** — tidak ada test framework yang terinstall

---

## 12. Cara Menjalankan

```bash
cd alexa-profile/frontend
npm install
npm run dev          # Dev server di http://localhost:5173
npm run build        # Production build ke dist/
npm run preview      # Preview production build
npm run lint         # Jalankan oxlint
```
