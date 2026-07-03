# 1. API 통신 기초 : 앱에 데이터를 가져오는 방법

- 앱을 만들 때, 화면에 보이는 대부분의 정보(예: 뉴스 기사, 상품 목록, 날씨 정보)는 앱 자체에 저장되어 있지 않음 
- 이 정보는 보통 **외부 서버**에 저장되어 있고, 앱이 필요할 때마다 인터넷을 통해 서버에 "데이터를 요청"하여 가져오며, 이 과정을 `API 통신`이라고 함

---

### 1-1&#41; API (Application Programming Interface)란?
- API는 쉽게 말해, **앱(손님)**과 **서버(식당 주방)** 사이의 **주문서 및 전달 방식**이라고 생각
- **서버** : 우리가 필요한 데이터를 보관하고 있는 곳
- **API**
  - 앱이 서버에게 데이터를 요청할 때 사용하는 정해진 규칙(URL 주소, 데이터 형식 등)
  - 앱이 이 규칙대로 요청하면, 서버는 응답 데이터를 돌려줌

---

### 1-2&#41; 비동기 처리의 이해: 왜 기다려야 할까요?
- 앱이 서버에 데이터를 요청하면, 서버가 응답할 때까지 **시간이 걸림**(몇 밀리초에서 몇 초)
- **동기(Synchronous)** 처리 : 만약 이 요청이 끝날 때까지 앱의 다른 모든 동작이 멈춘다면, 앱이 멈춘 것처럼 보임
- **비동기(Asynchronous)** 처리
  - 모바일 앱은 사용자 경험을 위해 데이터 요청 중에도 화면이 부드럽게 움직이도록 해야함
  - "서버에 데이터 요청을 보냈으니, 응답이 올 때까지 나는 다른 일을 하고 있을게. 응답이 오면 그때 알려줘."
- JavaScript에서는 이 비동기 처리를 깔끔하게 다루기 위해 `Promise`라는 개념을 사용하며, 이것을 더 쉽게 사용할 수 있게 만든 문법이 바로 `async`와 `await`

---

### 1-3&#41; `fetch API`와 `async/await`로 데이터 가져오기
- React Native는 웹 브라우저와 마찬가지로 기본적으로 내장된 `fetch` **API**를 사용하여 서버 통신을 처리함
- 여기에 비동기 처리 문법인 `async/await`를 결합하여 사용

**① 기본 구조: `async`와 `await`**
- 데이터를 가져오는 함수를 만들 때, 함수 앞에 `async`를 붙임
- 시간이 걸리는 작업(여기서는 `fetch`) 앞에 `await`를 붙임

```jsx
async function fetchData() {
  try {
    // 1. fetch: 지정된 URL로 요청을 보냄
    // await은 이 요청의 결과(Response)가 올 때까지 기다리라는 명령
    const response = await fetch('https://api.example.com/data'); 

    // 2. response.json(): 응답 데이터를 JSON 형식으로 변환
    // 이 작업 역시 시간이 걸리므로 await을 붙여야함
    const json_data = await response.json(); 

    // 3. 데이터 사용: 변환된 데이터를 콘솔에 출력하거나 상태에 저장함
    console.log(json_data); 

    return json_data;

  } catch (error) {
    // 4. 에러 처리: 요청이 실패하거나 네트워크 오류가 발생했을 때 처리함
    console.error("데이터를 가져오는 중 오류 발생:", error);
  }
}
```

**② 예제 : API로 데이터 가져와 화면에 표시하기**
- 앱 화면이 로드될 때 데이터를 가져와 `<Text>` 컴포넌트에 표시하는 예제
- `useState`와 `useEffect` Hook을 함께 사용

```jsx
import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

function DataFetchingScreen() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // 데이터 로딩 상태

  // 1. 데이터를 가져오는 비동기 함수
  const fetchPosts = async () => {
    try {
      // (테스트용 공용 API 사용 - JSONPlaceholder)
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
      const json = await response.json();

      setData(json); // 2. 가져온 데이터를 상태에 저장
    } catch (error) {
      console.error(error);
      setData({ title: '데이터 로드 실패' }); // 에러 발생 시 처리
    } finally {
      setLoading(false); // 3. 로딩 상태 종료
    }
  };

  // 4. useEffect: 컴포넌트가 처음 마운트(화면에 표시)될 때 fetchPosts 함수를 실행
  useEffect(() => {
    fetchPosts();
  }, []); // []는 이 코드가 컴포넌트가 처음 로드될 때 단 한 번만 실행됨을 의미합니다.

  // --- 화면 렌더링 ---

  if (loading) {
    // 5. 로딩 중일 때 로딩 인디케이터 표시
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>데이터를 불러오는 중...</Text>
      </View>
    );
  }

  // 6. 데이터 로드 완료 후 결과 표시
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.title}</Text>
      <Text>{data.body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
});

export default DataFetchingScreen;
```
1. `useState`를 사용하여 데이터(`data`)와 로딩 상태(`loading`)를 관리
2. `useEffect`를 사용하여 컴포넌트가 마운트될 때 (`fetchPosts` 함수) API 요청을 보냄
3. `async/await`와 `fetch`를 사용하여 비동기 통신을 처리
4. `finally` 블록을 사용하여 요청 성공/실패와 관계없이 로딩 상태를 종료
5. 로딩 상태에 따라 다른 UI (`<ActivityIndicator>` 또는 실제 데이터)를 표시

---
