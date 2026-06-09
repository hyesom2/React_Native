// blank 템플릿의 App.js와 동일

import { StyleSheet, Text, View } from 'react-native';


export default function HomeScreen() {
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
