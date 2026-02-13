# VS Code 환경 설정 가이드

## 🔄 Git vs VS Code 설정 차이

```
Git이 동기화하는 것:
✅ 코드 파일 (.js, .html, .css 등)
✅ package.json (설치된 패키지 목록)
✅ .gitignore, README.md 등

Git이 동기화 안하는 것:
❌ VS Code 확장 프로그램
❌ VS Code 사용자 설정 (폰트, 색상 테마 등)
❌ 키보드 단축키
❌ 스니펫, 코드 포맷 설정
```

**결론:** VS Code 환경은 별도로 동기화해야 합니다!

---

## 🌟 방법 1: VS Code Settings Sync (추천!)

VS Code 내장 기능으로 **모든 설정을 자동 동기화**할 수 있습니다.

### 첫 번째 컴퓨터 (예: 집)에서 설정

```
1. VS Code 열기
2. 왼쪽 하단 톱니바퀴 ⚙️ 아이콘 클릭
3. "Turn on Settings Sync..." 클릭
4. 동기화할 항목 선택:
   ✅ Settings (설정)
   ✅ Keyboard Shortcuts (단축키)
   ✅ Extensions (확장 프로그램) ← 중요!
   ✅ User Snippets (스니펫)
   ✅ UI State (레이아웃)
5. "Sign in & Turn on" 클릭
6. GitHub 또는 Microsoft 계정으로 로그인
```

### 두 번째 컴퓨터 (예: 회사)에서 설정

```
1. VS Code 열기
2. 왼쪽 하단 톱니바퀴 ⚙️ 아이콘 클릭
3. "Turn on Settings Sync..." 클릭
4. 같은 GitHub/Microsoft 계정으로 로그인
5. 자동으로 모든 설정이 동기화됨! ✨
```

### 동기화되는 내용
- ✅ 설치한 확장 프로그램 (자동 설치됨)
- ✅ 에디터 설정 (폰트, 색상 테마, 탭 크기 등)
- ✅ 키보드 단축키
- ✅ 코드 스니펫
- ✅ 터미널 설정

### 실시간 동기화
- 한 컴퓨터에서 설정 변경 → 자동으로 다른 컴퓨터에 반영
- 확장 프로그램 설치 → 다른 컴퓨터에서 자동 설치

---

## 📁 방법 2: 프로젝트별 설정 (.vscode 폴더)

Settings Sync를 사용하지 않거나, 프로젝트별로 특정 설정을 공유하고 싶을 때 사용합니다.

### 프로젝트 폴더 구조

```
vocab-learning-app/
├── .vscode/                    ← 이 폴더를 Git에 포함
│   ├── settings.json          # 프로젝트별 설정
│   ├── extensions.json        # 추천 확장 프로그램
│   └── launch.json            # 디버그 설정 (선택)
├── .git/
├── package.json
└── ...
```

### .vscode/settings.json 예시

```json
{
  "editor.fontSize": 14,
  "editor.tabSize": 2,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "files.autoSave": "afterDelay",
  "javascript.updateImportsOnFileMove.enabled": "always",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### .vscode/extensions.json 예시

```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "eamodio.gitlens"
  ]
}
```

### 사용 방법

```bash
# 집에서 .vscode 폴더 생성 후
git add .vscode/
git commit -m "Add VS Code settings"
git push origin main

# 회사에서
git pull origin main
# VS Code를 열면 "추천 확장 프로그램 설치" 알림이 뜸
# → "Install All" 클릭
```

---

## 🔧 추천 확장 프로그램

### 필수 확장 프로그램

1. **Prettier - Code formatter** (`esbenp.prettier-vscode`)
   - 코드 자동 정리
   - 일관된 코드 스타일 유지

2. **ESLint** (`dbaeumer.vscode-eslint`)
   - 코드 에러 체크
   - JavaScript/TypeScript 문법 검사

3. **GitLens** (`eamodio.gitlens`)
   - Git 히스토리, 작성자 확인
   - 코드 변경 이력 추적

### Next.js 개발용

4. **ES7+ React/Redux/React-Native snippets**
   - React 코드 자동완성
   - 빠른 컴포넌트 생성

### 편의 기능

5. **Auto Rename Tag** (`formulahendry.auto-rename-tag`)
   - HTML 태그 자동 수정
   - 여는 태그 수정 시 닫는 태그도 자동 변경

6. **Path Intellisense** (`christian-kohler.path-intellisense`)
   - 파일 경로 자동완성
   - import 문 작성 시 편리

7. **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`)
   - Tailwind 클래스 자동완성 (Tailwind 사용 시)

---

## ⚙️ 추천 설정

### 편집기 기본 설정

```json
{
  // 폰트 설정
  "editor.fontSize": 14,
  "editor.fontFamily": "Consolas, 'Courier New', monospace",

  // 코드 포맷
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.formatOnSave": true,
  "editor.formatOnPaste": true,

  // 자동 저장
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000,

  // 미니맵
  "editor.minimap.enabled": true,

  // 줄 번호
  "editor.lineNumbers": "on",

  // 공백 표시
  "editor.renderWhitespace": "selection"
}
```

### Prettier 설정 (.prettierrc 파일)

프로젝트 루트에 `.prettierrc` 파일 생성:

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80
}
```

---

## 📊 방법 비교

| 방법 | 편리함 | 동기화 범위 | 추천 |
|------|--------|------------|------|
| **Settings Sync** | ⭐⭐⭐⭐⭐ | 전체 (모든 프로젝트) | ✅ 개인용 |
| **.vscode 폴더** | ⭐⭐⭐ | 프로젝트별 | ✅ 팀 협업 |
| **수동 설정** | ⭐ | 없음 | ❌ 비추천 |

---

## 🎯 추천 조합

```
Settings Sync (전역 설정) + .vscode 폴더 (프로젝트 설정)

예시:
- Settings Sync: 폰트, 색상 테마, 키보드 단축키
- .vscode: 이 프로젝트에만 필요한 설정 (Prettier 룰 등)
```

---

## 🚀 실전 시나리오

### 상황 1: Settings Sync 사용

**집에서 (처음):**
```
1. VS Code 설치
2. Settings Sync 켜기 (GitHub 로그인)
3. Prettier 확장 프로그램 설치
4. 폰트 크기 14로 변경
```

**회사에서:**
```
1. VS Code 설치
2. Settings Sync 켜기 (같은 GitHub 계정)
3. 자동으로:
   - Prettier 설치됨
   - 폰트 크기 14로 설정됨
   - 모든 설정 동일해짐! ✅
```

### 상황 2: .vscode 폴더 사용

**집에서:**
```bash
# .vscode/settings.json 작성
# .vscode/extensions.json 작성
git add .vscode/
git commit -m "Add VS Code config"
git push origin main
```

**회사에서:**
```bash
git pull origin main
# VS Code 열면 "추천 확장 설치" 알림
# 클릭해서 설치
# settings.json은 자동 적용됨
```

---

## ✅ 체크리스트

### 각 컴퓨터에서 1회만
- [ ] VS Code 설치
- [ ] Settings Sync 켜기 (GitHub 로그인)
- [ ] 프로젝트 클론 후 VS Code로 폴더 열기
- [ ] 추천 확장 프로그램 설치 (자동 알림)

### 또는 .vscode 폴더 사용
- [ ] 집에서 .vscode/settings.json 작성
- [ ] .vscode/extensions.json 작성
- [ ] Git에 커밋 & 푸시
- [ ] 회사에서 pull 후 확장 프로그램 설치

---

## 🔧 유용한 단축키

### Windows/Linux
- `Ctrl + P`: 파일 빠르게 열기
- `Ctrl + Shift + P`: 명령 팔레트
- `Ctrl + B`: 사이드바 토글
- `Ctrl + J`: 터미널 토글
- `Ctrl + /`: 주석 토글
- `Alt + ↑/↓`: 줄 이동
- `Shift + Alt + ↓`: 줄 복사

### Mac
- `Cmd + P`: 파일 빠르게 열기
- `Cmd + Shift + P`: 명령 팔레트
- `Cmd + B`: 사이드바 토글
- `Cmd + J`: 터미널 토글
- `Cmd + /`: 주석 토글
- `Option + ↑/↓`: 줄 이동
- `Shift + Option + ↓`: 줄 복사

---

## 📖 자주 묻는 질문

### Q: Settings Sync와 .vscode 폴더 중 뭘 써야 하나요?
```
둘 다 사용하는 것을 추천합니다!

- Settings Sync: 개인 설정 (폰트, 테마, 전역 단축키)
- .vscode: 프로젝트별 설정 (코드 스타일, 프로젝트 전용 확장)
```

### Q: Settings Sync가 작동하지 않아요
```
1. VS Code 재시작
2. 계정 로그아웃 후 다시 로그인
3. 설정 확인: Ctrl+Shift+P → "Sync: Show Settings"
```

### Q: 확장 프로그램이 자동 설치 안돼요
```
.vscode/extensions.json 파일 확인
VS Code에서 알림이 뜨면 "Install All" 클릭
또는 수동으로 Extensions 탭에서 설치
```
