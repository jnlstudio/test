# JNL STUDIO — 市集參展作品集
用途：向市集主辦方、策展及招商團隊介紹品牌與產品。
已移除全部價格、購物車及結帳。保留七款產品、互動詳情、市集合作介紹，並加入由 GSAP ScrollTrigger 驅動的捲動故事。
聯絡：jnlstudio.design@gmail.com（點擊聯絡按鈕會開啟使用者的電郵程式）。

## 更新已有 GitHub Pages
解壓 JNL-STUDIO-Market-Portfolio-GitHub-Pages.zip。
在 jnlstudio/test 按 Add file → Upload files。
上載全部內容，包括 index.html、assets、objects、market-gallery、favicon.svg、README.md、.nojekyll。
檔案須位於 repository 最外層。按 Commit changes，等待 Actions 綠色剔號。
main / (root) 設定及網站網址保持不變。
此 ZIP 不會自行更新 GitHub。
舊版 assets 若保留，不會被新版 index.html 使用；確認新版顯示後可清理舊檔。

## 新增 MARKET DIARY 相片
進入 repository 最外層的 `market-gallery` 資料夾，按 Add file → Upload files，把新相片上載並 Commit。網站重新整理後會自動讀取資料夾內所有 JPG、JPEG、PNG、WebP、AVIF 及 GIF，不需要修改程式。

舊版三張產品示範相已從網站版本移除並停止顯示；`market-gallery` 只會用作市集、攤位及活動紀錄。

建議檔名使用日期開頭，例如 `2026-10-brixton-market-01.jpg`；最新日期會優先顯示。每張圖片最好控制在 2MB 以內，避免手機載入太慢。

## 可編輯原始碼
使用另一個 Market-Portfolio-Source.zip。
app/page.tsx：GSAP 捲動場景、產品詳情及頁面內容。
lib/catalog.ts：七款產品文字與圖片。
app/globals.css：視覺、版面與流動裝置設計。
npm ci 後 npm run build 產生 dist/；只上載 dist/ 的內容。
