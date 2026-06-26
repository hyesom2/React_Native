# 3. Tab Navigator
- 대부분의 모바일 앱은 앱의 핵심 기능들을 쉽게 전환할 수 있도록 화면 하단에 **탭 바(Tab Bar)**를 사용
- Stack Navigator가 화면을 깊이 있게 쌓아 올리는 방식이라면, **Tab Navigator**는 앱의 최상위 레벨에서 여러 주요 기능(화면)을 **수평적으로 나열**하여 빠르게 전환할 수 있음

---

### 3-1&#41; Tab Navigator 설정하기
- Tab Navigator를 사용하려면 Stack Navigator와 마찬가지로 전용 패키지를 설치

**① 패키지 설치**
```bash
npx expo install @react-navigation/bottom-tabs
```

**② Tab Navigator 구현**
- 앱의 최상위 구조를 Tab Navigator로 변경하고 그 안에 여러 화면을 등록

```jsx
// App.js

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// 1. Tab Navigator 생성을 위한 함수를 임포트
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, StyleSheet } from 'react-native';

// --- 탭에 들어갈 화면 컴포넌트 정의 ---

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏠 홈 탭 화면</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚙️ 설정 탭 화면</Text>
    </View>
  );
}

// 2. Tab Navigator를 생성
const Tab = createBottomTabNavigator();

// 3. Tab Navigator를 사용하여 화면을 등록
export default function App() {
  return (
    <NavigationContainer>
      {/* Tab Navigator를 최상위에 배치합니다. */}
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: 'tomato', // 활성화된 탭 아이콘/글자 색상
          tabBarInactiveTintColor: 'gray', // 비활성화된 탭 아이콘/글자 색상
        }}
      >
        {/* 첫 번째 탭 화면 등록 */}
        <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            title: '홈', // 탭 바에 표시될 텍스트
            // 탭 아이콘 설정 (추후 @expo/vector-icons를 사용하여 멋진 아이콘으로 변경 가능)
            // 임시로 텍스트 아이콘을 사용
            tabBarIcon: ({ color, size }) => (
              <Text style={{ color, fontSize: size }}>🏠</Text> 
            ),
          }}
        />
        {/* 두 번째 탭 화면 등록 */}
        <Tab.Screen 
          name="Settings" 
          component={SettingsScreen} 
          options={{
            title: '설정',
            tabBarIcon: ({ color, size }) => (
              <Text style={{ color, fontSize: size }}>⚙️</Text>
            ),
          }}
        />
      </Tab.Navigator>
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
1. `createBottomTabNavigator()` : Tab Navigator 객체를 생성하는 함수
2. `<Tab.Navigator>` : 탭 구조를 정의하며, `screenOptions`를 통해 탭 바의 기본 스타일(색상 등)을 설정
3. `<Tab.Screen>`
- 각 탭을 정의
- `options.tabBarIcon` : **현재 탭의 활성화 상태에 따라 색상(`color`)과 크기(`size`)를 props로 받아** 아이콘을 렌더링하는 함수

### 3-2&#41; 아이콘 라이브러리 사용하기
- 이모지 대신 전문적인 아이콘을 사용하려면 `@expo/vector-icons`를 사용
- Expo 프로젝트에는 기본으로 포함

***① Ionicons 사용 (권장)**
```jsx
import { Ionicons } from '@expo/vector-icons';

<Tab.Navigator
  screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === 'Home') {
        iconName = focused ? 'home' : 'home-outline';
      } else if (route.name === 'Search') {
        iconName = focused ? 'search' : 'search-outline';
      } else if (route.name === 'Profile') {
        iconName = focused ? 'person' : 'person-outline';
      }

      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: '#007AFF',
    tabBarInactiveTintColor: 'gray',
  })}
>
  <Tab.Screen name="Home" component={HomeScreen} options={{ title: '홈' }} />
  <Tab.Screen name="Search" component={SearchScreen} options={{ title: '검색' }} />
  <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: '프로필' }} />
</Tab.Navigator>
```

**② 다양한 아이콘 라이브러리**
- 아이콘 찾기 : https://icons.expo.fyi/ - 모든 아이콘을 검색하고 미리보기

```jsx
// Material Icons
import { MaterialIcons } from '@expo/vector-icons';
<MaterialIcons name="favorite" size={24} color="red" />

// FontAwesome
import { FontAwesome } from '@expo/vector-icons';
<FontAwesome name="heart" size={24} color="red" />

// AntDesign
import { AntDesign } from '@expo/vector-icons';
<AntDesign name="heart" size={24} color="red" />

// Feather
import { Feather } from '@expo/vector-icons';
<Feather name="heart" size={24} color="red" />
```

**③ 뱃지(알림 개수) 추가**
```jsx
function TabBarIcon({ name, color, size, badgeCount }) {
  return (
    <View>
      <Ionicons name={name} size={size} color={color} />
      {badgeCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badgeCount}</Text>
        </View>
      )}
    </View>
  );
}

<Tab.Screen 
  name="Messages" 
  component={MessagesScreen}
  options={{
    tabBarIcon: ({ color, size }) => (
      <TabBarIcon 
        name="chatbubbles" 
        color={color} 
        size={size} 
        badgeCount={5}  // 읽지 않은 메시지 5개
      />
    )
  }}
/>

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: 'red',
    borderRadius: 9,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  }
});
```

### 3-3&#41; Tab Navigator 커스터마이징
**① 탭 바 스타일링**
```jsx
<Tab.Navigator
  screenOptions={{
    tabBarActiveTintColor: '#007AFF',
    tabBarInactiveTintColor: '#8E8E93',
    tabBarStyle: {
      backgroundColor: '#ffffff',
      borderTopColor: '#E5E5EA',
      borderTopWidth: 1,
      paddingBottom: 5,
      paddingTop: 5,
      height: 60,
    },
    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: '600',
    },
    tabBarIconStyle: {
      marginTop: 5,
    },
  }}
>
  {/* 화면들 */}
</Tab.Navigator>
```

**② 특정 탭에 다른 스타일 적용**
```jsx
<Tab.Screen 
  name="Create" 
  component={CreateScreen}
  options={{
    tabBarIcon: ({ focused }) => (
      <View style={styles.createButton}>
        <Ionicons name="add" size={30} color="white" />
      </View>
    ),
    tabBarLabel: () => null,  // 텍스트 숨기기
  }}
/>

const styles = StyleSheet.create({
  createButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,  // 위로 튀어나오게
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  }
});
```

**③ 탭 숨기기**
```jsx
<Tab.Screen 
  name="Hidden" 
  component={HiddenScreen}
  options={{
    tabBarButton: () => null,  // 탭 바에서 완전히 숨김
  }}
/>
```

### 3-4&#41; Tab과 Stack의 결합: 실용적인 앱 구조
- 대부분의 실무 앱은 단순히 탭만 있거나 스택만 있는 것이 아니라, **탭 안에 스택**이 들어있는 구조를 사용
- 예시
  - '홈' 탭을 누르면 메인 화면이 나오고, 거기서 세부 정보를 눌러 깊이 있게 들어감(Stack). 
  - 그러나 다시 탭 바의 '설정'을 누르면 홈 스택의 깊이와 상관없이 즉시 '설정' 화면으로 전환됨(Tab)
- 이 구조를 만들기 위해 Stack Navigator 컴포넌트를 Tab Navigator의 `<Tab.Screen>`안에 넣음

**① Stack 컴포넌트 만들기**
- `App.js`파일에 Stack Navigator를 구성하는 별도의 함수를 정의

```jsx
// Stack Navigator를 구성하는 별도의 함수 (컴포넌트)
const HomeStackScreen = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            {/* HomeTab을 위한 첫 번째 Stack 화면 */}
            <Stack.Screen name="HomeMain" component={HomeScreen} options={{ title: '홈 메인' }}/>
            {/* HomeTab 안에서 이동할 수 있는 상세 화면 */}
            <Stack.Screen name="Details" component={DetailsScreen} options={{ title: '상세 보기' }}/>
        </Stack.Navigator>
    );
};
```

**② Tab Navigator에 Stack 등록**
- 위에서 만든 `HomeStackScreen`함수(Stack Navigator 컴포넌트)를 Tab Navigator의 `component`로 등록함

```jsx
// App.js (Tab.Navigator 부분)

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        {/* '홈' 탭에 HomeStackScreen(Stack Navigator)을 등록합니다. */}
        <Tab.Screen 
          name="HomeTab" 
          component={HomeStackScreen} // Stack Navigator를 컴포넌트로 사용
          options={{ 
              title: '홈', 
              tabBarIcon: ({ color, size }) => <Text style={{ color, fontSize: size }}>🏠</Text>,
              headerShown: false, // Stack Navigator 내부에 헤더가 있으므로 Tab Navigator의 헤더는 숨깁니다.
          }}
        />

        {/* '설정' 탭에 SettingsScreen(단일 화면)을 등록합니다. */}
        <Tab.Screen 
          name="SettingsTab" 
          component={SettingsScreen} 
          options={{ 
              title: '설정',
              tabBarIcon: ({ color, size }) => <Text style={{ color, fontSize: size }}>⚙️</Text>,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
```
- 이 구조를 사용하면 '홈' 탭 안에서 `홈 → 세부 정보`로 깊이 있게 이동할 수 있고, 언제든지 '설정' 탭을 눌러 스택의 깊이와 상관없이 **즉시 설정 화면으로 전환**할 수 있음
- 이것이 바로 대부분의 모바일 앱이 사용하는 가장 표준적인 내비게이션 구조

---