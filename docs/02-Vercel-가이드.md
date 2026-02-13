# Vercel 완전 가이드

## 🚀 Vercel이란?

Vercel은 **프론트엔드 및 풀스택 웹 애플리케이션을 위한 클라우드 플랫폼**입니다. Next.js를 만든 회사에서 운영하며, 배포와 호스팅을 극도로 간편하게 만들어줍니다.

---

## ⭐ 주요 특징

### ✅ 간편한 배포
- Git 연동 (GitHub, GitLab, Bitbucket)
- `git push`만 하면 자동 배포
- CLI 도구로 로컬에서도 배포 가능

### ✅ 자동화
- 커밋할 때마다 자동 빌드 & 배포
- PR(Pull Request)마다 미리보기 URL 생성
- 프로덕션/프리뷰 환경 자동 분리

### ✅ 글로벌 CDN
- 전 세계 엣지 네트워크에 자동 배포
- 빠른 로딩 속도 (사용자 위치에서 가장 가까운 서버)

### ✅ Serverless Functions
- API 엔드포인트를 쉽게 만들 수 있음
- 자동 스케일링 (트래픽에 따라 자동 확장)
- Node.js, Python, Go, Ruby 지원

### ✅ 무료 플랜
- 개인 프로젝트에 충분한 무료 티어
- 무제한 사이트 배포
- 100GB 대역폭/월
- Serverless Functions 실행 시간 제한 있음

---

## 🎯 지원하는 프레임워크

- **Next.js** (최적화됨, Vercel이 만든 프레임워크)
- React
- Vue.js / Nuxt.js
- Svelte / SvelteKit
- Angular
- Vanilla HTML/CSS/JS
- Astro, Remix, Solid 등

---

## 📦 배포 방법

### 방법 1: GitHub 연동 (가장 추천)
```
1. Vercel 회원가입 (vercel.com)
2. GitHub 계정 연결
3. 레포지토리 선택
4. Import → 자동 배포 완료!
```

### 방법 2: CLI 사용
```bash
# Vercel CLI 설치
npm i -g vercel

# 프로젝트 폴더에서 실행
vercel

# 프로덕션 배포
vercel --prod
```

### 방법 3: 드래그 앤 드롭
- 빌드된 폴더를 Vercel 웹사이트에 드래그

---

## 💡 영어 단어 프로젝트에 Vercel이 적합한 이유

### ✅ 장점
1. **Next.js 최적화:** Next.js 사용 시 최고의 성능
2. **무료 배포:** 개인 프로젝트는 비용 0원
3. **자동 HTTPS:** SSL 인증서 자동 발급
4. **환경 변수 관리:** Notion API 키 등을 안전하게 저장
5. **Serverless Functions:** 백엔드 코드를 쉽게 배포
6. **Cron Jobs (유료):** 스케줄링 작업 지원

### ⚠️ 제약사항
1. **Serverless 실행 시간 제한:**
   - 무료: 10초
   - Pro: 60초
   - Enterprise: 900초

2. **Cron Jobs는 유료 플랜만 가능**
   - 매일 오전 6시 스케줄링이 필요한 프로젝트는 **문제가 될 수 있음**

3. **데이터베이스 미포함:**
   - 별도의 DB 서비스 연결 필요 (Vercel Postgres, Supabase 등)

---

## 🔧 프로젝트 구현 방법

### 옵션 A: Vercel + 외부 Cron 서비스 (무료)
```
프론트엔드: Vercel 배포
백엔드 API: Vercel Serverless Functions
스케줄링: GitHub Actions 또는 cron-job.org (무료)
         → 매일 오전 6시에 Vercel API 호출
```

### 옵션 B: Vercel Pro ($20/월)
```
- Vercel Cron Jobs 사용
- 모든 기능을 Vercel에서 해결
```

### 옵션 C: 다른 플랫폼 (무료)
```
- Railway, Render, Fly.io
- Node.js 프로세스가 계속 실행되므로 node-cron 사용 가능
```

---

## 📂 Vercel 무료 플랜 사용 예시

### 프로젝트 구조
```
my-vocab-app/
├── pages/
│   ├── index.js          # 메인 페이지
│   └── api/
│       ├── word.js       # 오늘의 단어 가져오기
│       └── refresh.js    # 단어 새로고침 (외부 cron이 호출)
├── lib/
│   └── notion.js         # Notion API 로직
└── package.json
```

### 배포 과정
1. GitHub에 코드 푸시
2. Vercel에서 레포지토리 연결
3. 환경 변수 설정 (NOTION_API_KEY, DATABASE_ID)
4. 자동 배포 완료!
5. `https://your-app.vercel.app` 접속 가능

---

## 📊 대안 플랫폼 비교

| 플랫폼 | 무료 티어 | Cron Job | 장점 |
|--------|----------|----------|------|
| **Vercel** | ✅ 풍부함 | ❌ 유료만 | Next.js 최적화, 빠른 배포 |
| **Railway** | ✅ $5 크레딧 | ✅ 가능 | node-cron 사용 가능 |
| **Render** | ✅ 제한적 | ✅ 가능 | 무료 Cron Jobs 지원 |
| **Netlify** | ✅ 좋음 | ❌ 유료만 | Vercel과 유사 |
| **Fly.io** | ✅ 제한적 | ✅ 가능 | 컨테이너 기반 |

---

## 💡 추천 방법

영어 단어 프로젝트는 **매일 오전 6시 스케줄링**이 필요하므로:

### 무료로 구현
- Vercel (프론트+API) + GitHub Actions (무료 Cron)
- 또는 Render (모든 기능 무료로 가능)

### 유료 괜찮다면
- Vercel Pro ($20/월) - 가장 편리함

---

## 🔗 유용한 링크

- Vercel 공식 사이트: https://vercel.com
- Vercel 문서: https://vercel.com/docs
- Next.js 문서: https://nextjs.org/docs
