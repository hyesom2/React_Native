# 03. React Native의 등장 배경과 장점

### 3-1&#41; React Native의 탄생
- React Native는 `페이스북(Meta)`이 개발한 기술
- 웹 개발에 사용되던 인기 있는 JavaScript 라이브러리인 React의 철학을 모바일 앱 개발에 가져온 것
- 배경 : 페이스북은 웹 개발에 능숙한 개발자들이 익숙한 JavaScript를 사용하여 네이티브 앱과 같은 경험을 제공하는 모바일 앱을 만들기를 원함
- 시작점 : 2015년에 공개된 이후, Instagram, Facebook, Airbnb, Uber Eats 등 수많은 대형 서비스에서 사용되며 검증됨

---

### 3-2&#41; 웹 개발자라면 이미 알고 있는 것
```js
// 웹 React (익숙한 코드)

function App() {
  return (
    <div>
      <h1>안녕하세요!</h1>
      <button onClick={() => alert('클릭!')}>클릭</button>
    </div>
  );
}
```
```js
// React Native (거의 동일한 코드)

import { View, Text, Button } from 'react-native';

function App() {
  return (
    <View>
      <Text>안녕하세요!</Text>
      <Button title="클릭" onPress={() => alert('클릭!')} />
    </View>
  );
}
```
- 문법이 거의 동일 : `div` → `View`, `h1` → `Text`, `button` → `Button`으로 변경

---

### 3-3&#41; React Native의 핵심 장점
1. `JavaScript 사용`
- 개발자에게 익숙한 JavaScript 언어로 모바일 앱을 만들 수 있음 
- 새로운 언어(Swift/Kotlin)를 배울 필요가 거의 없음
- 학습 곡선 : React를 이미 알고 있다면, React Native 학습 시간이 크게 단축
- 기존 지식 활용 : JavaScript의 map, filter, async/await, useState, useEffect 등 모든 개념이 그대로 사용

2. `진정한 네이티브 UI`
- React Native는 웹 뷰(WebView)를 사용하는 것이 아닌, 실제 네이티브 컴포넌트 (iOS의 UIView, Android의 android.view)를 사용하여 화면을 그림
- 사용자는 네이티브 앱과 거의 구별할 수 없는 빠르고 자연스러운 사용자 경험을 느낄 수 있음
- 웹 앱과의 차이 : 웹 뷰를 사용하는 하이브리드 앱과 달리, React Native는 실제 네이티브 컴포넌트를 렌더링
- 성능 : 스크롤, 애니메이션, 터치 반응이 네이티브 앱과 동일한 수준

3. `활발한 생태계` : 웹의 React 커뮤니티가 매우 크기 때문에, 모바일 개발에 필요한 라이브러리와 자료가 풍부함
- npm 패키지 : 많은 웹 라이브러리(예: axios, lodash, date-fns)가 React Native에서도 그대로 사용 가능
- 커뮤니티 : Stack Overflow, GitHub, Medium 등에 풍부한 자료와 예제가 있음

4. `Hot Reloading/Fast Refresh`
- 코드를 수정하면 앱을 다시 빌드할 필요 없이 몇 초 만에 변경 사항을 바로 확인할 수 있어 개발 속도가 매우 빠름
- 웹 개발 경험과 동일 : npm start로 웹 개발하던 것처럼, React Native도 코드 저장만으로 즉시 변경사항을 확인할 수 있음 
- 개발 효율성 : 네이티브 개발처럼 매번 빌드하고 설치하는 과정이 필요 없음

---

### 3-4&#41; React Native가 웹 개발자에게 최적인 이유
| 웹 개발 | React Native에서의 활용 |
| :--: | :--: |
| React 컴포넌트 작성 |	동일한 방식으로 모바일 컴포넌트 작성 |
| useState, useEffect 훅 사용 |	모바일 앱에서도 동일하게 사용 |
| JavaScript 비동기 처리 |	API 호출, 데이터 처리 방식 동일 |
| CSS 스타일링	| Flexbox 기반 스타일링 |
| npm 패키지 관리 |	동일한 npm 생태계 사용 |