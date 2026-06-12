# 2. 함수형 컴포넌트의 Props
- React Native 앱을 만드는 핵심 개념은 `컴포넌트(Component)`와 `Props(속성)`
- 앱 화면을 구성하는 기본 블록과, 그 블록에 원하는 정보를 전달하는 통로 역할

### ※ 컴포넌트를 이해하기 위한 비유
- 컴포넌트를 **레고 블록**에 비유 → 앱의 UI도 작은 컴포넌트들을 조합하여 만듦
1. 각 레고 블록은 독립적으로 존재(재사용 가능)
2. 여러 블록을 조합하여 큰 구조물을 만듦(조합)
3. 같은 블록을 여러 곳에서 사용 가능(재사용성)

---

### 2-1&#41; 함수형 컴포넌트 (Function Component)의 이해
- 컴포넌트 : 화면에 표시되는 UI의 모든 조각(버튼, 텍스트, 이미지 등)을 의미하며, `재사용 가능한 독립적인 단위`

### ① 함수형 컴포넌트의 정의
- 함수형 컴포넌트는 이름 그대로 `JavaScript 함수`의 형태로 정의
- 이 함수는 화면에 그려질 내용을 담고 있는 `JSX (JavaScript XML)`를 반환

```jsx
// Greeting이라는 이름의 함수형 컴포넌트를 정의합니다.
// 함수 이름은 항상 대문자로 시작하는 것이 관례입니다.
function Greeting() {
  return (
    // 반환 값은 JSX입니다. 화면에 표시될 UI 구조를 담고 있습니다.
    <View style={styles.container}> 
      <Text style={styles.title}>안녕하세요! React Native</Text>
    </View>
  );
}

// 이 함수가 React Native에게 UI를 그리도록 지시하는 역할을 합니다.
```

### ② 사용 (렌더링)
- 정의된 컴포넌트는 마치 HTML 태그처럼 `<컴포넌트이름 />` 형태로 다른 컴포넌트 안에서 사용(렌더링)
```jsx
// App.js
function App() {
  return (
    <View>
      <Greeting /> {/* Greeting 컴포넌트를 사용 */}
      <Greeting /> {/* 필요할 때마다 재사용 가능 */}
    </View>
  );
}
```

---
