# 1. Base image 설정 (Node.js LTS 버전)
FROM node:18-alpine

# 2. 작업 디렉토리 생성
WORKDIR /app

# 3. package.json 및 package-lock.json 복사
COPY package*.json ./

# 4. npm 모듈 설치 (NODE_ENV 환경 변수 설정 시 production에서 devDependencies 제외)
RUN npm ci --only=production

# 5. 소스 코드 복사
COPY . .

# 6. 앱 포트 설정 (컨테이너 외부에 노출할 포트)
EXPOSE 3000

# 7. 앱 실행 (start 명령어 실행)
CMD ["npm", "start"]