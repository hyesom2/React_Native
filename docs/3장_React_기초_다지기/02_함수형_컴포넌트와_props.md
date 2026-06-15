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

### 2-2&#41; Props (Properties): 데이터의 단방향 흐름
- **Props**는 `부모 컴포넌트`가 `자식 컴포넌트`에게 데이터를 전달할 때 사용하는 `읽기 전용(Read-Only)` 속성
- 컴포넌트 자체는 고정되어 있지만, Props를 통해 전달받는 값에 따라 매번 다른 내용을 표시할 수 있음

### ① Props 전달 (부모 → 자식)
- Props는 HTML 속성을 지정하듯이 자식 컴포넌트에 원하는 **이름**과 **값**을 할당하여 전달
```jsx
// 부모 컴포넌트 (App.js)
function App() {
  return (
    <View>
      {/* name과 message를 Props로 전달 */}
      <UserProfile name="김철수" message="오늘의 할 일" /> 
      <UserProfile name="박영희" message="점심 메뉴 선택" /> 
    </View>
  );
}
```

### ② Props 받기 및 사용 (자식 컴포넌트)
- 자식 컴포넌트(`UserProfile`)는 함수의 **매개변수**로 `props`라는 이름의 **객체**를 자동으로 받음
- 전달받은 값들은 이 `props` 객체의 속성으로 접근할 수 있음

```jsx
// 자식 컴포넌트 (UserProfile.js)
// 함수 매개변수로 props 객체를 받습니다.
function UserProfile(props) {
  return (
    <View style={styles.card}>
      {/* props.name, props.message 형태로 접근하여 사용 */}
      <Text style={styles.name}>이름: {props.name}</Text>
      <Text style={styles.message}>메시지: {props.message}</Text>
    </View>
  );
}
```

### ③ 구조 분해 할당 (Destructuring): 간결한 코드
- 매번 `props.name`, `props.message`처럼 길게 쓰는 대신, JavaScript의 **구조 분해 할당 문법**을 사용하여 코드를 훨씬 간결하게 만들 수 있음

```jsx
// 매개변수에서 필요한 속성(name, message)만 바로 꺼내어 사용
function UserProfile({ name, message }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>이름:{name}</Text> {/* props.name 대신 name */}
      <Text style={styles.message}>메시지:{message}</Text> {/* props.message 대신 message */}
    </View>
  );
}
```

---

### 2-3&#41; Props의 특징: 읽기 전용 (Immutable)
- Props의 가장 중요한 특징은 **읽기 전용**
- **변경 불가**
  - 자식 컴포넌트는 전달받은 Props의 값을 **절대 직접 변경할 수 없음**
  - 만약 자식 컴포넌트에서 데이터가 변경되어야 한다면, 나중에 배울 **State** 개념을 사용하거나, **부모 컴포넌트에게 변경을 요청**
- **단방향 흐름**
  - 데이터는 항상 **부모에서 자식**으로만 흐름
- **핵심 요약**
  - 함수형 컴포넌트는 화면을 구성하는 기본 단위
  - Props는 컴포넌트의 모양과 내용을 동적으로 결정하기 위해 부모로부터 전달되는 설정 값

---

### 2-4&#41; Props의 고급 사용법

### ① 기본값 설정 (Default Props)
- Props가 전달되지 않았을 때 사용할 기본값을 설정할 수 있음

### ※ 방법1 : 구조 분행 할당에서 기본값 설정
```jsx
function Greeting({ name = '손님', age = 0 }) {
  return (
    <View>
      <Text>안녕하세요, {name}님!</Text>
      <Text>나이: {age}세</Text>
    </View>
  );
}

// 사용
<Greeting name="철수" age={25} />  // "철수님", "25세"
<Greeting name="영희" />           // "영희님", "0세"
<Greeting />                       // "손님님", "0세"
```

### ※ 방법2 : defaultProps 사용 (구식이지만 여전히 사용됨)
```jsx
function Greeting({ name, age }) {
  return (
    <View>
      <Text>안녕하세요, {name}님!</Text>
      <Text>나이: {age}세</Text>
    </View>
  );
}

Greeting.defaultProps = {
  name: '손님',
  age: 0
};
```

### ② Props 타입 검증 (PropTypes)
- 개발 중에 잘못된 타입의 Props가 전달되는 것을 방지할 수 있음

```jsx
import PropTypes from 'prop-types';

function UserProfile({ name, age, email, isPremium }) {
  return (
    <View>
      <Text>{name}</Text>
      <Text>{age}세</Text>
      <Text>{email}</Text>
      {isPremium && <Text>프리미엄 회원</Text>}
    </View>
  );
}

// Props 타입 정의
UserProfile.propTypes = {
  name: PropTypes.string.isRequired,      // 필수 문자열
  age: PropTypes.number.isRequired,       // 필수 숫자
  email: PropTypes.string,                // 선택 문자열
  isPremium: PropTypes.bool               // 선택 불리언
};
```

```
📌 참고
- TypeScript를 사용하면 PropTypes 없이도 타입 안정성을 보장할 수 있음
```

### ③ Children Props (자식 요소 전달)
- 컴포넌트의 여는 태그와 닫는 태그 사이에 있는 모든 내용은 children prop으로 전달

```jsx
function Card({ children, title }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.content}>
        {children}  {/* 여기에 전달받은 자식 요소가 렌더링됨 */}
      </View>
    </View>
  );
}

// 사용
function App() {
  return (
    <Card title="사용자 정보">
      <Text>이름: 김철수</Text>
      <Text>나이: 25세</Text>
      <Text>직업: 개발자</Text>
    </Card>
  );
}
```

### ④ Spread Operator로 Props 전달
- 여러 Props를 한 번에 전달할 때 유용

```jsx
function UserCard(props) {
  return (
    <View>
      <Text>{props.name}</Text>
      <Text>{props.age}세</Text>
      <Text>{props.email}</Text>
    </View>
  );
}

function App() {
  const userInfo = {
    name: '김철수',
    age: 25,
    email: 'kim@example.com'
  };

  // Spread operator로 모든 속성을 한 번에 전달
  return <UserCard {...userInfo} />;

  // 위 코드는 다음과 같습니다:
  // <UserCard name="김철수" age={25} email="kim@example.com" />
}
```

### ⑤ 함수를 Props로 전달 (콜백)
- 자식 컴포넌트에서 부모 컴포넌트의 함수를 호출할 수 있음

```jsx
function ParentComponent() {
  const handleButtonClick = (buttonName) => {
    console.log(`${buttonName} 버튼이 클릭되었습니다!`);
  };

  return (
    <View>
      <ChildButton 
        label="확인" 
        onPress={handleButtonClick}  // 함수를 props로 전달
      />
    </View>
  );
}

function ChildButton({ label, onPress }) {
  return (
    <Button 
      title={label}
      onPress={() => onPress(label)}  // 부모의 함수 호출
    />
  );
}
```