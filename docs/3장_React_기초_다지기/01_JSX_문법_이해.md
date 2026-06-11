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

### 1-3&#41; JSX 실전 예제와 팁

### ① JSX vs 순수 JavaScript 비교

**※ 순수 JavaScript (JSX 없이)**
```js
// 매우 복잡하고 읽기 어려움

React.createElement(
  View,
  { style: styles.container },
  React.createElement(Text, null, 'Hello'),
  React.createElement(Text, null, 'World')
);
```

**※ JSX 사용**
```jsx
// 훨씬 직관적이고 읽기 쉽습니다!
<View style={styles.container}>
  <Text>Hello</Text>
  <Text>World</Text>
</View>
```

### ② JSX에서 주석 작성하기
- JSX 내부에서 주석을 작성하려면 특별한 문법을 사용
```jsx
function App() {
  return (
    <View>
      {/* JSX 내부 주석: 중괄호 안에 작성합니다 */}
      <Text>안녕하세요</Text>

      {/* 
        여러 줄 주석도
        이렇게 작성할 수 있습니다
      */}

      {/* 이렇게 하면 안 됩니다: // 주석 */}
      {/* HTML 주석도 작동하지 않습니다: <!-- 주석 --> */}
    </View>
  );
}
```

### ③ JSX에서 JavaScript 표현식 사용하기
- 중괄호 {}를 사용하면 모든 JavaScript 표현식을 사용 가능
```jsx
function ProductCard() {
  const productName = "스마트폰";
  const price = 1200000;
  const discount = 0.1;
  const inStock = true;

  return (
    <View style={styles.card}>
      {/* 1. 변수 출력 */}
      <Text>제품: {productName}</Text>

      {/* 2. 연산 결과 출력 */}
      <Text>가격: {price * (1 - discount)}원</Text>

      {/* 3. 삼항 연산자 */}
      <Text>{inStock ? '재고 있음' : '품절'}</Text>

      {/* 4. 논리 연산자 (&&) */}
      {inStock && <Text style={styles.badge}>구매 가능</Text>}

      {/* 5. 함수 호출 */}
      <Text>{formatPrice(price)}</Text>

      {/* 6. 배열 메서드 */}
      <Text>{productName.toUpperCase()}</Text>
    </View>
  );
}
```

### ④ 조건부 렌더링 패턴
- JSX에서 조건에 따라 다른 UI를 보여주는 여러 가지 방법이 존재

**※ 방법 1 : 삼항 연산자 (가장 일반적)**
```jsx
function WelcomeMessage({ isLoggedIn }) {
  return (
    <View>
      {isLoggedIn ? (
        <Text>환영합니다, 사용자님!</Text>
      ) : (
        <Text>로그인이 필요합니다</Text>
      )}
    </View>
  );
}
```

**방법 2 : 논리 AND 연산자 (&&)**
```jsx
function Notification({ hasNewMessage, messageCount }) {
  return (
    <View>
      {hasNewMessage && (
        <Text>새 메시지 {messageCount}개가 있습니다</Text>
      )}
    </View>
  );
}
```

**방법 3 : 변수에 저장 (복잡한 조건)**
```jsx
function UserStatus({ user }) {
  let statusComponent;

  if (user.isPremium) {
    statusComponent = <Text style={styles.premium}>프리미엄 회원</Text>;
  } else if (user.isVerified) {
    statusComponent = <Text style={styles.verified}>인증 회원</Text>;
  } else {
    statusComponent = <Text style={styles.basic}>일반 회원</Text>;
  }

  return <View>{statusComponent}</View>;
}
```

**방법 4 : 즉시 실행 함수 (IIFE)**
```jsx
function ComplexCondition({ status }) {
  return (
    <View>
      {(() => {
        switch(status) {
          case 'loading': return <Text>로딩 중...</Text>;
          case 'success': return <Text>성공!</Text>;
          case 'error': return <Text>오류 발생</Text>;
          default: return <Text>대기 중</Text>;
        }
      })()}
    </View>
  );
}
```

### ⑤ 리스트 렌더링 (배열을 UI로 변환)
- 배열의 각 항목을 UI 요소로 변환하는 것은 매우 자주 사용되는 패턴

**예시 1 : 배열**
```jsx
function TodoList() {
  const todos = ['장보기', '운동하기', '코딩 공부', '책 읽기'];

  return (
    <View>
      <Text style={styles.title}>할 일 목록</Text>
      {todos.map((todo, index) => (
        // key prop는 필수입니다!
        <Text key={index} style={styles.todoItem}>
          {index + 1}. {todo}
        </Text>
      ))}
    </View>
  );
}
```

**예시 2 : 객체 배열**
```jsx
function UserList() {
  const users = [
    { id: 1, name: '김철수', age: 25 },
    { id: 2, name: '박영희', age: 30 },
    { id: 3, name: '이민수', age: 28 }
  ];

  return (
    <View>
      {users.map(user => (
        <View key={user.id} style={styles.userCard}>
          <Text>이름: {user.name}</Text>
          <Text>나이: {user.age}세</Text>
        </View>
      ))}
    </View>
  );
}
```

```
📌 참고
- 리스트를 렌더링할 때는 반드시 각 항목에 고유한 "key prop"을 제공해야 함
- React가 어떤 항목이 변경, 추가, 삭제되었는지 효율적으로 파악하는 데 도움이 됨
```

### ⑥ JSX에서 자주 하는 실수와 해결 방법
**실수 1 : 중괄호 없이 JavaScript 코드 사용**
- 잘못된 코드
```jsx
<Text>현재 시간: new Date().toLocaleTimeString()</Text>
// 결과: "현재 시간: new Date().toLocaleTimeString()" (문자열 그대로 출력)
```
- 올바른 코드
```jsx
<Text>현재 시간: {new Date().toLocaleTimeString()}</Text>
// 결과: "현재 시간: 14:30:45"
```

**실수 2 : 여러 개의 루트 요소 반환**
- 잘못된 코드
```jsx
return (
  <Text>첫 번째</Text>
  <Text>두 번째</Text>  // 오류!
);
```
- 올바른 코드
```jsx
return (
  <>
    <Text>첫 번째</Text>
    <Text>두 번째</Text>
  </>
);
```

**실수 3 : if 문을 JSX 내부에서 직접 사용**
- 잘못된 코드
```jsx
<View>
  {if (isLoggedIn) {  // 오류! if 문은 표현식이 아닙니다
    <Text>환영합니다</Text>
  }}
</View>
```
- 올바른 코드
```jsx
<View>
  {isLoggedIn ? <Text>환영합니다</Text> : null}
</View>
```

**실수 4 : 스타일 속성에 문자열 직접 사용**
- 잘못된 코드
```jsx
<Text style="color: red; fontSize: 20">텍스트</Text>
// React Native에서는 작동하지 않습니다!
```
- 올바른 코드
```jsx
<Text style={{ color: 'red', fontSize: 20 }}>텍스트</Text>
// 또는
const styles = StyleSheet.create({
  text: { color: 'red', fontSize: 20 }
});
<Text style={styles.text}>텍스트</Text>
```

**실수 5 : 이벤트 핸들러를 즉시 호출**
- 잘못된 코드
```jsx
<Button title="클릭" onPress={handleClick()} />
// 렌더링 시 즉시 실행되어 버립니다!
```
- 올바른 코드
```jsx
<Button title="클릭" onPress={handleClick} />
// 또는 파라미터를 전달해야 한다면
<Button title="클릭" onPress={() => handleClick(param)} />
```

---