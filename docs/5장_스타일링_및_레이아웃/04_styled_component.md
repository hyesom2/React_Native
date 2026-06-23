# 4. styled component
- **Styled-Components**는 React 및 React Native에서 스타일링을 처리하는 가장 널리 사용되는 라이브러리
- 기존 `StyleSheet.create()` 방식과 달리, CSS 코드를 JavaScript 파일 안에 직접 작성(CSS-in-JS)하여 컴포넌트와 스타일을 **완전히 결합**
- UI를 만들 때 **재사용성, 가독성, 유지보수성**을 높임

---

### 4-1&#41; Styled-Components란?
- Styled-Components는 **템플릿 리터럴(Template Literals)** 문법(JavaScript의 백틱 ``` 사용)으로 CSS 코드를 작성하고, 이 CSS가 적용된 새로운 React 컴포넌트를 생성하는 라이브러리

**※ 핵심 원리**
1. **컴포넌트 생성** : 기본 React Native 컴포넌트(`<View>`, `<Text>` 등)에 스타일을 입혀 새로운 컴포넌트를 정의
2. **CSS 작성** : 일반 CSS 구문처럼 스타일을 백틱 안에 작성되며, React Native에서는 CSS 속성이 `camelCase`로 자동 변환
3. **동적 스타일** : Props를 사용하여 스타일을 동적으로 변경 가능

---

### 4-2&#41; 설치 및 기본 사용법
**※ 설치**
- Styled-Components는 외부 라이브러리이므로 먼저 설치

```bash
# npm 사용
npm install styled-components

# yarn 사용
yarn add styled-components
```

**※ Styled 컴포넌트 정의**
- `SafeAreaView`를 스타일링하여 앱의 메인 컨테이너로 사용할 `Container`컴포넌트를 만드는 예시
```jsx
import styled from 'styled-components/native'; // React Native 버전 임포트
import { SafeAreaView } from 'react-native';

// 1. styled.기존컴포넌트명`CSS 코드` 형식으로 새 컴포넌트를 정의합니다.
const Container = styled.SafeAreaView`
  flex: 1; 
  background-color: #f5f5f5;
  padding: 20px;
`;

const TitleText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 15px;
`;

// 2. 정의된 컴포넌트(Container, TitleText)를 다른 컴포넌트처럼 사용합니다.
function MyStyledScreen() {
  return (
    <Container> {/* 이제 이 컴포넌트 안에 스타일이 포함되어 있습니다. */}
      <TitleText>Styled-Components 예제</TitleText>
      <TitleText style={{ fontSize: 16 }}>이것은 일반적인 Text 컴포넌트가 아닙니다.</TitleText>
    </Container>
  );
}
```

---

### 4-3&#41; 주요 장점
**1. 명확한 관심사 분리**
- **가독성** : 컴포넌트의 기능(로직)과 외형(스타일)이 하나의 파일에 있지만, 서로 다른 문법(JS와 CSS)으로 분리되어 컴포넌트의 역할을 직관적으로 파악 가능
- **컴포넌트 기반** : 스타일을 클래스 이름(웹 CSS)이 아닌 이름이 있는 **컴포넌트**로 관리하므로 재사용과 유지보수가 쉬움

**2. Props를 사용한 동적 스타일링**
- Styled-Components의 가장 강력한 기능은 Props로 스타일을 동적으로 변경 가능

```jsx
// primary Props를 받아 배경색을 조건부로 변경하는 Button 컴포넌트
const CustomButton = styled.Pressable`
  background-color: ${(props)=>(props.primary ? '#007AFF' : '#CCCCCC')}; /* Props 사용 */
  padding: 10px 15px;
  border-radius: 5px;  
`;

const ButtonText = styled.Text`
  color: ${(props) => (props.primary ? 'white' : 'black')}; /* Props 사용 */
  font-weight: bold;
`;

function DynamicButtons() {
  return (
    <>
      <CustomButton primary>
        <ButtonText primary>기본 버튼</ButtonText>
      </CustomButton>

      <CustomButton> {/* primary Props가 없으면 회색 배경 적용 */}
        <ButtonText>보조 버튼</ButtonText>
      </CustomButton>
    </>
  );
}
```

- **작동 방식**
  - CSS 코드 내에서 `${(props) ...}`형태로 JavaScript 함수를 삽입 가능
  - 이 함수는 컴포넌트에 전달된 모든 Props를 받아 조건부로 스타일 값을 반환

**3. 스타일 확장**
- 기존 Styled 컴포넌트의 스타일을 상속받아 새로운 스타일을 쉽게 추가 가능

```js
// 기본 버튼 스타일을 확장하여 경고 버튼 생성
const WarningButton = styled(CustomButton)`
  background-color: red; /* 배경색만 덮어씁니다. */
`;
```

---