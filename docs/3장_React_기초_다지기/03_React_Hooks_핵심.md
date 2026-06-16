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

