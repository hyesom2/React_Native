// blank 템플릿의 App.js와 동일

import { StyleSheet, Text, View } from 'react-native';


export default function HomeScreen() {
  console.log('일반 로그');            // 정보 출력
console.warn('경고 메시지');         // 노란색 경고 (앱에 노란 배경으로 표시됨)
console.error('에러 메시지');        // 빨간색 에러 (앱에 빨간 화면으로 표시됨)
  console.table([{ a: 1, b: 2 }, { a: 3, b: 4 }]);
  
  return (
    <View style={styles.container}>
      <Text style={styles.helloText}>Hello World! (나의 첫 React Native 앱)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  helloText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'blue',
  }
});
