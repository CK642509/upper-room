# Upper Room

**Upper Room** 是一個位於台北的共居空間預訂平台，為尋找高品質住宿的外籍人士和本地居民提供服務。本專案採用現代化的 Nuxt 4 框架建構，內容由 Sanity CMS 管理，提供房間瀏覽、活動資訊等功能。

## ✨ 專案特色

- 🎬 **影片 Hero** - 首頁以循環播放的背景影片開場（外部託管，未設定時顯示靜態圖）
- 🏠 **房間展示** - 依台北行政區分組的房間列表，支援入住／退租日期篩選與分頁
- 🗺️ **區域地圖** - 房間詳細頁以 Google Map 圓圈標示大致區域（不揭露精確地址）
- 📅 **社群活動** - 即將舉辦與過往活動的展示
- 📝 **Sanity CMS** - 房間、地區、活動內容皆由 Sanity 管理，透過 GROQ 查詢
- 🔍 **SEO 友善** - 每頁動態 meta 標籤（Open Graph）、canonical 網址、自動產生 sitemap
- 🎨 **現代化 UI** - 使用 Tailwind CSS 與自訂設計系統
- 📱 **響應式設計** - Mobile-first，完美適配各種裝置

## 🚀 快速開始

### 環境需求

- Node.js 18+
- npm 或 yarn

### 安裝步驟

1. **複製專案**

```bash
git clone https://github.com/CK642509/upper-room.git
cd upper-room
```

2. **安裝相依套件**

```bash
npm install
```

3. **設定環境變數**

```bash
cp .env.example .env
```

`SANITY_DATASET` 控制網站讀取的資料集（`development` = 測試資料、`production` = 正式資料）。`NUXT_PUBLIC_GOOGLE_MAPS_KEY` 是房間詳細頁區域地圖用的 Google Maps JavaScript API 金鑰（留空時地圖顯示為佔位區塊；金鑰請務必設定 HTTP referrer 與 API 限制）。`NUXT_PUBLIC_HERO_VIDEO_URL` 是首頁 Hero 背景影片的網址（影片託管於外部儲存空間如 Cloudflare R2，不進 git repo；留空時 Hero 顯示靜態圖 `public/hero-poster.jpg`）。其餘設定請參考 `.env.example` 內的說明。

4. **啟動開發伺服器**

```bash
npm run dev
```

專案將在 `http://localhost:3000` 啟動。

## 📦 可用指令

```bash
npm run dev        # 啟動開發伺服器 (http://localhost:3000)
npm run build      # 建置正式版本
npm run generate   # 產生靜態網站檔案
npm run preview    # 預覽正式版本
```

## 📁 專案結構

```
upper-room/
├── app/                              # 應用程式原始碼（Nuxt 4 預設 srcDir）
│   ├── app.vue                       # 根元件：<NuxtLayout> + <NuxtPage>、全站 SEO 預設值
│   ├── error.vue                     # 全站錯誤頁（404 / 500），獨立版面不含導覽列與 footer
│   ├── layouts/
│   │   └── default.vue               # 預設版面配置（導覽列 + 頁面 + 共用 footer）
│   ├── pages/
│   │   ├── index.vue                 # 首頁（影片 Hero、統計、關於、房間預覽、活動預覽）
│   │   ├── rooms/
│   │   │   ├── index.vue             # 地區列表頁（選擇行政區）
│   │   │   └── [location]/
│   │   │       ├── index.vue         # 單一地區的房間列表（日期篩選 + 分頁）
│   │   │       └── [room].vue        # 房間詳細頁
│   │   └── events/
│   │       ├── index.vue             # 活動列表頁（即將舉辦 + 過往活動）
│   │       └── [id].vue              # 活動詳細頁
│   ├── components/
│   │   ├── AppNavbar.vue             # 導覽列（Logo、Rooms 下拉選單、導覽連結、CTA）
│   │   ├── AppFooter.vue             # 共用聯絡區塊 footer（WhatsApp / Line / Email）
│   │   ├── AppPagination.vue         # 數字分頁元件（單頁時自動隱藏）
│   │   └── AppAreaMap.vue            # Google Map 區域地圖（以圓圈標示大致位置）
│   ├── composables/
│   │   ├── useRooms.ts               # 房間與地區的 GROQ 查詢
│   │   ├── useEvents.ts              # 活動的 GROQ 查詢
│   │   └── useSanityImageUrl.ts      # Sanity 圖片網址產生器 + 響應式 srcset 屬性 helper
│   ├── types/                        # RoomCard / EventCard 等 TypeScript 型別
│   ├── utils/                        # 日期、價格等格式化輔助函式（自動匯入）
│   └── assets/css/
│       └── main.css                  # Google Fonts 引入 + 基礎樣式
├── server/
│   └── api/__sitemap__/urls.ts       # Sitemap 動態網址來源（從 Sanity 取得所有 slug）
├── public/                           # 靜態檔案（logo、favicon；robots.txt 由模組自動產生）
├── tailwind.config.ts                # Tailwind 設計 token 定義
├── nuxt.config.ts                    # Nuxt 設定檔（Sanity 連線、sitemap、站台網址）
└── package.json                      # 專案相依套件
```

## 🎨 技術架構

### 前端框架
- **Nuxt 4** - Vue.js 應用框架
- **Vue 3** - 漸進式 JavaScript 框架
- **Vue Router** - 官方路由管理器

### 樣式系統
- **Tailwind CSS v3** - 實用優先的 CSS 框架
- **自訂設計 Token** - 色彩、字型、圓角等設計系統
  - 色彩：`bg-base`、`bg-raised`、`bg-card`、`bg-amber`、`bg-coral`
  - 文字：`text-primary`、`text-secondary`、`text-muted`
  - 字型：`font-heading` (Fraunces)、`font-body` (DM Sans)
  - 圓角：`rounded-md` (10px)、`rounded-lg` (16px)

### 資料管理
- **Sanity CMS** - 房間、地區、活動內容集中在 Sanity，透過 `@nuxtjs/sanity` 以 GROQ 查詢
- **Composables 資料層** - 所有查詢集中於 `useRooms.ts` / `useEvents.ts`，頁面不直接寫 GROQ
- **富文本** - 詳細頁內文使用 Portable Text，以 `@portabletext/vue` 渲染
- **響應式圖片** - `useSanityImageAttrs()` 產生 `src` / `srcset` / `sizes` 屬性，依裝置載入合適尺寸的 Sanity 圖片

### 區域地圖
- 房間詳細頁的「Where you'll live」區塊以 Google Map 顯示大致區域（透過 `@nuxt/scripts` 載入）
- 地圖以半透明圓圈標示附近地標為中心的範圍（半徑可於 Sanity 設定，預設 200 公尺），**不會揭露精確地址**
- 需設定 `NUXT_PUBLIC_GOOGLE_MAPS_KEY`；未設定時顯示佔位區塊，房間未填座標時整個區塊不顯示

### 路由設計
- 路由參數使用 Sanity 的 **slug**（kebab-case），而非文件 `_id`
- 房間網址依地區巢狀：`/rooms/xinyi/studio-a`；地區不符時會 301 轉址到正確網址
- 活動網址：`/events/night-market-tour`

### SEO
- 每頁以 `useSeoMeta` 設定標題、描述與 Open Graph 標籤（詳細頁由 Sanity 資料動態產生）
- 全站 canonical 網址與 `og:url` 指向正式網域（`NUXT_PUBLIC_SITE_URL` 可覆寫）
- `@nuxtjs/sitemap` 自動產生 `/sitemap.xml`，動態路由由 `server/api/__sitemap__/urls.ts` 提供
- `@nuxtjs/robots` 自動產生 `robots.txt`（隨 `site.url` 調整 Sitemap 連結；非正式環境自動 noindex）

## ⚠️ 重要注意事項

### Tailwind 整合

**請勿使用 `@tailwindcss/vite`**，它與 Nuxt 4 的 Rolldown 打包器在 Windows 環境下不相容，會導致「Class extends value undefined」錯誤。

✅ **正確做法**：使用 `@nuxtjs/tailwindcss` 模組（已在 `nuxt.config.ts` 的 `modules` 陣列中設定）

✅ **版本限制**：`tailwindcss` 必須保持在 v3 版本（v4 有相同的 Rolldown 相容性問題）

## 🤝 貢獻指南

歡迎提交 Pull Request 或開啟 Issue 來改進專案！

## 📄 授權

本專案採用 Apache License 2.0 授權條款 - 詳見 [LICENSE](LICENSE) 檔案。

## 📧 聯絡方式

如有任何問題或建議，歡迎透過 GitHub Issues 聯繫我們。
