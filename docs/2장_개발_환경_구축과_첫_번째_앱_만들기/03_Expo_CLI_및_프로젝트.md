# 3. Expo CLI(Command Line Interface) 및 프로젝트
- Expo CLI를 사용하여 새 프로젝트 생성하기
- 프로젝트의 파일 구조 이해하기
- package.json과 app.json의 역할 파악하기

---

### 3-1&#41; Expo CLI 설치 및 초기화
- Expo CLI는 Node.js와 npm을 사용하여 설치

1. Expo CLI 설치 : Bash <br />
① 터미널(Terminal)을 열고 다음 명령어를 입력 <br />
② 이 명령어는 npm을 사용하여 Expo CLI 도구를 전역(global, 시스템 전체)에 설치함
```bash
npm install -g expo-cli
```
```
📌 참고 
- 최근에는 npx를 사용하여 전역 설치 없이도 Expo 명령어를 실행하는 것이 권장됨
- npx를 사용한 프로젝트 생성 명령을 주로 사용함
```

2. 프로젝트 생성 명령 (권장) : Bash <br />
① 프로젝트를 만들 폴더로 이동한 후, 다음 명령어를 사용하여 새로운 React Native 프로젝트를 생성함
```bash
npx create-expo-app <프로젝트 이름>
```
- **npx**: 로컬에 설치되지 않은 npm 패키지(여기서는 create-expo-app)를 임시로 다운로드하여 실행해주는 Node.js의 도구
- **&lt;프로젝트 이름&gt;** : 실제 생성될 폴더 이름이자 앱의 이름 (예: MyFirstApp)

---

### 3-2&#41; 프로젝트 템플릿 선택 및 생성 완료
- `npx create-expo-app` 명령어를 실행하면, Expo CLI가 프로젝트를 설정하기 위해 몇 가지 질문을 하거나 템플릿을 선택

1. 템플릿 선택 (최신 Expo) <br />
① 최신 버전의 Expo에서는 단순함을 위해 기본 템플릿을 자동으로 사용 <br />
② 구 버전에서는 다음과 같은 템플릿을 선택할 수 있음 <br />
- `blank`(가장 권장): 빈 화면만 있는 가장 단순한 프로젝트 템플릿, 초심자가 코드를 처음부터 이해하기 가장 좋음
- `tabs`: 이미 하단 탭 내비게이션(Tab Navigation)이 설정되어 있는 복잡한 프로젝트 템플릿 (내비게이션을 배운 후 사용 권장)

2. 프로젝트 생성 완료 <br />
① 템플릿 선택 후, Expo CLI가 필요한 모든 파일과 패키지(라이브러리)들을 다운로드하고 설정하는 작업을 진행함 <br />
② 이 작업이 완료되면 다음 메시지와 함께 프로젝트 폴더가 생성됨
```bash
# 프로젝트가 준비되었습니다!
# To run your project, navigate to the directory and run one of the following:

npm start
yarn start
```

3. VS Code로 프로젝트 열기 : Bash <br />
- 생성된 폴더로 이동한 후, VS Code를 열어 프로젝트를 편집할 준비를 합니다.
```bash
cd <프로젝트 이름> code .
```

---

### 3-3&#41; 생성된 프로젝트의 주요 파일 구조
| 파일/폴더	| 설명 | 중요도 |
| :--: | :--: | :--: |
| `App.js` | **앱의 메인 진입점(Entry Point) 파일** <br /> 앱 화면에 표시될 모든 UI 컴포넌트와 로직이 여기서 시작됨 | 최상 |
| `app.json` | **Expo 프로젝트의 설정 파일** <br /> 앱 이름, 아이콘, 스플래시 화면, 버전 정보 등 모든 메타데이터를 정의 | 높음 |
| `node_modules/`	| 프로젝트가 의존하는 모든 외부 라이브러리(패키지)가 저장되는 폴더 <br /> 이 폴더는 Git 관리 대상에서 제외됨 | 중간 |
| `package.json` | 프로젝트에 설치된 모든 패키지 목록, 프로젝트 이름, 버전, 실행 스크립트(`npm start`등)가 정의된 파일	 | 중간 |
| `assets/`	| 이미지, 폰트 등 앱에서 사용할 정적 파일(Asset)을 저장하는 폴더 | 중간 |

- `App.js` 파일이 여러분이 앞으로 코드를 작성할 중심 파일
- `app.json`은 앱의 외형과 설정을 담당

---

