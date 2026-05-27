# 04. React Native의 핵심 - 동작 원리

### ※ 웹 개발과의 차이점 이해
- 웹 개발에서는
  - `HTML`이 화면 구조를 정의
  - `CSS`가 스타일을 담당
  - `JavaScript`가 로직을 처리
- React Native에서는
  - `JavaScript`로 로직을 작성
  - 실제 화면은 `운영체제의 네이티브 컴포넌트`로 그려짐

---

### 4-1&#41; React Native의 두 가지 세계
1. `자바스크립트(JavaScript)` 세계
- 역할 : 개발자가 작성한 `모든 앱 로직이 실행`되는 곳(컴포넌트, 상태 관리, 비즈니스 로직, API 호출 등)
- 환경 : 웹 브라우저가 아닌, 기기 내부의 특수 환경(iOS의 JavaScriptCore, Android의 Hermes/V8)에서 실행
- 웹 개발자 관점: 브라우저의 JavaScript 엔진(V8)과 비슷하지만, 모바일 기기 내부에서 실행됨

2. `네이티브(Native)` 세계
- 역할: 실제 `사용자 인터페이스(UI)를 화면에 그리는 역할`을 담당(iOS의 UIView, Android의 android.view 등)
- 환경 : 기기의 운영체제(OS)가 직접 관리하는 영역
- 웹 개발자 관점: 마치 브라우저의 렌더링 엔진이 HTML을 화면에 그리는 것과 같지만, 여기서는 OS가 네이티브 컴포넌트를 그림 

---

### 4-2&#41; Bridge와 JSI: 두 세계를 잇는 통역사
- 두 세계(JavaScript와 Native)는 서로 다른 언어와 환경을 사용하기 때문에 직접 대화할 수 없음
- 이 둘을 연결하고 통신하게 해주는 핵심 요소가 바로 `Bridge(브릿지)`와 `JSI(JavaScript Interface)`

#### 1. `Bridge (과거 방식)`
- 원리 : Bridge는 JavaScript 세계와 Native 세계 사이에서 `JSON 형태`의 메시지를 통해 통신하는 방식
- 통신 과정 <br />
  ① JavaScript에서 네이티브 기능(예: 버튼 클릭)을 요청 <br />
  ② 이 요청은 JSON 메시지로 변환되어 Bridge를 통해 Native 쪽으로 `비동기적`으로 전달 <br />
  ③ Native 코드가 요청을 처리하고, 결과를 다시 JSON 메시지로 변환하여 Bridge를 통해 JavaScript로 보냄
```js
// JavaScript에서 버튼 클릭 처리

function handlePress() {
  // Bridge를 통해 Native로 메시지 전송
  // { type: 'BUTTON_PRESS', id: 'loginButton' }
  // ↓ (JSON 변환 및 전송)
  // Native에서 처리
  // ↓ (결과를 JSON으로 변환)
  // { success: true }
}
```
- 단점 : 이 비동기적인 JSON 직렬화/역직렬화 과정이 오버헤드(부하)를 발생시켜 앱의 속도, 특히 복잡하거나 애니메이션이 많은 앱에서 성능 저하
- 웹 개발자 관점 : 마치 매번 `JSON.stringify()`와 `JSON.parse()`를 거쳐야 하는 것 같음
- 성능 영향 : 스크롤이나 애니메이션 중에 이 과정이 반복되면 버벅임이 발생

---

#### 2. `JSI (JavaScript Interface) (현재 표준 방식)`
- 원리 : React Native 팀은 성능 문제를 해결하기 위해 `JSI`를 도입함. JSI는 JSON 메시지를 주고받는 Bridge와 달리, JavaScript 엔진이 Native 코드의 함수와 객체를 `직접 호출`할 수 있게 해주는 저수준(Low-level) 인터페이스
- `JSI의 혁신`
1. 과거 (Bridge)
```
JavaScript → JSON 변환 → Bridge → Native → 처리 → JSON 변환 → JavaScript
(느림, 비동기)
```
2. 현재 (JSI)
```
JavaScript → 직접 호출 → Native → 처리 → 직접 반환 → JavaScript
(빠름, 동기 가능)
```

※ `장점 (Fabric & TurboModules)`
1. `동기적 호출 가능` : 통신이 더 이상 비동기 메시지 기반일 필요가 없어졌고, 필요한 경우 `동기적`으로 함수를 호출할 수 있음
- 예시: 레이아웃 계산처럼 즉시 결과가 필요한 작업에서 성능 향상이 큽니다.

2. `오버헤드 감소` : JSON 직렬화/역직렬화 과정이 사라지면서 통신 속도가 `극적으로 빨라짐`
- 비유: 전화로 대화하는 것(Bridge)에서 직접 만나서 대화하는 것(JSI)으로 바뀐 것

3. `네이티브와의 밀착` : JavaScript와 Native 코드가 더욱 긴밀하게 통합되어, 네이티브 앱과 거의 차이가 없는 빠른 성능과 사용자 경험을 제공
- 실무 영향: 2023년 이후 React Native 0.68+ 버전부터 JSI가 기본으로 활성화되어, 대부분의 앱에서 성능 문제가 해결

※ 웹 개발자에게 친숙한 비유
- `Bridge 방식` : `postMessage` API로 iframe과 통신하는 것 (느림, 비동기)
- `JSI 방식` : 직접 함수를 호출하는 것 (빠름, 동기)
- React Native의 JSI는 마치 JavaScript에서 C++ 함수를 직접 호출할 수 있게 해주는 것과 같음

---

### 4-3&#41; 컴포넌트 렌더링 과정 (핵심 이해)
- 실제 코드 예시로 따라가기
```js
// 1단계: 개발자가 작성한 코드

function WelcomeScreen() {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>안녕하세요!</Text>
      <Button title="시작하기" onPress={() => console.log('클릭!')} />
    </View>
  );
}
```
- 렌더링 과정 상세 설명
1. `개발자 코드`
- 개발자는 React와 JSX 문법을 사용하여 `<View>`, `<Text>` 등의 컴포넌트를 작성
- 웹 개발자 관점 : HTML을 작성하는 것과 매우 유사함
- 차이점 : `div` 대신 `View`, `h1` 대신 `Text`를 사용

2. `레이아웃 계산 (JavaScript)`
- JavaScript 세계에서 `Yoga`라는 크로스 플랫폼 레이아웃 엔진이 Flexbox 스타일을 기반으로 컴포넌트들의 크기와 위치(레이아웃)를 계산
- `Yoga란?` : Facebook에서 개발한 레이아웃 엔진으로, CSS Flexbox와 거의 동일한 방식으로 작동
- 웹 개발자 관점 : 브라우저가 CSS를 해석하여 레이아웃을 계산하는 것과 같음
- 예시: padding: 20은 "모든 방향에 20픽셀 여백"으로 계산됨

3. `네이티브 명령 전달`
- 레이아웃 계산이 끝나면, React Native는 JSI를 통해 "이 위치에 이 크기의 iOS의 `UIView`(또는 Android의 `android.view`)를 그려라"는 명령을 Native 세계에 전달함
- 구체적 예시
  - iOS: "좌표 (0, 0)에 크기 375x812인 UIView를 생성하고, 그 안에 좌표 (20, 20)에 크기 335x30인 UILabel을 배치하라"
  - Android: "좌표 (0, 0)에 크기 375x812인 ViewGroup을 생성하고, 그 안에 좌표 (20, 20)에 크기 335x30인 TextView를 배치하라"

4. `UI 렌더링 (Native)`
- Native 세계는 이 명령을 받아 기기에 내장된 실제 `네이티브 컴포넌트`를 사용하여 화면에 UI를 그림
- 결과 : 사용자는 실제 iOS의 `UIView`나 Android의 `android.view`를 봄 
- 성능 : 네이티브 컴포넌트이기 때문에 스크롤, 애니메이션, 터치 반응이 매우 부드러움

--- 

### 4-4&#41; 웹과의 차이점 비교
| 웹 개발	| React Native |
| :--: | :--: |
| HTML 요소 (`<div>`, `<button>`) |	네이티브 컴포넌트 (`<View>`, `<Button>`) |
| 브라우저가 HTML을 렌더링 | OS가 네이티브 컴포넌트를 렌더링 |
| CSS로 스타일링 | Flexbox 기반 스타일 (CSS와 유사) |
| DOM (Document Object Model) |	네이티브 뷰 계층 구조 |

### ※ 핵심 포인트
- React Native는 웹 브라우저의 HTML을 그리는 것이 아니라, JavaScript로 작성한 명령을 Native 세계로 보내 `실제 네이티브 UI 요소`를 움직이게 하는 것이 핵심
- React Native 앱이 웹 앱처럼 보이지 않고 네이티브 앱처럼 빠르고 자연스러운 사용자 경험을 제공하는 이유
- `웹 앱과의 차이`: 웹 앱은 브라우저 위에서 실행되지만, React Native 앱은 OS 위에서 직접 실행
- `성능` : 네이티브 컴포넌트를 사용하므로, 웹 앱보다 훨씬 빠르고 부드러움
- `사용자 경험` : 사용자는 네이티브 앱과 구별할 수 없을 정도로 자연스러운 경험을 느낌

---