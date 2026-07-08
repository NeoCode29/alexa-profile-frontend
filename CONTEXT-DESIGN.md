# CONTEXT-DESIGN.md — Style Design & System Design Analysis
> Dokumen ini menganalisis secara mendalam **Style Design** (estetika visual, desain token, filosofi UI/UX) dan **System Design** (arsitektur komponen, manajemen state, pola rendering, dan skalabilitas teknis) dari frontend **PT. Alexa Computindo Group (AG Group)**.
---
## 1. Style Design Analysis (Visual Aesthetics & UI/UX)
Desain frontend AG Group mengusung konsep **"Strict Corporate Geometric"** — memadukan kewibawaan korporasi enterprise teknologi dengan sentuhan modernisme futuristik yang tegas dan tajam.
### 1.1. Color Philosophy & Tokens
Palet warna dirancang dengan kontras tinggi untuk memisahkan hierarki informasi secara jelas antara identitas brand, latar belakang, dan aksi utama (CTA).
| Token Variable | Hex Code | Penggunaan Visual & Psikologi Warna |
|---|---|---|
| `--color-dark` | `#1D2A35` | **Primary Brand / Authority**: Dipakai pada Navbar, Footer, latar belakang Hero section, dan teks utama. Memberikan kesan kokoh, aman, dan berwibawa. |
| `--color-green` | `#3BAE7C` | **Accent / Action / Innovation**: Warna hijau khas AG Group. Dipakai untuk tombol CTA, highlight teks, badge, dan aksen segitiga. Melambangkan pertumbuhan dan inovasi digital. |
| `--color-light-gray` | `#F4F6F8` | **Background Canvas**: Latar belakang utama aplikasi yang lembut agar mata pengguna tidak cepat lelah saat membaca teks padat. |
| `--color-border` | `#E5E7EB` | **Structural Divider**: Garis pembatas kartu, section, dan tabel dengan kontras halus. |
| `--color-white` | `#FFFFFF` | **Pure Contrast**: Warna teks di atas latar gelap serta warna dasar kartu konten (`.pricingCard`, `.serviceCard`). |
---
### 1.2. Shape Language: The Geometric / Sharp Motif
Ciri khas paling dominan dari antarmuka ini adalah **penolakan total terhadap sudut membulat (*border-radius: 0*)**. Semua elemen distandarisasi untuk memiliki sudut tajam 90 derajat atau potongan diagonal/segitiga.
1. **Strict Zero Border-Radius (`.sharp-box`)**:
   Semua tombol, kartu layanan, input form, dan kontainer menerapkan `border-radius: 0`. Ini secara konsisten merefleksikan logo perusahaan yang berbentuk segitiga tajam.
2. **Diagonal Section Clipping (`.clip-diagonal-*`)**:
   Transisi antar section tidak menggunakan garis lurus biasa, melainkan dipotong miring menggunakan CSS `clip-path: polygon(...)`:
   - `.clip-diagonal-bottom`: `polygon(0 0, 100% 0, 100% calc(100% - 5vw), 0 100%)`
   - `.clip-diagonal-top`: `polygon(0 5vw, 100% 0, 100% 100%, 0 100%)`
3. **Angular Badges & Underlines**:
   - Badge popular pada pricing card (`.popularBadge`) dan label header section (`.headerLabel`) dipotong miring pada sisi kanannya: `clip-path: polygon(0 0, 95% 0, 100% 50%, 95% 100%, 0 100%)`.
   - Garis bawah judul section (`.section-title::after`) dibentuk seperti anak panah/segitiga memanjang.
4. **Solid Offset Shadows**:
   Bayangan elemen tidak menggunakan drop-shadow blur yang lembut, melainkan *solid offset shadow* (contoh: `box-shadow: 10px 10px 0px rgba(29, 42, 53, 0.1)`). Ini menciptakan dimensi arsitektural yang tegas (*brutalist-inspired corporate UI*).
---
### 1.3. Typography System
Menggunakan font tunggal **Roboto** dari Google Fonts yang sangat teroptimasi untuk keterbacaan di layar digital dari resolusi kecil hingga layar monitor enterprise.
- **Headings (`h1` - `h6`, `.section-title`)**: Selalu menggunakan `text-transform: uppercase`, font-weight `700` atau `900`, dan `letter-spacing: 1px` hingga `4px`. Menghasilkan tampilan yang tegas dan mudah di-scan oleh eksekutif/klien bisnis.
- **Body Text**: Line-height `1.6` dengan font-weight `300` atau `400`, berwarna `#64748B` atau `#94A3B8` untuk memberi kontras visual yang baik dengan judul utama.
---
### 1.4. Micro-interactions & Animations
Interaksi visual dirancang cepat (< 0.6 detik) dan responsif untuk memberi umpan balik instan kepada pengguna:
- **Button Hover Effect (`.btn`)**: Menggunakan pseudo-element `::before` yang bergeser dari kanan ke kiri (`transform: scaleX(0)` menjadi `scaleX(1)`) untuk memberi efek sapuan warna yang dinamis saat cursor mendekat.
- **Card Lift (`.pricingCard:hover`)**: Kartu terangkat ke atas (`translateY(-5px)`) disertai munculnya solid shadow, memberikan kesan taktil/dapat diklik.
- **Nav Links Underline**: Garis hijau di bawah menu navigasi berkembang dari lebar `0` ke `100%` saat di-hover atau aktif.
- **Page Transitions & Scroll Animations**: Menggunakan **Framer Motion**.
  - Masuk/keluar halaman: Fade & slide vertikal 20px dalam waktu `0.3s`.
  - Section reveal: Varian `fadeUp` (opacity dari 0 ke 1, Y dari 50 ke 0 dalam `0.6s`) dipicu saat elemen masuk ke viewport (`whileInView`).
---
## 2. System Design Analysis (Architecture & Engineering)
Secara arsitektural, aplikasi ini dibangun sebagai **Client-Side Single Page Application (SPA)** menggunakan ekosistem modern **React 19 + Vite 8**.
```
+-------------------------------------------------------------------------+
|                         App.jsx (Router Root)                           |
+-------------------------------------------------------------------------+
                                     |
                                     v
+-------------------------------------------------------------------------+
|                     Layout.jsx (Persistent Shell)                       |
|  +-------------------------------------------------------------------+  |
|  | Navbar (Sticky Top)   |   main (Page Content)  |   Footer & WA    |  |
|  +-------------------------------------------------------------------+  |
+-------------------------------------------------------------------------+
                                     |
                                     v
+-------------------------------------------------------------------------+
|                  AnimatedRoutes & AnimatePresence                       |
|  +-------------------------------------------------------------------+  |
|  | PageTransition Wrapper (Scroll to top + Motion lifecycle)         |  |
|  |  +---------+  +---------+  +----------+  +------+  +-----------+  |  |
|  |  |  Home   |  |  About  |  | Services |  | Blog |  |  Contact  |  |  |
|  |  +---------+  +---------+  +----------+  +------+  +-----------+  |  |
|  +-------------------------------------------------------------------+  |
+-------------------------------------------------------------------------+
                                     |
                                     v
+-------------------------------------------------------------------------+
|             Data Layer: src/data/mockData.js (Decoupled Store)          |
+-------------------------------------------------------------------------+
```
### 2.1. Component Hierarchy & Layout Patterns
1. **Persistent Shell Pattern**:
   `Layout.jsx` membungkus seluruh aplikasi. `Navbar`, `Footer`, dan `FloatingWA` di-render sekali dan tidak pernah di-unmount saat navigasi rute terjadi.
   - Karena Navbar bersifat fixed (`height: 80px`), tag `<main>` diberikan kompensasi `paddingTop: '80px'` dan `minHeight: '100vh'` agar konten halaman tidak tertutup dan footer selalu terdorong ke bawah layar.
2. **Animation Lifecycle Pattern**:
   Komponen `AnimatedRoutes` memisahkan logika routing dari komponen utama agar `AnimatePresence` dari framer-motion dapat melacak properti `key={location.pathname}`. Ketika rute berubah, halaman lama menyelesaikan animasi *exit* terlebih dahulu sebelum halaman baru memulai animasi *enter*.
3. **Scroll Resetting**:
   Setiap navigasi dibungkus oleh `<PageTransition>`, yang mengeksekusi `window.scrollTo(0, 0)` pada `useEffect` mount. Ini mengatasi masalah klasik SPA di mana posisi scroll halaman sebelumnya tertinggal di halaman baru.
---
### 2.2. State Management & Data Flow Architecture
1. **Zero-Global-State Paradigm**:
   Aplikasi tidak menggunakan *state manager* global seperti Redux, Zustand, atau React Context. Hal ini **sangat tepat untuk saat ini** karena aplikasi bersifat *read-heavy content profile* tanpa autentikasi user atau keranjang belanja.
2. **Decoupled Mock Data Layer**:
   Seluruh konten dinamis dipisahkan secara rapi ke dalam `src/data/mockData.js`. Komponen presentasional (Home, About, Services) bertindak sebagai *pure consumer* yang mengimpor data secara statis.
   - **Keuntungan Arsitektural**: Ketika backend API (REST/GraphQL) siap, developer cukup mengganti import statis dengan custom hook fetcher (contoh: `useQuery`/`useEffect`) di tingkat komponen halaman tanpa mengubah struktur presentasi visual sama sekali.
3. **Isolated Local State**:
   State lokal (`useState`) dikurung secara ketat di tempat yang membutuhkan interaktifitas langsung:
   - `Blog.jsx`: Mengelola state `searchTerm` dan `activeCategory` untuk real-time in-memory array filtering.
   - `Contact.jsx`: Mengelola state `formData` untuk input kontrol dan `activeFaq` untuk akordion FAQ (hanya 1 FAQ yang terbuka dalam satu waktu).
   - `Navbar.jsx`: Mengelola state `isOpen` untuk menu drawer mobile.
---
### 2.3. Styling Architecture (CSS Modules + Global Tokens)
Menerapkan pendekatan **Hybrid Styling**:
- **Global Tokens & Primitives (`index.css`)**: Mendefinisikan CSS Variables (`--color-*`), normalisasi DOM, utility classes lintas halaman (`.container`, `.btn-*`, `.sharp-box`), serta aturan clip-path diagonal.
- **Scoped Component Styles (`*.module.css`)**: Setiap komponen halaman dan layout memiliki file CSS Module terdedikasi.
  - **Mengapa ini solid**: Menghindari polusi global class names dan bentrokan CSS spesifisitas. Vite secara otomatis memvalidasi dan mengenkripsi class name saat proses build (contoh: `Home_hero__a8x9d`).
  - Tidak ada *runtime overhead* seperti Styled Components / Emotion, sehingga rendering browser sangat cepat dan bundle CSS bisa di-extract dengan sempurna oleh Vite.
---
### 2.4. Performance, Scalability & Technical Debt Analysis
| Aspek | Evaluasi Kondisi Saat Ini | Rekomendasi Peningkatan (Roadmap) |
|---|---|---|
| **Bundle Size & Loading** | Semua rute (`Home`, `About`, `Services`, dll) di-import secara sinkron di `App.jsx`. Ini menyebabkan seluruh JavaScript aplikasi diunduh pada initial load (Monolithic Bundle). | **Implementasi Code Splitting**: Gunakan `React.lazy()` dan `<Suspense>` untuk memecah bundle per rute halaman, sehingga initial load time dan Time to Interactive (TTI) jauh lebih cepat. |
| **DOM Performance (Marquee)** | Di `Home.jsx`, logo klien di-render 3 kali lipat dalam satu array (`[...clientsData, ...clientsData, ...clientsData]`) untuk menciptakan animasi marquee CSS. | **Optimasi Marquee**: Gunakan library `react-fast-marquee` (yang sudah ada di `package.json` namun di-comment) karena menggunakan teknik clone DOM yang lebih efisien dan mendukung pause-on-hover. |
| **SEO & Meta Tags** | Sebagai SPA statis, semua halaman berbagi satu tag `<title>` dan tidak memiliki meta tags spesifik per halaman di HTML shell. | **Dynamic SEO**: Integrate library seperti `react-helmet-async` untuk mengubah Title, Meta Description, dan OpenGraph tags secara dinamis di setiap rute untuk keperluan indexing mesin pencari. |
| **Type Safety** | Proyek ditulis murni dengan JavaScript (`.jsx`), meskipun `@types/react` tersedia di `devDependencies`. | **Migrasi ke TypeScript (`.tsx`)**: Menambahkan interface untuk skema data di `mockData.js`, props komponen, dan state form untuk mencegah runtime error di masa skala enterprise. |
| **Asset Optimization** | Gambar masih bergantung pada URL eksternal (Unsplash & Google Favicon). | **Self-Hosted / CDN Asset Optimization**: Unduh dan konversi gambar ke format WebP/AVIF di folder `public/` atau layani melalui CDN dengan kompresi otomatis agar terhindar dari *broken links* eksternal. |
---
## 3. Kesimpulan & Penilaian Akhir
Desain frontend AG Group adalah contoh eksekusi yang **sangat kuat dari segi konsistensi visual dan pemisahan perhatian (separation of concerns)**.
- **Desain Visual** berhasil menyampaikan identitas *tech enterprise* melalui ketegasan bentuk geometri tajam (0 border-radius, clip-path diagonal) dan palet warna korporat yang berwibawa.
- **System Design** sangat bersih dari kerumitan yang tidak perlu (no over-engineering). Penggunaan CSS Modules dipadukan dengan Vite dan arsitektur data statis yang terisolasi menjadikan codebase ini **sangat mudah dipelihara (maintainable)** dan siap untuk diintegrasikan dengan backend nyata kapan pun dibutuhkan.