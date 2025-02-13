# 베이스 이미지 설정
FROM node:22

# 작업 디렉토리 설정
WORKDIR /app

# 패키지 설치 및 빌드
COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 5173

# 프론트엔드 실행
CMD ["npm", "run", "preview"]