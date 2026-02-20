# 영어 단어 학습 웹 서비스 - 문서 가이드

이 프로젝트의 개발 문서입니다.

**배포 URL:** https://my-daily-vocab.vercel.app

## 문서 목록

### [01. 프로젝트 계획](./01-프로젝트-계획.md)
- 프로젝트 개요 및 요구사항
- 시스템 구성 및 아키텍처
- 핵심 기능 및 구현 상세
- 데이터 구조 (Notion DB)
- 기술 스택
- 개발환경 세팅 가이드

### [02. Vercel 가이드](./02-Vercel-가이드.md)
- Vercel 개요 및 특징
- 배포 방법 (GitHub 연동, CLI)
- 환경 변수 설정
- 이 프로젝트의 배포 구성

### [03. Git 작업 흐름](./03-Git-작업흐름.md)
- 여러 컴퓨터에서 프로젝트 관리하기
- 초기 설정 방법
- 일상적인 작업 흐름
- 환경 변수 관리
- Git 명령어 치트시트

### [04. VS Code 설정](./04-VS-Code-설정.md)
- Settings Sync 사용법
- 프로젝트별 설정 (.vscode 폴더)
- 추천 확장 프로그램
- 유용한 단축키

---

## 빠른 시작 가이드 (다른 PC에서)

```bash
# 1. 프로젝트 클론
git clone https://github.com/Yeongho-Suh/vocab-learning-app.git
cd vocab-learning-app

# 2. 패키지 설치
npm install

# 3. 환경변수 설정 (.env.example 참고)
# .env.local 파일 생성 후 NOTION_API_KEY, NOTION_DATABASE_ID 입력

# 4. 로컬 실행
npm run dev
```

자세한 내용은 [03. Git 작업 흐름](./03-Git-작업흐름.md)의 "추가 컴퓨터 세팅" 섹션을 참고하세요.

---

## 외부 리소스

- [Next.js 공식 문서](https://nextjs.org/docs)
- [Notion API 문서](https://developers.notion.com/)
- [Vercel 공식 사이트](https://vercel.com)
- [Git 공식 문서](https://git-scm.com/doc)
- [VS Code 공식 문서](https://code.visualstudio.com/docs)

---

**작성일:** 2026-02-13
**마지막 업데이트:** 2026-02-20
