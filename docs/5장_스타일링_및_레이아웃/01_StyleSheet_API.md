# 1. StyleSheet API

### ※ React Native 스타일의 표준
- React Native에서 컴포넌트의 모양(색상, 크기, 폰트 등)을 결정하는 스타일링은 웹의 CSS와 유사하지만, 몇 가지 중요한 차이점이 존재
- 이 모든 스타일을 효율적으로 정의하고 관리하는 표준 방법이 바로 `StyleSheet API`
- `StyleSheet`는 스타일을 정의하는 데 사용되는 React Native의 핵심 도구

---

### 1-1&#41; StyleSheet.create()의 역할과 장점
- React Native에서 스타일을 정의하는 가장 일반적이고 **권장되는 방법**은 `StyleSheet.create()` 메서드를 사용하는 것

### ※ StyleSheet를 사용하는 이유
1. **성능 최적화 (Performance)** <br />
→ StyleSheet.create()를 사용하여 스타일을 정의하면, 앱이 처음 로드될 때 스타일 객체가 한 번만 처리되어 네이티브(Native) 코드로 변환됨
→ 이는 일반적인 JavaScript 객체를 직접 전달하는 것보다 훨씬 빠르게 스타일을 적용할 수 있도록 최적화

2. **가독성 및 관리** <br />
→ 컴포넌트의 복잡한 로직과 스타일 정의를 분리하여 코드를 깔끔하게 만들고, 스타일을 한 곳에서 쉽게 관리 가능

3. **코드 완성 (IntelliSense)** <br />
→ 대부분의 코드 편집기(VS Code)에서 StyleSheet.create() 내부에 스타일을 작성할 때 자동 완성(IntelliSense) 기능을 제공받음

- 기본 구조
  - `StyleSheet`는 React Native에서 임포트하여 사용

```jsx
import { StyleSheet, Text, View } from 'react-native';

// 1. StyleSheet.create() 호출
const styles = StyleSheet.create({
  // 2. CSS 속성과 유사한 규칙들을 JavaScript 객체 형태로 정의
  container: {
    backgroundColor: '#ffffff',
    padding: 10,
    marginTop: 20,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'darkblue',
  },
});

// 3. 컴포넌트의 'style' Props에 정의된 스타일 객체를 참조하여 적용
function MyStyledView() {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>스타일링된 제목</Text>
    </View>
  );
}
```

---

### 1-2&#41; 스타일 속성의 특징: JavaScript 규칙
- React Native 스타일 속성은 웹 CSS와 매우 유사하지만, JavaScript 환경에서 작동하기 때문에 몇 가지 규칙을 따름

**① `camelCase` 사용 (JavaScript 문법)**
- 웹 CSS에서는 하이픈(`-`)을 사용하지만 (예: `background-color`), JavaScript 객체의 속성 이름은 하이픈을 허용하지 않으므로 `camelCase`를 사용

| **웹 CSS 속성** | **React Native 속성** |
| :--: | :--: |
| `background-color` | `backgroundColor` |
| `font-size` | `fontSize` |
| `border-radius` | `borderRadius` |

**② 단위 없음 (Unitless)**
- React Native 스타일 값에는 **단위(px, em, rem 등)**를 붙이지 않고 **숫자 값**만 사용
- `width : '100px'`**(X)**
- `width : 100`**(O)**
- `fontSize : 16`**(O)**
- 이 숫자 값은 자동으로 **밀도 독립적인 픽셀(Density-Independent Pixels, DP)**로 처리
- 해상도가 다른 다양한 스마트폰에서 일관된 크기로 표시되도록 보장

**③ 유효한 값**
- 색상 값은 문자열로 `'red'`, `'#FF0000'`, `'rgba(255, 0, 0, 0.5)'` 등 CSS에서 사용하는 모든 형식으로 지정 가능

---

### 1-3&#41; 여러 스타일 적용 및 오버라이드
- 대부분의 컴포넌트는 여러 스타일 규칙의 조합이 필요
- React Native에서는 **JavaScript 배열**을 사용하여 여러 스타일을 동시에 적용 가능

**① 배열을 사용한 스타일 결합**
```jsx
const primaryButton = { 
    backgroundColor: 'blue', 
    padding: 10 
};
const largeText = { 
    fontSize: 20 
};

// 배열 [styleA, styleB] 형태로 전달
<Text style={[primaryButton, largeText]}>큰 파란색 버튼 텍스트</Text>
```

**② 스타일 우선순위 (오버라이드)**
- 배열 내에서 스타일이 충돌할 경우, 배열의 뒤쪽에 위치한 스타일이 앞쪽의 스타일을 덮음(우선순위가 높음).
```jsx
const baseStyle = { color: 'red', fontSize: 16 };
const overrideStyle = { color: 'green', fontWeight: 'bold' };

// 결과: color는 'green', fontSize는 16, fontWeight는 'bold'가 됨
<Text style={[baseStyle, overrideStyle]}>초록색 텍스트</Text>
```

---

### 1-4&#41; 실전 스타일 패턴
**① 공통 스타일 재사용**
```jsx
// styles/common.js - 공통 스타일 파일
import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
  }
});

// 다른 파일에서 사용
import { commonStyles } from './styles/common';

function MyScreen() {
  return (
    <View style={[commonStyles.container, commonStyles.centerContent]}>
      <View style={[commonStyles.card, commonStyles.shadow]}>
        <Text>카드 콘텐츠</Text>
      </View>
    </View>
  );
}
```

**② 조건부 스타일**
```jsx
function Button({ variant, disabled, children }) {
  return (
    <Pressable
      style={[
        styles.button,
        variant === 'primary' && styles.primaryButton,
        variant === 'danger' && styles.dangerButton,
        disabled && styles.disabledButton,
      ]}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  dangerButton: {
    backgroundColor: '#FF3B30',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
    opacity: 0.6,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  }
});
```

**③ 테마 시스템**
```jsx
// theme.js
export const theme = {
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    success: '#34C759',
    danger: '#FF3B30',
    warning: '#FF9500',
    background: '#F2F2F7',
    card: '#FFFFFF',
    text: '#000000',
    textSecondary: '#8E8E93',
    border: '#C6C6C8',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  typography: {
    h1: { fontSize: 32, fontWeight: 'bold' },
    h2: { fontSize: 24, fontWeight: 'bold' },
    h3: { fontSize: 20, fontWeight: '600' },
    body: { fontSize: 16, fontWeight: 'normal' },
    caption: { fontSize: 12, fontWeight: 'normal' },
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    round: 9999,
  }
};

// 사용
import { theme } from './theme';

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.text,
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
  }
});
```

---