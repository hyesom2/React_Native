# 3. React Hooks 핵심 (State와 Lifecycle)
- React 개발의 꽃은 바로 `Hooks(훅)`
- Hooks는 `함수형 컴포넌트`에서만 사용 가능
- 컴포넌트의 생명주기(Lifecycle) 기능이나 데이터 상태 관리와 같은 고급 기능을 쉽게 사용할 수 있도록 도와주는 특별한 함수들

### ※ Hooks가 등장한 이유
1. 과거 (클래스형 컴포넌트)
- 복잡하고 이해하기 어려운 `this` 키워드
- 생명주기 메서드의 복잡성
- 로직 재사용이 어려움

2. 현재 (함수형 컴포넌트 + Hooks)
- 간결하고 이해하기 쉬운 코드
- 로직 재사용이 쉬움
- 더 나은 성능

### ※ Hooks 사용 규칙 (매우 중요!)
**규칙 1** : 최상위에서만 호출 조건문, 반복문, 중첩 함수 안에서 Hook을 호출하면 안 됨
- 잘못된 코드
```jsx
function BadComponent() {
  if (condition) {
    const [state, setState] = useState(0);  // 오류!
  }
}
```

- 올바른 코드
```jsx
function GoodComponent() {
  const [state, setState] = useState(0);  // 최상위에서 호출

  if (condition) {
    // state 사용
  }
}
```

**규칙 2** : **React 함수 컴포넌트나 커스텀 Hook에서만 호출**, 일반 JavaScript 함수에서는 Hook을 호출할 수 없음
- 잘못된 사용
```jsx
// 일반 함수에서
function regularFunction() {
  const [state, setState] = useState(0);  // 오류!
}
```

- 올바른 코드
```jsx
// React 컴포넌트에서
function MyComponent() {
  const [state, setState] = useState(0);
}

// 커스텀 Hook에서
function useCustomHook() {
  const [state, setState] = useState(0);
  return state;
}
```

---

### 3-1&#41; `useState` : 컴포넌트의 상태(State) 관리
- **State**는 시간이 지남에 따라 **변화할 수 있는 데이터**를 의미하며, 이 데이터가 변경될 때마다 React는 해당 컴포넌트를 **자동으로 다시 그려(Re-render)** 화면을 업데이트
- `useState` Hook은 컴포넌트가 이러한 변경 가능한 데이터를 기억하고 관리

### ① useState의 작동 원리
- `useState` 함수를 호출하면 두 개의 요소를 가진 배열을 반환
1. **현재 상태 값 (Current State)** : 현재 컴포넌트가 기억하고 있는 값
2. **상태 설정 함수 (Setter Function)** : 상태 값을 업데이트할 때 사용하는 함수로, **이 함수를 통해서만** 상태를 변경해야 React가 변화를 감지하고 리렌더링

### ※ 기본 구조
```jsx
import React, { useState } from 'react';

function Counter() {
  // 1. useState 호출: 초기값(0)을 설정합니다.
  //    count: 현재 값, setCount: 값을 변경할 함수
  const [count, setCount] = useState(0); 

  // 2. 상태 설정 함수를 사용하여 값 변경
  const increment = () => {
    // setCount를 호출하면 React는 count 값을 변경하고 컴포넌트를 리렌더링합니다.
    setCount(count + 1); 
  };

  return (
    <View>
      <Text>현재 숫자: {count}</Text>
      <Button title="증가" onPress={increment} />
    </View>
  );
}
```

### ※ 핵심 사항
- **초기값** : `useState(0)`처럼 괄호 안에 상태의 **초기값**을 넣음(숫자, 문자열, 불리언, 객체, 배열 모두 가능)
- **불변성(Immutability)**
  - 상태를 업데이트할 때는 **기존 값을 직접 수정하지 않고**, `setCount(새로운 값)`처럼 **완전히 새로운 값**으로 덮어씌워야 함
  - 특히 객체나 배열을 다룰 때 이 규칙이 매우 중요

---