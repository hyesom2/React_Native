# 1. JSX 문법 이해 : 자바스크립트 속 HTML 작성하기
- React Native 앱 화면을 만들 때 가장 먼저 접하고 가장 많이 사용하는 문법이 바로 **JSX (JavaScript XML)**
- JSX는 JavaScript 파일 내부에서 HTML처럼 보이는 구조를 작성할 수 있도록 해주는 문법 확장 기능
- JSX를 통해 개발자는 코드가 실행될 **모바일 UI의 모양과 구조**를 매우 **직관적**으로 표현

---

### 1-1&#41; JSX란 무엇인가요?
- JSX는 React 개발팀이 만든 문법 확장 기능으로, JavaScript와 XML/HTML의 장점을 결합한 것
- **목적** : 복잡한 UI 요소를 JavaScript 코드로 직접 생성하는 대신, **선언적(Declarative)** 이고 **시각적**인 방식으로 UI 구조를 표현
- **변환** : 브라우저나 모바일 기기는 JSX 코드를 직접 이해하지 못하기 때문에, 우리가 작성한 JSX 코드는 빌드 과정을 거쳐 최종적으로 네이티브 컴포넌트를 생성하는 **순수한 JavaScript 함수 호출**로 변환
- 기본 구조
```jsx
function App() {
  // JSX를 반환합니다. 이 코드가 화면에 표시될 구조입니다.
  return (
    <View style={styles.container}>
      <Text>Hello, React Native!</Text>
    </View>
  );
}
```

---