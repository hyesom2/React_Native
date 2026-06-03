# 2. VS Code : 코드 편집기
- VS Code (Visual Studio Code)는 코드를 작성하는 데 사용하는 전문적인 `코드 편집기(Code Editor)`

---

### 2-1&#41; VS Code의 장점
1. `가벼움` : 매우 가볍고 빠르며, 복잡한 기능을 로딩하는 데 시간이 오래 걸리지 않음
2. `강력한 확장성` : React, JavaScript, TypeScript, Expo 등을 포함한 모든 종류의 개발 환경을 지원하는 수많은 확장(Extension) 기능을 제공
3. `디버깅 기능` : VS Code 내에서 바로 코드를 실행하고 디버깅할 수 있는 강력한 기능을 제공

---

### 2-2&#41; 설치 방법
1. 공식 웹사이트 방문 : [VS Code 공식 웹사이트](https://code.visualstudio.com/)에 접속
2. OS에 맞는 버전 다운로드 : 자신의 운영체제(Windows, macOS, Linux)에 맞는 버전을 다운로드하고 설치

---

### 2-3&#41; 필수 확장 프로그램 (Extensions)
설치 후 VS Code를 열어 왼쪽 사이드바의 `확장(Extensions)` 아이콘(네 개의 작은 사각형 모양)을 클릭하고 다음 확장 프로그램을 설치하면 개발 효율이 크게 향상됨

### 1. Prettier - Code formatter (필수!)
- **목적** : 코드를 자동으로 예쁘게 정렬해주는 도구
- **장점** : 들여쓰기, 따옴표, 세미콜론 등을 일관된 스타일로 자동 정렬
- **설치 방법**
1. Extensions 탭에서 "Prettier"를 검색 
2. "Prettier - Code formatter" 설치
3. 설치 후 파일을 저장할 때마다 자동으로 코드가 정렬되도록 설정
  - Ctrl + , (Windows/Linux) 또는 Cmd + , (Mac)로 설정 열기
  - 검색창에 "format on save" 입력
  - "Format On Save" 옵션 체크

### 2. ES7+ React/Redux/React-Native snippets (필수!)
- **목적** : React Native 코드를 빠르게 작성할 수 있는 단축어(Snippet)를 제공
- **예시** : `rnf` + Tab → 함수형 컴포넌트 자동 생성
- **유용한 단축어 예시**
  - `rnf` → React Native 함수형 컴포넌트
  - `rnfe` → React Native 함수형 컴포넌트 (export 포함)
  - `imp` → import 문 자동 생성
  - `log` → console.log() 자동 생성

### 3. React Native Tools (권장)
- **목적** : React Native 앱 디버깅을 VS Code 내에서 직접 할 수 있음
- **장점** : 브레이크포인트 설정, 변수 검사 등 강력한 디버깅 기능 제공

### 4. Auto Rename Tag (권장)
- **목적** : JSX 태그의 여는 부분을 수정하면 닫는 부분도 자동으로 수정
- **예시** : `<View>`를 `<Text>`로 바꾸면 `</View>`도 자동으로 `</Text>`로 변경

### 5. Bracket Pair Colorizer (선택)
- **목적** : 중괄호, 대괄호 등을 색상으로 구분해 코드 가독성을 높임
- **참고** : 최신 VS Code 버전에는 이 기능이 기본 내장

---

### 2-3&#41; VS Code 추천 설정
### 1. 자동 저장 활성화
- 파일을 매번 Ctrl + S로 저장하지 않아도 자동으로 저장됨
```
설정(Settings) → "auto save" 검색 → "afterDelay" 선택
```

### 2. 미니맵 숨기기 (선택사항)
- 화면이 작은 노트북에서 코드 공간을 더 넓게 사용
```
설정(Settings) → "minimap" 검색 → "Editor: Minimap Enabled" 체크 해제
```

### 3. 터미널 기본 쉘 설정 (Windows)
```
Ctrl + Shift + P → "Select Default Profile" → PowerShell 또는 Git Bash 선택
```

---

### 2-4&#41; VS Code 필수 단축키
| 단축키 (Windows/Linux) | 단축키 (Mac) | 기능 |
| :--: | :--: | :--: |
| `Ctrl + P` |	`Cmd + P` | 파일 빠르게 열기 |
| `Ctrl + Shift + P` | `Cmd + Shift + P` | 명령 팔레트 열기 |
| `Ctrl + B` |	`Cmd + B` | 사이드바 토글 |
| `Ctrl + J` |	`Cmd + J` |	터미널 패널 토글 |
| `Ctrl + /` |	`Cmd + /` | 주석 처리/해제 |
| `Alt + Up/Down` | `Option + Up/Down` | 현재 줄 위/아래로 이동 |
| `Ctrl + D` |	`Cmd + D` |	같은 단어 다중 선택 |

---