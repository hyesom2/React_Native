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