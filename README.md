# Daily English Word

매일 하나의 영어 단어를 Notion DB에서 랜덤으로 보여주는 웹 서비스

**URL**: https://my-daily-vocab.vercel.app

## 다른 PC에서 시작하기

### 1. 사전 설치
- [Node.js](https://nodejs.org/) (v18 이상)
- [Git](https://git-scm.com/)

### 2. 프로젝트 클론 및 의존성 설치
```bash
git clone https://github.com/Yeongho-Suh/vocab-learning-app.git
cd vocab-learning-app
npm install
```

### 3. 환경변수 설정
프로젝트 루트에 `.env.local` 파일 생성:
```
NOTION_API_KEY=ntn_xxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxx
```
> Notion API Key와 Database ID는 [Notion Integrations](https://www.notion.so/my-integrations)에서 확인

### 4. 로컬 실행
```bash
npm run dev
```
http://localhost:3000 에서 확인

### 5. 배포
GitHub push 시 Vercel에서 자동 배포됩니다.

## 프로젝트 구조
```
app/
  page.js          # 메인 UI (단어 카드, 하이라이트)
  layout.js         # 레이아웃 및 메타데이터
  globals.css       # 스타일
  api/
    word/route.js   # GET - 오늘의 단어 조회
    refresh/route.js # POST - 수동 단어 교체
lib/
  notion.js         # Notion API 연동
  wordManager.js    # 단어 선택/이력 관리 로직
docs/               # 프로젝트 계획 및 가이드 문서
```

## 기술 스택
- Next.js 16 (App Router)
- React 19
- Notion API (데이터 저장 + 상태 관리)
- Vercel (호스팅)
