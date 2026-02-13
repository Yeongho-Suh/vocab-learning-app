# Git 작업 흐름 - 여러 컴퓨터에서 프로젝트 관리하기

## 🔄 기본 개념

```
[회사 컴퓨터] ←→ [GitHub Repository] ←→ [집 컴퓨터]
      ↓                                        ↓
   git push                                git pull
   git pull                                git push
```

**기본 원칙:**
- 모든 코드는 GitHub에 저장
- 작업 전: `git pull` (최신 코드 받기)
- 작업 후: `git push` (변경사항 업로드)

---

## 🚀 초기 설정 (한 번만 수행)

### Step 1: GitHub 레포지토리 생성

```bash
# GitHub 웹사이트에서
1. github.com 로그인
2. New Repository 클릭
3. 레포지토리 이름: vocab-learning-app
4. Private 선택 (또는 Public)
5. Create repository
```

### Step 2: 필수 프로그램 설치

각 컴퓨터마다 아래 프로그램 설치 필요:

```bash
# 1. Node.js 설치 (https://nodejs.org)
#    - LTS 버전 다운로드 & 설치
#    - 버전 확인
node --version  # v20.x.x 이상
npm --version   # v10.x.x 이상

# 2. Git 설치 (https://git-scm.com)
git --version   # git version 2.x.x

# 3. 코드 에디터 설치
#    - VS Code 추천 (https://code.visualstudio.com)
```

### Step 3: 첫 번째 컴퓨터에서 프로젝트 시작 (예: 집)

```bash
# 작업할 폴더로 이동
cd Desktop

# Next.js 프로젝트 생성
npx create-next-app@latest vocab-learning-app

# 설정 옵션
✔ Would you like to use TypeScript? … No
✔ Would you like to use ESLint? … Yes
✔ Would you like to use Tailwind CSS? … Yes (또는 No)
✔ Would you like to use `src/` directory? … No
✔ Would you like to use App Router? … Yes
✔ Would you like to customize the default import alias? … No

# 프로젝트 폴더로 이동
cd vocab-learning-app

# Git 원격 저장소 연결 (create-next-app이 자동으로 git init 해줌)
git remote add origin https://github.com/your-username/vocab-learning-app.git

# 첫 커밋 & 푸시
git add .
git commit -m "Initial commit"
git push -u origin main
```

### Step 4: 두 번째 컴퓨터에서 설정 (예: 회사)

```bash
# 작업할 폴더로 이동
cd Desktop

# GitHub에서 코드 복사
git clone https://github.com/your-username/vocab-learning-app.git

# 프로젝트 폴더로 이동
cd vocab-learning-app

# 필요한 패키지 설치
npm install

# 개발 서버 실행 테스트
npm run dev
# → http://localhost:3000 접속 확인
```

---

## 💼 일상적인 작업 흐름

### 회사에서 작업 시작

```bash
# 1. 프로젝트 폴더로 이동
cd vocab-learning-app

# 2. 최신 코드 받기 (중요!)
git pull origin main

# 3. 개발 서버 실행
npm run dev

# 4. 코드 작업...

# 5. 작업 완료 후 저장
git add .
git commit -m "Add word display feature"
git push origin main
```

### 집에서 이어서 작업

```bash
# 1. 프로젝트 폴더로 이동
cd vocab-learning-app

# 2. 회사에서 작업한 내용 받기
git pull origin main

# 3. 개발 서버 실행
npm run dev

# 4. 코드 작업...

# 5. 작업 완료 후 저장
git add .
git commit -m "Update UI styling"
git push origin main
```

---

## 📂 프로젝트 구조

```
vocab-learning-app/
├── .git/                 # Git 설정 (자동 생성)
├── .gitignore           # Git 제외 파일 목록
├── .env.local           # 환경 변수 (Git에 업로드 안됨!)
├── package.json         # 프로젝트 정보 & 의존성
├── package-lock.json    # 정확한 패키지 버전
├── next.config.js       # Next.js 설정
├── public/              # 정적 파일 (이미지 등)
├── app/                 # 페이지 & API
│   ├── page.js         # 메인 페이지
│   ├── layout.js       # 레이아웃
│   └── api/
│       └── word/
│           └── route.js # API 엔드포인트
└── lib/                 # 유틸리티 함수
    └── notion.js       # Notion API 연동
```

---

## 🔐 환경 변수 관리

### .env.local 파일 (각 컴퓨터마다 수동 생성)

```bash
# .env.local
NOTION_API_KEY=secret_xxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxx
```

**중요:**
- `.env.local`은 Git에 업로드되지 않음 (보안)
- 각 컴퓨터에서 수동으로 생성 필요

### .env.example 파일 (템플릿 공유용)

```bash
# .env.example (Git에 업로드됨)
NOTION_API_KEY=your_notion_api_key_here
NOTION_DATABASE_ID=your_database_id_here
```

**사용 방법:**
```bash
# 새 컴퓨터에서
cp .env.example .env.local
# 그 다음 .env.local을 열어서 실제 값 입력
```

---

## 📦 패키지 관리

### 새 패키지 설치 시

```bash
# 예: Notion SDK 설치
npm install @notionhq/client

# 자동으로 package.json에 추가됨
# 다른 컴퓨터에서는 git pull 후 npm install만 하면 됨
```

---

## 🛠️ Git 명령어 치트시트

```bash
# 최신 코드 받기
git pull origin main

# 변경사항 확인
git status

# 모든 변경사항 스테이징
git add .

# 특정 파일만 스테이징
git add pages/index.js

# 커밋 (메시지와 함께)
git commit -m "설명"

# GitHub에 업로드
git push origin main

# 작업 내역 보기
git log

# 간단한 로그 보기
git log --oneline

# 브랜치 생성 (기능 개발용)
git checkout -b feature/new-ui

# 브랜치 전환
git checkout main

# 변경사항 임시 저장
git stash

# 임시 저장한 내용 복구
git stash pop
```

---

## ⚠️ 충돌 방지 팁

### Rule 1: 작업 전 항상 pull
```bash
git pull origin main  # 먼저!
# 코드 작업...
git push origin main
```

### Rule 2: 자주 커밋 & 푸시
```bash
# 작은 단위로 자주 저장
git add .
git commit -m "Add word card component"
git push origin main
```

### Rule 3: 충돌 발생 시
```bash
# pull 시 충돌 메시지가 나오면
git status  # 충돌 파일 확인
# VS Code에서 파일 열어서 수동으로 해결
git add .
git commit -m "Resolve merge conflict"
git push origin main
```

---

## 📅 실전 시나리오

### 월요일 회사에서
```bash
cd vocab-learning-app
git pull origin main
npm run dev
# Notion API 연동 코드 작성
git add .
git commit -m "Add Notion API integration"
git push origin main
```

### 월요일 저녁 집에서
```bash
cd vocab-learning-app
git pull origin main  # 회사에서 작업한 내용 받기
npm run dev
# UI 디자인 작업
git add .
git commit -m "Improve card UI design"
git push origin main
```

### 화요일 회사에서
```bash
cd vocab-learning-app
git pull origin main  # 집에서 작업한 UI 받기
npm run dev
# 랜덤 로직 구현
git add .
git commit -m "Implement random word selection"
git push origin main
```

---

## ✅ 체크리스트

### 각 컴퓨터마다 1회만
- [ ] Node.js 설치
- [ ] Git 설치
- [ ] VS Code 설치
- [ ] GitHub 계정 로그인 설정
- [ ] 프로젝트 클론 (첫 컴퓨터는 생성, 나머지는 clone)
- [ ] npm install 실행
- [ ] .env.local 파일 생성

### 매 작업 시작 시
- [ ] `git pull origin main`
- [ ] 코드 작업
- [ ] `git add .`
- [ ] `git commit -m "메시지"`
- [ ] `git push origin main`

---

## 🔧 Git 설정 (선택사항)

### 사용자 정보 설정
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 편리한 단축 명령어 설정
```bash
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.cm commit
git config --global alias.br branch

# 이제 짧게 사용 가능
git st  # git status
git co main  # git checkout main
git cm -m "message"  # git commit -m "message"
```

---

## 📖 자주 묻는 질문

### Q: git push 시 권한 오류가 나요
```bash
# Personal Access Token 생성 필요
# GitHub → Settings → Developer settings → Personal access tokens
# 생성한 토큰을 비밀번호 대신 입력
```

### Q: package-lock.json도 커밋해야 하나요?
```
예! package-lock.json은 반드시 Git에 포함되어야 합니다.
정확한 패키지 버전을 보장합니다.
```

### Q: node_modules 폴더는요?
```
아니오! .gitignore에 의해 자동으로 제외됩니다.
각 컴퓨터에서 npm install로 생성합니다.
```
