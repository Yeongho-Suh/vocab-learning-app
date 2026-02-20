# Git 작업 흐름 - 여러 컴퓨터에서 프로젝트 관리하기

## 기본 개념

```
[회사 컴퓨터] ←→ [GitHub Repository] ←→ [집 컴퓨터]
      ↓                  ↓                    ↓
   git push        자동 배포 (Vercel)       git pull
   git pull                                git push
```

**기본 원칙:**
- 모든 코드는 GitHub에 저장
- 작업 전: `git pull` (최신 코드 받기)
- 작업 후: `git push` (변경사항 업로드)
- GitHub push 시 Vercel에서 자동 배포

---

## 초기 설정 (한 번만 수행)

### Step 1: 필수 프로그램 설치

각 컴퓨터마다 아래 프로그램 설치 필요:

```bash
# 1. Node.js 설치 (https://nodejs.org)
#    - LTS 버전 (v18 이상) 다운로드 & 설치
node --version  # v18.x.x 이상
npm --version   # v9.x.x 이상

# 2. Git 설치 (https://git-scm.com)
git --version   # git version 2.x.x

# 3. VS Code 설치 (https://code.visualstudio.com)
```

### Step 2: Git 사용자 설정 (각 컴퓨터에서 1회)

```bash
git config --global user.name "Yeongho-Suh"
git config --global user.email "zxczxc1680@gmail.com"
```

### Step 3: 프로젝트 클론

```bash
# 작업할 폴더로 이동
cd Desktop

# GitHub에서 코드 복사
git clone https://github.com/Yeongho-Suh/vocab-learning-app.git

# 프로젝트 폴더로 이동
cd vocab-learning-app

# 패키지 설치
npm install

# 환경변수 파일 생성
# .env.local 파일을 만들고 아래 내용 입력:
# NOTION_API_KEY=ntn_xxxxxxxxxxxx
# NOTION_DATABASE_ID=xxxxxxxxxxxx

# 개발 서버 실행 테스트
npm run dev
# → http://localhost:3000 접속 확인
```

---

## 일상적인 작업 흐름

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
git commit -m "변경 내용 설명"
git push origin main
# → Vercel에서 자동 배포됨
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
git commit -m "변경 내용 설명"
git push origin main
```

---

## 프로젝트 구조

```
vocab-learning-app/
├── .git/                    # Git 설정 (자동 생성)
├── .gitignore               # Git 제외 파일 목록
├── .env.local               # 환경 변수 (Git에 포함 안됨!)
├── .env.example             # 환경 변수 템플릿
├── package.json             # 프로젝트 정보 & 의존성
├── package-lock.json        # 정확한 패키지 버전
├── next.config.mjs          # Next.js 설정
├── README.md                # 프로젝트 소개
├── app/                     # 페이지 & API
│   ├── page.js              # 메인 페이지 UI
│   ├── layout.js            # 레이아웃 & 메타데이터
│   ├── globals.css          # 전역 스타일
│   └── api/
│       ├── word/route.js    # GET - 오늘의 단어
│       └── refresh/route.js # POST - 수동 단어 교체
├── lib/                     # 핵심 로직
│   ├── notion.js            # Notion API 연동
│   └── wordManager.js       # 단어 선택/이력 관리
└── docs/                    # 프로젝트 문서
    ├── README.md
    ├── 01-프로젝트-계획.md
    ├── 02-Vercel-가이드.md
    ├── 03-Git-작업흐름.md
    └── 04-VS-Code-설정.md
```

---

## 환경 변수 관리

### .env.local 파일 (각 컴퓨터마다 수동 생성)

```bash
# .env.local
NOTION_API_KEY=ntn_xxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxx
```

**중요:**
- `.env.local`은 Git에 업로드되지 않음 (보안)
- 각 컴퓨터에서 수동으로 생성 필요
- Notion API Key는 [Notion Integrations](https://www.notion.so/my-integrations)에서 확인

### .env.example 파일 (템플릿 공유용)

```bash
# .env.example (Git에 포함됨)
NOTION_API_KEY=your_notion_api_key_here
NOTION_DATABASE_ID=your_database_id_here
```

---

## 패키지 관리

### 새 패키지 설치 시

```bash
# 예: 새 패키지 설치
npm install 패키지명

# package.json에 자동 추가됨
# 다른 컴퓨터에서는 git pull 후 npm install만 하면 됨
```

---

## Git 명령어 치트시트

```bash
# 최신 코드 받기
git pull origin main

# 변경사항 확인
git status

# 모든 변경사항 스테이징
git add .

# 특정 파일만 스테이징
git add app/page.js

# 커밋 (메시지와 함께)
git commit -m "설명"

# GitHub에 업로드
git push origin main

# 작업 내역 보기
git log --oneline

# 변경사항 임시 저장
git stash

# 임시 저장한 내용 복구
git stash pop
```

---

## 충돌 방지 팁

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

## 새 컴퓨터 세팅 체크리스트

- [ ] Node.js 설치 (LTS, v18 이상)
- [ ] Git 설치 및 사용자 설정
- [ ] VS Code 설치
- [ ] VS Code Settings Sync 켜기 (GitHub 로그인)
- [ ] 프로젝트 클론: `git clone https://github.com/Yeongho-Suh/vocab-learning-app.git`
- [ ] 패키지 설치: `npm install`
- [ ] 환경 변수 생성: `.env.local` 파일 작성
- [ ] 개발 서버 실행 확인: `npm run dev`

---

## 자주 묻는 질문

### Q: git push 시 권한 오류가 나요
```
Personal Access Token 생성 필요
GitHub → Settings → Developer settings → Personal access tokens
생성한 토큰을 비밀번호 대신 입력
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

---

**작성일:** 2026-02-13
**마지막 업데이트:** 2026-02-20
