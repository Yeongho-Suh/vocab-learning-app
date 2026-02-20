# Vercel 배포 가이드

## Vercel이란?

Vercel은 **프론트엔드 및 풀스택 웹 애플리케이션을 위한 클라우드 플랫폼**입니다. Next.js를 만든 회사에서 운영하며, 배포와 호스팅을 극도로 간편하게 만들어줍니다.

---

## 이 프로젝트의 배포 정보

| 항목 | 값 |
|------|-----|
| **프로덕션 URL** | https://my-daily-vocab.vercel.app |
| **프로젝트명** | vocab-learning-app |
| **팀/계정** | yeongho-suhs-projects |
| **GitHub 연동** | Yeongho-Suh/vocab-learning-app |
| **자동 배포** | GitHub push 시 자동 배포 |

### 환경 변수 (Vercel에 설정됨)
| 변수명 | 용도 |
|--------|------|
| `NOTION_API_KEY` | Notion API 인증 키 |
| `NOTION_DATABASE_ID` | Notion 데이터베이스 ID |

---

## 주요 특징

### 간편한 배포
- GitHub 연동으로 `git push`만 하면 자동 배포
- CLI 도구로 로컬에서도 수동 배포 가능

### 자동화
- 커밋할 때마다 자동 빌드 및 배포
- PR(Pull Request)마다 미리보기 URL 생성

### 글로벌 CDN
- 전 세계 엣지 네트워크에 자동 배포
- 사용자 위치에서 가장 가까운 서버에서 응답

### Serverless Functions
- API 엔드포인트를 자동으로 Serverless Function으로 변환
- Next.js App Router의 `route.js` 파일이 자동 배포됨
- `export const dynamic = 'force-dynamic'`으로 캐싱 비활성화

### 무료 플랜
- 개인 프로젝트에 충분한 무료 티어
- 무제한 사이트 배포
- 100GB 대역폭/월
- Serverless Functions 실행 시간 10초 제한 (이 프로젝트에 충분)

---

## 이 프로젝트에 Vercel이 적합한 이유

### Cron(스케줄러) 불필요
이 프로젝트는 **별도 스케줄러 없이** 동작합니다:
- 사용자가 접속할 때 KST 오전 6시 기준으로 날짜 판단
- 오늘 선택된 단어가 없으면 자동으로 새 단어 선택
- 이미 선택된 단어가 있으면 그대로 반환

따라서 Vercel 무료 플랜으로 충분하며, Cron Jobs(유료)가 필요하지 않습니다.

### 별도 DB 불필요
- Notion 데이터베이스의 **ShownDate** 속성으로 상태 관리
- 외부 DB(Supabase, PostgreSQL 등)를 사용하지 않음
- Serverless 환경에서 로컬 파일 시스템을 사용하지 않음

---

## 배포 방법

### 방법 1: GitHub 연동 (현재 설정)
GitHub에 push하면 자동으로 배포됩니다.

```bash
# 코드 수정 후
git add .
git commit -m "변경 내용"
git push origin main
# → Vercel에서 자동 빌드 및 배포
```

### 방법 2: CLI 수동 배포
GitHub 연동 없이 직접 배포할 때 사용합니다.

```bash
# Vercel CLI 로그인 (1회)
npx vercel login

# 프로덕션 배포
npx vercel --prod --yes
```

---

## Vercel 환경 변수 관리

### CLI로 환경변수 추가
```bash
# 값을 파이프로 전달
echo "값" | npx vercel env add 변수명 production
```

### CLI로 환경변수 확인
```bash
npx vercel env ls
```

### 대시보드에서 관리
Vercel 웹사이트 → 프로젝트 → Settings → Environment Variables

---

## 도메인 관리

### 현재 도메인
- **프로덕션**: https://my-daily-vocab.vercel.app
- **기본 도메인**: https://vocab-learning-app-eight.vercel.app

### 커스텀 도메인 추가 (선택사항)
개인 도메인이 있으면 Vercel 대시보드에서 연결할 수 있습니다:
1. Vercel 대시보드 → 프로젝트 → Settings → Domains
2. 도메인 입력 → Add
3. DNS 설정 안내에 따라 레코드 추가

---

## 프로젝트 구조 (Vercel 배포 기준)

```
vocab-learning-app/
├── app/
│   ├── page.js              # 메인 페이지 (Static)
│   ├── layout.js            # 레이아웃
│   ├── globals.css          # 스타일
│   └── api/
│       ├── word/route.js    # Serverless Function (Dynamic)
│       └── refresh/route.js # Serverless Function (Dynamic)
├── lib/
│   ├── notion.js            # Notion API 모듈
│   └── wordManager.js       # 단어 관리 로직
└── package.json
```

빌드 시 Next.js가 자동으로:
- `app/page.js` → 정적 페이지로 빌드
- `app/api/*/route.js` → Serverless Functions로 변환

---

## 유용한 링크

- Vercel 대시보드: https://vercel.com/dashboard
- Vercel 문서: https://vercel.com/docs
- Next.js 배포 가이드: https://nextjs.org/docs/app/building-your-application/deploying

---

**작성일:** 2026-02-13
**마지막 업데이트:** 2026-02-20
