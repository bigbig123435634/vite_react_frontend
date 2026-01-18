FROM node:22-alpine

# 設定工作目錄
WORKDIR /app

# 複製 package 檔案
COPY package.json package-lock.json* ./

# 安裝所有依賴
RUN npm ci

# 複製原始碼
COPY . .

# 暴露 Vite 開發伺服器端口（預設 5173）
EXPOSE 5173

# 啟動 Vite 開發伺服器
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
