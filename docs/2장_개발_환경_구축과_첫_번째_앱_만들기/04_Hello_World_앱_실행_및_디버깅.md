# 4. Hello World 앱 실행 및 디버깅

### 4-1&#41; 프로젝트 실행 : 개발 서버 띄우기
- 프로젝트를 실행하려면, 먼저 개발 서버를 시작해야함
- 이 서버가 여러분이 작성한 JavaScript 코드를 읽어 들여 스마트폰(또는 시뮬레이터)으로 전송해 주는 역할
1. **프로젝트 폴더로 이동** : VS Code 터미널이나 일반 터미널을 열어, 이전에 `npx create-expo-app` 명령으로 만들었던 프로젝트 폴더로 이동
```Bash
cd <프로젝트 이름>
```
2. **개발 서버 시작** : 다음 명령어를 입력하여 Expo 개발 서버를 시작
```Bash
npx expo start
```
3. **Expo 개발자 도구 (DevTools) 확인** : 명령어를 실행하면 잠시 후 웹 브라우저가 자동으로 열리면서 **Expo DevTools**라는 화면이 나타남(만약 브라우저가 열리지 않으면, 터미널에 표시된 주소로 직접 접속)

- 이 DevTools는 여러분의 앱을 시작하고 관리하는 컨트롤 타워 역할
- 터미널 화면에는 다음과 같은 실행 옵션이 나타남

```
› Press a for Android... 
› Press i for iOS simulator... 
› Press w to open web... 
› Press r to restart bundler...
QR code is available to scan!`
```

<img width="684" height="723" alt="image" src="https://github.com/user-attachments/assets/acdeeaf8-0fa7-4327-9728-ddecdbc926ac" />

---

