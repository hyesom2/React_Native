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

### 4-2&#41; 앱 실행 방법 (3가지 옵션)

### 1. 실제 스마트폰으로 테스트 (가장 권장)
- 실제 사용자 환경에서 테스트할 수 있어 가장 권장

① **앱 설치** : iOS(App Store) 또는 Android(Google Play)에서 **Expo Go 앱**을 다운로드하여 설치 <br />
② **QR 코드 스캔** : Expo DevTools 화면에 표시된 **QR 코드**를 스마트폰의 기본 카메라 앱이나 Expo Go 앱 내의 스캐너로 스캔 <br />
③ 앱 실행 : 잠시 후 스마트폰의 Expo Go 앱에서 여러분이 만든 'Hello World' 앱이 로드되어 실행됨

### 2. iOS 시뮬레이터에서 실행 (Mac 사용자)
- macOS를 사용하고 Xcode가 설치되어 있다면 시뮬레이터를 이용할 수 있음

① 터미널에서 `i` 키를 누름 <br />
② 잠시 후 iOS 시뮬레이터가 실행되면서 앱이 자동으로 로드됨

### 3. Android 에뮬레이터에서 실행
- Android Studio를 통해 에뮬레이터 설정을 완료했다면 이 방법을 사용

① 터미널에서 `a` 키를 누름 <br />
② 설정된 Android 에뮬레이터가 실행되면서 앱이 자동으로 로드됨

---