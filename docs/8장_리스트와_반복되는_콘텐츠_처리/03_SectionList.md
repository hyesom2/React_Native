# 3. SectionList : 그룹화된 리스트
- SectionList는 FlatList와 유사하지만, 데이터를 섹션(그룹)으로 나눌 수 있음
- 연락처 앱의 가나다 순 구분, 설정 앱의 카테고리별 구분 등에 사용됨

---

### 3-1&#41; 기본 사용법
```jsx
import React from 'react';
import { SectionList, View, Text, StyleSheet } from 'react-native';

function ContactsScreen() {
  const sections = [
    {
      title: 'ㄱ',
      data: [
        { id: '1', name: '김철수', phone: '010-1234-5678' },
        { id: '2', name: '강민수', phone: '010-2345-6789' },
      ]
    },
    {
      title: 'ㄴ',
      data: [
        { id: '3', name: '나영희', phone: '010-3456-7890' },
      ]
    },
    {
      title: 'ㄷ',
      data: [
        { id: '4', name: '도준호', phone: '010-4567-8901' },
        { id: '5', name: '두산', phone: '010-5678-9012' },
      ]
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.phone}>{item.phone}</Text>
    </View>
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}

      // 섹션 사이 간격
      SectionSeparatorComponent={() => <View style={{ height: 16 }} />}

      // 아이템 사이 간격
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    paddingLeft: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  item: {
    padding: 16,
    paddingLeft: 20,
    backgroundColor: 'white',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  phone: {
    fontSize: 14,
    color: '#666',
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginLeft: 20,
  }
});

export default ContactsScreen;
```

---

### 3-2&#41; 실전 예제 : 설정 화면
```jsx
function SettingsScreen() {
  const sections = [
    {
      title: '계정',
      data: [
        { id: '1', label: '프로필 수정', icon: 'person' },
        { id: '2', label: '비밀번호 변경', icon: 'lock-closed' },
        { id: '3', label: '로그아웃', icon: 'log-out' },
      ]
    },
    {
      title: '알림',
      data: [
        { id: '4', label: '푸시 알림', icon: 'notifications', toggle: true },
        { id: '5', label: '이메일 알림', icon: 'mail', toggle: true },
      ]
    },
    {
      title: '기타',
      data: [
        { id: '6', label: '이용약관', icon: 'document-text' },
        { id: '7', label: '개인정보처리방침', icon: 'shield' },
        { id: '8', label: '버전 정보', icon: 'information-circle' },
      ]
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={() => handlePress(item)}
    >
      <View style={styles.settingLeft}>
        <Ionicons name={item.icon} size={24} color="#007AFF" />
        <Text style={styles.settingLabel}>{item.label}</Text>
      </View>

      {item.toggle ? (
        <Switch value={true} />
      ) : (
        <Ionicons name="chevron-forward" size={20} color="#999" />
      )}
    </TouchableOpacity>
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      stickySectionHeadersEnabled={true}  // 섹션 헤더 고정
    />
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    paddingLeft: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    textTransform: 'uppercase',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingLeft: 20,
    backgroundColor: 'white',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingLabel: {
    fontSize: 16,
  }
});
```

---