# 點點店鋪

一個蒐集各國美食的店鋪，此專案使用 Node.js 與 Express 框架製作網站，目前可以使用的功能有：新增、編輯、刪除餐廳資料，並可搜尋餐廳。

## 開始 Getting Started

本專案主要運行在電腦本機端，在開始運行專案前請先依照步驟安裝相關軟體與套件，即可瀏覽專案結果。

### 環境建置需求 Prerequisites

- **[Node.js](https://nodejs.org/)** - 開發環境語言
- **[Express](https://www.npmjs.com/package/express)** - node 開發框架
- **[nodemon](https://nodemon.io/)** - 啟動 node 程式
- **[MongoDB](https://www.mongodb.com/)** - 資料庫 (v4.0 以上)
  - 可參考 [MongoDB Guides](https://docs.mongodb.com/guides/server/install/) 依照本機電腦系統安裝對應的檔案
- **[Mongoose](https://mongoosejs.com/)** - MongoDB 的 ORM，Node.js 可以更直覺的操作 MongoDB 資料

### 安裝流程 Installation

1. 開啟終端機 (Terminal)，在電腦本機端使用 git clone 此專案

```
git clone https://github.com/staceyyuan75/restaurant-list.git
```

2. 在終端機 (Terminal) 輸入指令，切換到下載好的專案資料夾

```
cd restaurant-list
```

3. 安裝 npm 套件

```
npm install
```

4. 另開終端機視窗，在本機電腦啟動 MongoDB，並維持運行 (Windows 系統請確認在工作管理員"服務"畫面，MongoDB 是運行中的狀態)

5. 建立 MongoDB 種子資料

```
npm run seed
```

6. 執行指令，啟動 app 伺服器

```
npm run dev
```

5. 當終端機 (Terminal) 顯示 `Express is listening on localhost:3000`，表示啟動成功！

啟動成功後，可以開啟瀏覽器，輸入網址 **[http://localhost:3000](http://localhost:3000)** 瀏覽本專案網站。

## 開發工具 Built With

- **[Visual Studio Code](https://visualstudio.microsoft.com/)** - 程式撰寫
- **[iTerm 2](https://iterm2.com/)** - 終端機
- **[jQuery validation Plugin](https://jqueryvalidation.org/)** - 前端頁面表單驗證工具

## 開發者 Contributor

- Stacey Yuan
