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

### 4-3&#41; 'Hello World!' 코드 작성
```tsx
// index.tsx : blank 템플릿의 App.js와 동일

import { StyleSheet, Text, View } from 'react-native';


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.helloText}>Hello World! (나의 첫 React Native 앱)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  helloText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'blue',
  }
});
```

---

### 4-4.&#41; 기본적인 디버깅 방법 (Console과 Fast Refresh)

### ① 콘솔 로깅 (Console Logging)
- 웹 개발과 마찬가지로, `console.log()`함수를 사용하여 변수나 상태 값을 확인

```tsx
// 예시

...

export default function App() {
  const message = "앱이 시작되었습니다!";
  console.log(message); // 이 값이 어디에 표시될까요?

  const user = { name: '홍길동', age: 25 };
  console.log('사용자 정보:', user); // 객체도 출력 가능

  return (
    <View style={styles.container}>
      <Text>Hello World!</Text>
    </View>
  );
}

...
```
- 이 console.log()의 출력은 **Expo DevTools를 실행했던 터미널**에 나타남
- 항상 터미널 창을 열어두고 로그를 확인하는 습관을 들이자.

### ※ 다양한 콘솔 함수들
```
console.log('일반 로그');            // 정보 출력
console.warn('경고 메시지');         // 노란색 경고 (앱에 노란 배경으로 표시됨)
console.error('에러 메시지');        // 빨간색 에러 (앱에 빨간 화면으로 표시됨)
console.table([{a:1, b:2}, {a:3, b:4}]); // 테이블 형태로 출력
```

<img width="169" height="497" alt="image" src="https://github.com/user-attachments/assets/bc94be4d-ee49-444c-b23e-58d6bf036746" />

### ② Fast Refresh (빠른 새로고침)
- React Native와 Expo의 가장 강력한 기능 중 하나
- 원리
  - 개발자가 JavaScript 코드를 저장하면, 앱의 상태를 유지한 채로 `변경된 부분`만 빠르게 업데이트하여 화면에 반영
  - 앱을 종료하고 다시 시작할 필요가 없음
- 활용 : 방금 'Hello World!' 코드를 수정했을 때, 여러분이 저장하는 순간 앱이 자동으로 바뀌면서 개발 속도가 몇 배나 빨라짐

### ※ Fast Refresh 작동 확인하기
1. `App.js`에서 텍스트를 변경 : `<Text>안녕하세요!</Text>`
2. 파일을 저장하세요 (`Ctrl + S` 또는 `Cmd + S`)
3. 1초 이내에 스마트폰의 앱이 자동으로 업데이트되는 것을 확인

```
⚠️ 주의사항 
- 코드가 너무 복잡하게 꼬이거나 네이티브 코드를 건드리는 경우, Fast Refresh가 실패할 수 있음
- 이때는 터미널에서 "r 키"를 눌러 앱을 전체적으로 다시 로드하거나, 서버를 완전히 껐다가("Ctrl + C") 다시 "npx expo start"로 시작
```

### ③ 에러 화면 읽는 법

### ※ 에러 화면의 구성
```
Error: Text strings must be rendered within a <Text> component.

in RCTText (at App.js:12:5)
in View (at App.js:10:5)
in App (at AppEntry.js:6:9)
```

### ※ 에러 메시지 분석
1. **첫 번째 줄** : 무엇이 문제인지 설명 → "텍스트는 반드시 <Text> 컴포넌트 안에 있어야 합니다"
2. **Stack Trace** : 오류가 발생한 위치를 알려줌 → App.js의 12번째 줄에 문제가 있다는 의미

### ④ 일반적인 오류와 해결 방법

### 오류 1: "Invariant Violation: Text strings must be rendered within a component"
- 원인 : 문자열을 <Text> 컴포넌트 없이 직접 렌더링함
- 잘못된 코드
```tsx
<View>
  Hello World  {/* 오류! */}
</View>
```
- 올바른 코드
```tsx
<View>
  <Text>Hello World</Text>
</View>
```

### 오류 2: "Cannot read property 'xxx' of undefined"
- 원인 : 정의되지 않은 변수나 객체의 속성에 접근하려함
- 잘못된 코드
```tsx
const user = null;
console.log(user.name); // 오류! user가 null임
```
- 올바른 코드
```tsx
const user = null;
console.log(user?.name); // Optional chaining 사용
// 또는
console.log(user && user.name); // 조건부 접근
```

### 오류 3: "Warning: Each child in a list should have a unique 'key' prop"
- 원인 : 리스트를 렌더링할 때 각 항목에 고유한 key를 지정하지 않음
- 잘못된 코드
```tsx
{items.map(item => <Text>{item}</Text>)}
```
- 올바른 코드
```tsx
{items.map((item, index) => <Text key={index}>{item}</Text>)}
```

### 오류 4: "Invariant Violation: Element type is invalid"
- 원인 : 컴포넌트를 잘못 import 했거나 오타가 있음
- 잘못된 코드
```tsx
import { Text, View } from 'React-Native'; // 소문자 오타!
```
- 올바른 코드
```tsx
import { Text, View } from 'react-native'; // 전부 소문자
```

### ⑤ 5. React Native Debugger 사용하기
- 더 고급 디버깅을 위해 React Native Debugger를 사용
- 활성화 방법
1. Expo Go 앱에서 스마트폰을 흔들어 개발자 메뉴를 열기
2. "Debug Remote JS" 또는 "Open Debugger" 선택
3. 웹 브라우저가 열리며 Chrome DevTools가 나타남

- DevTools에서 할 수 있는 것
1. Console 탭: 모든 `console.log()` 출력 확인
2. Sources 탭: 코드에 브레이크포인트 설정
3. Network 탭: API 요청/응답 모니터링
4. Elements 탭: 컴포넌트 구조 확인

### ⑥ 성능 모니터 활용하기
- 앱의 성능을 실시간으로 확인하는 방법
1. Expo Go 앱에서 스마트폰을 흔들어 개발자 메뉴를 엽니다
2. "Show Performance Monitor" 선택
3. 화면에 FPS(초당 프레임), JS 스레드, UI 스레드 정보가 표시됨

- 성능 지표 읽는 법
- **FPS** : 60에 가까울수록 좋음 (부드러운 애니메이션)
- **JS** : JavaScript 스레드 사용률
- **UI** : 네이티브 UI 스레드 사용률

---