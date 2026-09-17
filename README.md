# 鬼面 / AFTER DARK

獨立產品展示網站，可上載 GitHub 並用 GitHub Pages 發布。毋須 Higgsfield 登入、API 金鑰或伺服器。

包含原相、經處理的產品圖片、12 秒捲動影片、桌面及手機版本、細節切換、原相對照、FAQ、複製資料和減少動畫模式。產品未設定售價或付款功能。

## 最簡單：直接發布已建好的版本

1. 解壓 ZIP，建立一個 GitHub repository。
2. 將 `dist` 資料夾內的所有檔案上載到 repository 根目錄（不是上載 ZIP，亦不是只上載外層 `dist` 資料夾）。
3. 在 repository 的 **Settings → Pages**，選 **Deploy from a branch**，選 `main` 和 `/(root)`，儲存。
4. 等 GitHub 顯示網站網址。

## 保留原始碼並自動發布

1. 將此資料夾內的原始碼上載到 repository 根目錄，包含隱藏的 `.github` 資料夾、`public`、`src` 和 `package-lock.json`；不需上載 `node_modules` 或 `dist`。
2. 在 **Settings → Pages → Source** 選 **GitHub Actions**。
3. 在 **Actions** 執行 `Deploy website to GitHub Pages`，或推送至 `main`。之後每次更新 `main` 會自動發布。

macOS Finder 可用 Command + Shift + . 顯示隱藏的 `.github` 資料夾。使用 GitHub Desktop 上載整個資料夾亦可。

## 在電腦預覽 / 修改

需要 Node.js 22。

```sh
npm ci
npm run dev
```

正式打包：

```sh
npm run build
npm run preview
```

請透過預覽伺服器開啟網站；不要直接雙擊 index.html，瀏覽器的本機檔案限制會影響模組與影片。

## 檔案位置

- `src/App.tsx`：內容、細節切換、FAQ、複製資料。
- `src/styles.css`：品牌樣式及手機排版。
- `src/scroll-scrub-scenes.ts`：捲動影片場景設定。
- `src/components/scroll-scrub/`：影片捲動控制器。
- `public/assets/`：全部產品圖片、原相、分享封面及影片。
- `dist/`：已建好的可發布網站。
- `.github/workflows/deploy.yml`：GitHub Pages 自動發布。

圖片及影片已隨包附上，不依賴 Higgsfield 素材網址。字體使用 Google Fonts；無網絡時會使用系統字體。

若確定正式網址，可將 index.html 的 og:image / twitter:image 改成正式網站的完整封面網址，以改善社交平台分享預覽。

網站已移除原本平台登入及平台專用服務。未附任何帳戶 token、環境密鑰、node_modules 或原始 Git 歷史。提供原始碼不代表授予第三方角色／商標權利。

GitHub 官方發布設定說明：https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
