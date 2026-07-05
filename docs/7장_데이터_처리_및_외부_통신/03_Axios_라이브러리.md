# 3. Axios 라이브러리
- fetch API는 훌륭하지만, 더 편리한 기능을 제공하는 라이브러리
- **Axios**는 가장 인기 있는 HTTP 클라이언트 라이브러리로, fetch보다 더 간결하고 강력한 기능을 제공함

---

### 3-1&#41; Axios vs fetch

| **기능** | **fetch** | **Axios** |
| :--: | :--: | :--: |
| **JSON 변환**	| `response.json()` 필요 | 자동 변환 |
| **에러 처리**	| 수동으로 `response.ok` 확인 | 자동으로 에러 throw |
| **타임아웃** | AbortController 필요	| 옵션으로 간단 설정 |
| **요청 취소** | AbortController	| CancelToken |
| **인터셉터** | 없음	| 지원 |
| **진행 상태**	| 없음 | 지원 |
| **브라우저 지원** | 내장 | 라이브러리 필요 |

---

### 3-2&#41; Axios 설치 및 기본 사용법
**① 설치**
```bash
npm install axios
# 또는
yarn add axios
```

**② 기본 GET 요청**
```jsx
import axios from 'axios';

// fetch 방식
const response = await fetch(url);
const data = await response.json();

// axios 방식 (더 간결!)
const { data } = await axios.get(url);
```

**③ 예제**
```jsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

function AxiosExample() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      // Axios GET 요청
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
      );

      // response.data에 자동으로 파싱된 JSON이 들어있음
      setUsers(response.data);
    } catch (err) {
      // Axios는 4xx, 5xx 응답을 자동으로 에러로 처리
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Text>로딩 중...</Text>;
  if (error) return <Text>에러: {error}</Text>;

  return (
    <FlatList
      data={users}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.userCard}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text>{item.email}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  userCard: {
    padding: 16,
    backgroundColor: 'white',
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  }
});

export default AxiosExample;
```

---

### 3-3&#41; 다양한 HTTP 메서드
```jsx
// GET
const { data } = await axios.get('/users');

// POST
const { data } = await axios.post('/users', {
  name: '홍길동',
  email: 'hong@example.com'
});

// PUT
const { data } = await axios.put('/users/1', {
  name: '홍길동 수정'
});

// PATCH
const { data } = await axios.patch('/users/1', {
  email: 'newemail@example.com'
});

// DELETE
await axios.delete('/users/1');
```

---

### 3-4&#41; Axios 설정 옵션
```jsx
const response = await axios.get('/users', {
  // URL 쿼리 파라미터
  params: {
    page: 1,
    limit: 10,
    sort: 'name'
  },

  // 헤더
  headers: {
    'Authorization': 'Bearer token123',
    'Custom-Header': 'value'
  },

  // 타임아웃 (밀리초)
  timeout: 5000,

  // 응답 타입
  responseType: 'json', // 'json', 'text', 'blob', 'arraybuffer'

  // 진행 상태
  onDownloadProgress: (progressEvent) => {
    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    console.log(`다운로드: ${percentCompleted}%`);
  }
});
```

---

### 3-5&#41; Axios 인스턴스 생성
- API의 기본 설정을 재사용하기 위해 인스턴스를 만들 수 있음

```jsx
// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;

// 사용
import api from './api';

const { data } = await api.get('/users');  // https://api.example.com/users로 요청
```

---

### 3-6&#41; 인터셉터: 요청/응답 가로채기
- 모든 요청에 토큰을 추가하거나, 모든 응답의 에러를 처리할 수 있음

```jsx
// api.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000
});

// 요청 인터셉터: 모든 요청에 토큰 추가
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('요청:', config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 에러 공통 처리
api.interceptors.response.use(
  (response) => {
    console.log('응답:', response.status, response.config.url);
    return response;
  },
  async (error) => {
    if (error.response) {
      // 서버가 응답을 반환했지만 2xx가 아님
      const { status } = error.response;

      if (status === 401) {
        // 인증 만료: 로그아웃 처리
        await AsyncStorage.removeItem('token');
        // 로그인 화면으로 이동
        console.log('토큰 만료, 로그인 필요');
      } else if (status === 403) {
        console.log('권한 없음');
      } else if (status === 500) {
        console.log('서버 오류');
      }
    } else if (error.request) {
      // 요청은 보냈지만 응답이 없음
      console.log('네트워크 오류');
    } else {
      // 요청 설정 중 오류 발생
      console.log('요청 오류:', error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
```

---

### 3-7&#41; 실전 예제 : 인증이 있는 API
```jsx
// services/authService.js
import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const authService = {
  // 로그인
  login: async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    await AsyncStorage.setItem('token', data.token);
    return data;
  },

  // 로그아웃
  logout: async () => {
    await AsyncStorage.removeItem('token');
  },

  // 회원가입
  register: async (email, password, name) => {
    const { data } = await api.post('/auth/register', { email, password, name });
    return data;
  },

  // 현재 사용자 정보
  getCurrentUser: async () => {
    const { data } = await api.get('/auth/me');
    return data;
  }
};

// services/postService.js
import api from './api';

export const postService = {
  // 게시물 목록
  getPosts: async (page = 1, limit = 10) => {
    const { data } = await api.get('/posts', {
      params: { page, limit }
    });
    return data;
  },

  // 게시물 상세
  getPost: async (id) => {
    const { data } = await api.get(`/posts/${id}`);
    return data;
  },

  // 게시물 생성
  createPost: async (postData) => {
    const { data } = await api.post('/posts', postData);
    return data;
  },

  // 게시물 수정
  updatePost: async (id, postData) => {
    const { data } = await api.put(`/posts/${id}`, postData);
    return data;
  },

  // 게시물 삭제
  deletePost: async (id) => {
    await api.delete(`/posts/${id}`);
  }
};

// 사용 예시
import { postService } from './services/postService';

function PostsScreen() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const data = await postService.getPosts(1, 20);
      setPosts(data.posts);
    } catch (error) {
      Alert.alert('오류', '게시물을 불러올 수 없습니다.');
    }
  };

  // ...
}
```

---