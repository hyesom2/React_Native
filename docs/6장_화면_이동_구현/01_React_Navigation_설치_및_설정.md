# 1. React Navigation 설치 및 설정
- 앱이 여러 화면으로 구성될 때, 사용자들은 화면 간에 앞뒤로 이동하거나 탭을 통해 다른 메뉴로 전환
- 웹사이트에서 링크를 클릭하는 것과 같이, 모바일 앱에서는 이 화면 이동을 **내비게이션(Navigation)**
- React Native에서는 이 내비게이션 기능을 담당하는 사실상의 표준 라이브러리가 바로 **React Navigation**

---

### 1-1&#41; React Navigation이란 무엇인가요?
- React Navigation은 React Native 앱에서 **화면 이동 및 화면 전환**을 관리하는 라이브러리
- **컴포넌트 기반**
  - React Navigation은 네이티브 앱의 내비게이션 기능을 React 컴포넌트 형태로 제공
  - 개발자는 복잡한 네이티브 코드를 몰라도 컴포넌트를 사용하여 쉽게 내비게이션 구조를 만듦
- **네이티브 경험**
  - React Navigation은 실제 네이티브 앱과 같은 부드럽고 자연스러운 화면 전환 애니메이션을 제공

### 1-2&#41; Expo 환경에서의 쉬운 설치
- Expo는 React Navigation을 쉽게 설치할 수 있도록 도움

**① 핵심 라이브러리 설치** <br />
- 프로젝트 폴더 터미널에서 개발 서버(`npx expo start`)를 끄고 다음 명령어를 실행하여 React Navigation의 핵심 패키지를 설치

```bash
npx expo install react-navigation/native
```

**② 필수 의존성 패키지 설치**
- React Navigation이 제대로 작동하려면 네이티브 코드가 필요 없는 몇 가지 필수 라이브러리가 추가로 필요
- Expo 환경에서는 다음 명령어로 설치

```bash
npx expo install react-native-screens react-native-safe-area-context
```

| 패키지 이름 | 역할 |
| :-- | :-- |
| `react-native-screens` | 여러 화면을 효율적으로 관리하여 성능을 향상시키는 데 도움 |
| `react-native-safe-area-context` | 노치(notch) 디자인이나 하단 제스처 바 등 기기 고유 영역을 피하여 UI가 안전하게 표시되도록 도움 |

**③ 내비게이션 컨테이너 설정 (NavigationContainer)**
- 설치가 완료되면, 이제 앱 전체를 내비게이션 시스템으로 감싸줌
- React Navigation의 모든 내비게이션 기능은 `<NavigationContainer>`컴포넌트 안에서만 작동

```jsx
// App.js

import * as React from 'react';
// 1. NavigationContainer를 임포트
import { NavigationContainer } from '@react-navigation/native';
import { Text, View, StyleSheet } from 'react-native';

// 임시로 사용할 HomeScreen 컴포넌트
function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 26, fontWeight: 'bold' }}>홈 화면입니다!</Text>
    </View>
  );
}

export default function App() {
  // 2. 앱 전체를 NavigationContainer로 감싸자
  return (
    <NavigationContainer>
      {/* 3. 이 안에 우리가 만들 내비게이터(Stack, Tab 등)가 들어갈 예정입니다. */}
      <HomeScreen /> 
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
```

---

### ※ NavigationContainer 이해하기
- NavigationContainer가 하는 일
1. **내비게이션 상태 관리** : 현재 어떤 화면이 활성화되어 있는지 추적
2. **히스토리 관리** : 뒤로 가기를 위한 화면 스택 관리
3. **딥 링크 처리** : 외부에서 앱의 특정 화면으로 접근
4. **Android 뒤로 가기 버튼** : Android의 물리적 뒤로 가기 버튼 처리

```jsx
// 올바름: NavigationContainer는 앱의 최상위에 하나만
export default function App() {
  return (
    <NavigationContainer>
      {/* 모든 네비게이터가 여기 안에 */}
    </NavigationContainer>
  );
}

// 잘못됨: 여러 개의 NavigationContainer
export default function App() {
  return (
    <>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
      <NavigationContainer>  {/* 이렇게 하면 안 됨! */}
        <TabNavigator />
      </NavigationContainer>
    </>
  );
}
```

---
