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

### 1-2&#41; JSX의 필수 규칙 및 주의사항
- JSX는 HTML과 매우 유사하지만, JavaScript의 규칙을 따르므로 몇 가지 중요한 차이점과 규칙이 있음

### ① 반드시 하나의 루트 요소로 감싸야 함 (Single Root Element)
- JSX에서 여러 요소를 나열할 때는 `반드시 하나의 최상위(루트) 요소`로 감싸야함
- 잘못된 예
```jsx
return ( <Text>첫 번째 텍스트</Text><Text>두 번째 텍스트</Text> ); // 오류 발생!
```
- 올바른 예 (하나의 <View>로 감싸기)
```jsx 
return ( <View> <Text>첫 번째 텍스트</Text> <Text>두 번째 텍스트</Text> </View> );
```
- Fragment 사용 (불필요한 제거)
  - 화면에 불필요한 를 추가하고 싶지 않다면, 또는 축약된 `<>...` 빈 태그를 사용하여 감싸기
```jsx
return ( <> <Text>첫 번째 텍스트</Text> <Text>두 번째 텍스트</Text> );
```

### ② 모든 태그는 닫혀야 함 (Self-Closing Tags)
React Native의 모든 컴포넌트 태그는 **반드시 닫혀야** 하며, 내용이 없는 태그는 자체 종료 태그를 사용해야 합니다.

- 잘못된 예 : ```<Image src="..." >```
- 올바른 예
- 내용이 있다면 : `<View><Text>내용</Text></View>`
- 내용이 없다면 : `<Image source={...} />` 또는 `<View />`

### ③ JavaScript 값 삽입: 중괄호 `{}`
- JSX 내부에서 변수, 함수 호출 결과, Props 값 등 **JavaScript의 실제 값**을 사용하려면 반드시 `중괄호 {}` 안에 넣어야 함
```jsx
const userName = "철수";
const isLogin = true;

return (
  <View>
    {/* 변수 userName을 중괄호 안에 넣어 삽입 */}
    <Text>안녕하세요, {userName}님!</Text> 

    {/* 삼항 연산자(JavaScript 문법) 결과를 삽입 */}
    <Text>{isLogin ? '로그아웃' : '로그인'}</Text>
  </View>
);
```

### ④ 속성 이름 규칙 (CamelCase)
- HTML에서는 `class`, `onclick`등의 속성을 사용하지만, JSX에서는 JavaScript 문법 규칙을 따르기 때문에 속성 이름이 `camelCase`로 변경

| HTML 속성 | JSX 속성 | React Native 용도 |
| :--: | :--: | :--: |
| `class` | 	`className`(React Web) | React Native에서는 주로 `style` 사용 |
| `for` | 	`htmlFor` | (React Native에서는 사용 안함) |
| `onclick` | 	`onPress` | 버튼 클릭 등의 이벤트를 처리할 때 사용 |

- 특히 스타일을 적용할 때 `style`속성을 사용하며, 이 속성의 값은 **JavaScript 객체**
```jsx
// style 속성의 값은 중괄호 {} 안에 JavaScript 객체({})를 넣음
<Text 
    style={{ color: 'red', fontSize: 20 }} // 이중 중괄호는 JavaScript 객체를 의미
    onPress={() => console.log('클릭됨')} // 함수 호출을 중괄호 안에 넣음
>
  클릭 가능한 텍스트
</Text>
```

---