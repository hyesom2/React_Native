# 2. Stack Navigator 활용

### ※ Stack Navigator: 화면 쌓기와 이동
- 앱을 만들 때 가장 기본적인 화면 이동 방식은 **스택(Stack)**구조
- Stack Navigator는 화면들을 마치 **책을 쌓아 올리거나 포개 놓는 것처럼** 관리
- 새 화면으로 이동하면 화면이 스택 위에 추가되고, 뒤로 가기 버튼을 누르면 스택의 가장 위에 있는 화면이 제거되면서 이전 화면이 다시 나타남

---

### 2-1&#41; Stack Navigator 설정하기

**① 패키지 설치**
```bash
npx expo install @react-navigation/stack
```

**② Stack Navigator 구현**
- `App.js`파일을 수정하여 Stack Navigator를 앱의 주요 내비게이션 구조로 설정

```jsx
// App.js

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// 1. Stack Navigator 생성을 위한 함수를 임포트
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View, Button, StyleSheet } from 'react-native';

// --- 화면 컴포넌트 정의 ---

// 첫 번째 화면 (메인 화면)
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>홈 화면</Text>
      {/* DetailScreen으로 이동하는 버튼 */}
      <Button
        title="세부 정보 보기 (Details)"
        // navigation 객체의 navigate 함수를 사용하여 다른 화면으로 이동
        onPress={() => navigation.navigate('Details')} 
      />
    </View>
  );
}

// 두 번째 화면 (세부 정보 화면)
function DetailsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>세부 정보 화면</Text>
      {/* 홈 화면으로 돌아가는 버튼 */}
      <Button
        title="홈으로 돌아가기"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

// 2. Stack Navigator를 생성
const Stack = createStackNavigator();

// 3. Stack Navigator를 사용하여 화면을 등록
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* 첫 번째 화면 등록 */}
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: '메인 페이지' }} // 상단 헤더에 표시될 제목
        />
        {/* 두 번째 화면 등록 */}
        <Stack.Screen 
          name="Details" 
          component={DetailsScreen} 
          options={{ title: '상세 정보' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    }
});
```
1. `createStackNavigator()`
- Stack Navigator 객체를 생성하는 함수
- 이 객체에는 화면을 등록하는 `<Stack.Screen>`컴포넌트가 포함
2. `<Stack.Navigator>`
- 내비게이션 구조를 정의하는 컨테이너
- `initialRouteName` : 앱이 시작될 때 가장 먼저 표시될 화면의 name을 지정(여기서는 "Home")
3. `<Stack.Screen>`
- 내비게이션에 포함될 개별 화면을 등록
- `name` : 해당 화면을 식별하는 고유한 이름(화면 이동 시 사용됨) 
- `component` : 해당 화면에서 렌더링될 React 컴포넌트
- `options` : 해당 화면의 상단 헤더 스타일(제목, 색상 등)을 설정

### 2-2&#41; 화면 간 이동하기
- Stack Navigator에 등록된 모든 화면 컴포넌트는 자동으로 `navigation`이라는 특별한 **props**를 전달받음
- 이 `navigation`객체를 사용하여 화면 이동을 제어

| 함수 | 설명 |
| :-- | :-- |
| `navigation.navigate('ScreenName')` | 지정된 이름(`ScreenName`)의 화면으로 이동 <br />스택에 이미 해당 화면이 있다면 그 화면으로 이동하고, 없다면 새로 추가 |
| `navigation.goBack()` | 현재 스택의 가장 위에 있는 화면을 제거하고 이전 화면으로 돌아감 (스마트폰의 물리적 뒤로 가기 버튼과 동일) |
| `navigation.push('ScreenName')` | 현재 화면 위에 **무조건** 새 화면을 추가함 <br /> 같은 화면을 연속적으로 여러 번 쌓고 싶을 때 유용함 |
| `navigation.popToTop()` | 현재 스택에 쌓여 있는 모든 화면을 제거하고, 맨 처음 화면(스택의 맨 밑)으로 돌아감 |

### 2-3&#41; 화면 간 데이터 전달: Params
- 모바일 앱에서는 목록 화면에서 항목을 선택하면, 세부 정보 화면으로 이동하면서 **어떤 항목**을 선택했는지 정보를 전달해야 함
- Stack Navigator는 **Params(매개변수)**를 사용하여 화면 간에 데이터를 전달할 수 있음

**① 데이터 보내기 (발신 화면)**
- `navigation.navigate`함수를 호출할 때, 두 번째 인수로 JavaScript 객체를 전달하여 데이터를 보냄

```jsx
// HomeScreen (데이터를 보내는 화면)

function HomeScreen({ navigation }) {
  const itemTitle = "React Native 책 제작하기";
  const itemId = 101;

  return (
    <Button
      title="세부 정보 보기"
      // 객체 형태로 itemId와 itemTitle을 보냄
      onPress={() => navigation.navigate('Details', { 
        itemId: itemId,
        title: itemTitle,
      })} 
    />
  );
}
```

**② 데이터 받기 (수신 화면)**
- 데이터를 받는 화면 컴포넌트에는 `route`라는 특별한 **props**가 전달됨
- 이 `route`객체의 `params`속성에서 전달된 데이터를 꺼내 쓸 수 있음

```jsx
// DetailsScreen (데이터를 받는 화면)

function DetailsScreen({ route, navigation }) {
  // route.params에서 itemId와 title을 구조 분해 할당으로 꺼냄
  const { itemId, title } = route.params;

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 18 }}>전달받은 Item ID: {itemId}</Text>
      <Text style={{ fontSize: 18 }}>전달받은 제목: {title}</Text>
      <Button
        title="홈으로 돌아가기"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}
```

---
