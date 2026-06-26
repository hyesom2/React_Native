# 4. Drawer Navigator
- Stack Navigator와 Tab Navigator 외에도, 많은 모바일 앱은 화면의 왼편(또는 오른편)에서 슬라이드 되어 나오는 **사이드 메뉴**를 사용
- 이 사이드 메뉴를 구현하는 것이 바로 **Drawer Navigator**
- 이는 일반적으로 앱의 **최상위 메뉴**를 배치하거나, 설정이나 프로필 같이 자주 접근하지는 않지만 중요한 기능들을 모아두는 데 유용

---

### 4-1&#41; Drawer Navigator 설정하기
- Drawer Navigator를 사용하려면 전용 패키지를 설치함

**① 패키지 설치**
- 터미널에서 다음 명령어를 사용하여 Drawer Navigator 라이브러리를 설치

```bash
npx expo install @react-navigation/drawer
```
- 이 명령어는 Drawer Navigator의 기본 동작에 필요한 `react-native-gesture-handler`와 `react-native-reanimated` 같은 필수 의존성 라이브러리도 함께 설치해줌

**② Drawer Navigator 구현**
- 설치가 완료되면, 앱의 최상위 구조를 Drawer Navigator로 변경하고 그 안에 여러 화면을 등록
- Drawer Navigator는 Stack Navigator나 Tab Navigator와 마찬가지로 `<NavigationContainer>` 안에 위치해야함

```jsx
// App.js

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// 1. Drawer Navigator 생성을 위한 함수를 임포트합니다.
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Text, View, Button, StyleSheet } from 'react-native';

// --- 서랍 메뉴에 들어갈 화면 컴포넌트 정의 ---

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>홈 화면</Text>
      <Button
        title="서랍 열기 (Open Drawer)"
        // navigation 객체의 openDrawer() 함수를 사용하여 서랍 메뉴를 엽니다.
        onPress={() => navigation.openDrawer()}
      />
    </View>
  );
}

function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>프로필 화면</Text>
      <Button
        title="홈으로 돌아가기"
        // 서랍 메뉴를 닫고 싶다면 closeDrawer()를 사용할 수 있습니다.
        onPress={() => navigation.closeDrawer()}
      />
    </View>
  );
}

// 2. Drawer Navigator를 생성합니다.
const Drawer = createDrawerNavigator();

// 3. Drawer Navigator를 사용하여 화면을 등록합니다.
export default function App() {
  return (
    <NavigationContainer>
      {/* Drawer Navigator를 최상위에 배치합니다. */}
      <Drawer.Navigator 
        initialRouteName="Home"
        // 서랍 메뉴의 기본 위치를 오른쪽으로 변경할 수 있습니다. (기본값: left)
        drawerPosition="left" 
      >
        {/* 첫 번째 서랍 메뉴 항목 등록 */}
        <Drawer.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: '메인 홈' }}
        />
        {/* 두 번째 서랍 메뉴 항목 등록 */}
        <Drawer.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{ title: '내 프로필' }}
        />
      </Drawer.Navigator>
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
1. `createDrawerNavigator()` : Drawer Navigator 객체를 생성
2. `<Drawer.Navigator>`
- 내비게이션 구조를 정의
- `drawerPosition` : 서랍 메뉴가 화면의 어느 쪽에서 나올지 결정(`left` 또는 `right`)
3. `<Drawer.Screen>`
- 서랍 메뉴의 각 항목을 정의
- `name`과 `title`이 서랍 메뉴 목록에 표시됨
4. `navigation.openDrawer()`
- `navigation` props를 통해 전달되는 함수를 사용하여 프로그래밍 방식으로 서랍 메뉴를 열 수 있음(보통 상단 헤더의 햄버거 버튼에 연결됨)

---

### 4-2&#41; Drawer와 Stack의 결합
- 실제 앱에서는 **각 서랍 메뉴 항목**이 그 자체로 하나의 **Stack Navigator**인 경우가 많음
- 예&#41; '프로필' 메뉴를 누르면 프로필 메인 화면이 나오고, 거기서 '정보 수정' 화면 등으로 이동할 수 있어야 함
- 이 구조를 만들려면, Tab Navigator와 마찬가지로 Stack Navigator 컴포넌트를 만들어서 Drawer Navigator의 `<Drawer.Screen>`컴포넌트에 등록

**① Stack 컴포넌트 정의**
- Stack Navigator를 정의

```jsx
import { createStackNavigator } from '@react-navigation/stack';

const ProfileStack = createStackNavigator();

const ProfileStackScreen = () => (
    <ProfileStack.Navigator>
        {/* 프로필 서랍 메뉴를 눌렀을 때의 메인 화면 */}
        <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} options={{ title: '프로필' }} />
        {/* 프로필 스택 내에서만 이동 가능한 화면 */}
        <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: '정보 수정' }} />
    </ProfileStack.Navigator>
);
```

**② Drawer Navigator에 Stack 등록**
- 이제 위에서 만든 `ProfileStackScreen`을 Drawer 항목에 등록

```jsx
// App.js (Drawer.Navigator 부분)

<Drawer.Navigator>
    <Drawer.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: '메인 홈' }}
    />

    {/* 프로필 항목에 Stack Navigator를 등록 */}
    <Drawer.Screen 
        name="ProfileTab" 
        component={ProfileStackScreen} // Stack Navigator를 컴포넌트로 사용
        options={{ title: '내 프로필' }}
    />
</Drawer.Navigator>
```
- 이 구조를 사용하면 사용자는 서랍 메뉴를 통해 앱의 주요 기능(홈, 프로필)을 전환하고, 각 기능 안에서는 Stack 구조를 따라 세부 화면으로 깊이 이동할 수 있음

---

### 4-3&#41; Drawer Navigator 커스터마이징
**① 커스텀 Drawer 콘텐츠**

```jsx
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      {/* 프로필 섹션 */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://picsum.photos/100' }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>홍길동</Text>
        <Text style={styles.profileEmail}>hong@example.com</Text>
      </View>

      {/* 기본 메뉴 아이템들 */}
      <DrawerItemList {...props} />

      {/* 추가 메뉴 */}
      <DrawerItem
        label="로그아웃"
        icon={({ color, size }) => (
          <Ionicons name="log-out-outline" size={size} color={color} />
        )}
        onPress={() => {
          alert('로그아웃');
        }}
      />
    </DrawerContentScrollView>
  );
}

<Drawer.Navigator
  drawerContent={(props) => <CustomDrawerContent {...props} />}
  screenOptions={{
    drawerActiveTintColor: '#007AFF',
    drawerInactiveTintColor: '#8E8E93',
    drawerStyle: {
      width: 280,
    },
  }}
>
  {/* 화면들 */}
</Drawer.Navigator>

const styles = StyleSheet.create({
  profileSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 14,
    color: '#8E8E93',
  }
});
```

**② Drawer 아이콘 추가**
```jsx
<Drawer.Navigator
  screenOptions={{
    drawerActiveTintColor: '#007AFF',
  }}
>
  <Drawer.Screen 
    name="Home" 
    component={HomeScreen}
    options={{
      title: '홈',
      drawerIcon: ({ color, size }) => (
        <Ionicons name="home" size={size} color={color} />
      )
    }}
  />
  <Drawer.Screen 
    name="Profile" 
    component={ProfileScreen}
    options={{
      title: '프로필',
      drawerIcon: ({ color, size }) => (
        <Ionicons name="person" size={size} color={color} />
      )
    }}
  />
</Drawer.Navigator>
```
