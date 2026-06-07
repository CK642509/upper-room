# Upper Room

**Upper Room** 是一個位於台北的共居空間預訂平台，為尋找高品質住宿的外籍人士和本地居民提供服務。本專案採用現代化的 Nuxt 4 框架建構，提供房間瀏覽、活動資訊等功能。

## ✨ 專案特色

- 🏠 **房間展示** - 完整的房間列表與詳細資訊
- 📅 **社群活動** - 即將舉辦與過往活動的展示
- 🎨 **現代化 UI** - 使用 Tailwind CSS 與自訂設計系統
- ⚡ **高效能** - 基於 Nuxt 4 與 Vue 3
- 📱 **響應式設計** - 完美適配各種裝置

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

3. **啟動開發伺服器**

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
├── app/                          # 應用程式原始碼（Nuxt 4 預設 srcDir）
│   ├── app.vue                   # 根元件：<NuxtLayout> + <NuxtPage>
│   ├── layouts/
│   │   └── default.vue           # 預設版面配置（導覽列 + 深色背景）
│   ├── pages/
│   │   ├── index.vue             # 首頁（Hero、統計、關於、房間預覽、活動預覽、聯絡）
│   │   ├── rooms/
│   │   │   ├── index.vue         # 房間列表頁
│   │   │   └── [id].vue          # 房間詳細頁
│   │   └── events/
│   │       ├── index.vue         # 活動列表頁（即將舉辦 + 過往活動）
│   │       └── [id].vue          # 活動詳細頁
│   ├── components/
│   │   └── AppNavbar.vue         # 導覽列元件（Logo、導覽連結、CTA 按鈕）
│   ├── composables/
│   │   └── useData.ts            # 靜態資料層（Room[] 與 Event[] 陣列 + 輔助函式）
│   └── assets/css/
│       └── main.css              # Google Fonts 引入 + 基礎樣式
├── public/                       # 靜態檔案
├── tailwind.config.ts            # Tailwind 設計 token 定義
├── nuxt.config.ts                # Nuxt 設定檔
└── package.json                  # 專案相依套件
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
- **靜態資料** - 所有房間與活動資料硬編碼於 `app/composables/useData.ts`
- **無 API** - 頁面直接匯入 composables，無後端 API 或狀態管理

### 路由設計
- 房間 ID：kebab-case 格式（如 `studio-a`、`double-room-b`、`single-room-c`）
- 活動 ID：kebab-case 格式（如 `night-market-tour`、`tea-ceremony`）

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
