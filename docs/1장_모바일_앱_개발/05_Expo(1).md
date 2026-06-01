# 05. Expo : 개발 과정을 혁신하는 도구
- React Native는 훌륭하지만, 초기 환경 설정과 복잡한 네이티브 모듈 관리는 초심자에게 큰 장벽이 될 수 있음
- `Expo`는 이러한 `복잡성을 해결`하고, React Native 개발을 웹 개발처럼 쉽고 빠르게 만들어주는 도구와 프레임워크의 집합체

---

### 5-1&#41; Expo를 사용하는 이유와 장점
- Expo는 React Native 위에 한 겹의 편리한 레이어를 추가하여 개발자가 순수하게 `앱의 기능 구현에만 집중`할 수 있음

### ※ 웹 개발 경험과 비교
| 웹개발 | Expo + React Native |
| :--: | :--: |
| `npm install`로 패키지 설치 | `npx create-expo-app`로 프로젝트 생성 |
| `npm start`로 개발 서버 실행 | `npx expo start`로 개발 서버 실행 |
| 브라우저에서 바로 확인 | Expo Go 앱에서 바로 확인 |
| `npm run build`로 빌드 | `eas build`로 클라우더 빌드 |

---

### 5-2&#41; 쉬운 환경 설정과 개발 시작
- `단 하나의 CLI` : 복잡한 Android Studio나 Xcode 설치 없이, `npx create-expo-app` 명령 하나만으로 개발을 시작

```bash
$ npx create-expo-app MyApp cd MyApp npx expo start
```

- `설정 파일 관리` : 네이티브 설정 파일(iOS의 `.xcodeproj`나 Android의 `build.gradle`)을 직접 건드릴 필요가 없음 → Expo가 대신 모든 것을 관리
- 웹 개발자 관점: `webpack.config.js`나 `babel.config.js`를 직접 수정할 필요 없이 CRA가 관리하는 것과 같음
- 장점 : 초심자는 복잡한 네이티브 설정에 신경 쓸 필요 없이 JavaScript 코드만 작성

---

### 5-3&#41; 네이티브 기능의 쉬운 접근(Expo SDK)
- `번들링된 라이브러리` : Expo는 카메라, GPS, 알림, 파일 시스템 등 모바일 앱에 필수적인 네이티브 기능들을 `Expo SDK`라는 하나의 패키지에 미리 통합(Bundle)
- `포함된 기능 예시`
  - 카메라 (expo-camera)
  - 위치 정보 (expo-location)
  - 푸시 알림 (expo-notifications)
  - 파일 시스템 (expo-file-system)
- `간단한 API` : 개발자는 복잡한 네이티브 코드를 작성할 필요 없이, JavaScript 코드 몇 줄만으로 이러한 기기 기능을 사용할 수 있음
  - 예&#41; 카메라를 사용하기 위해 복잡한 네이티브 모듈을 링크할 필요가 없음
- 실제 코드 예시
   ```js
   // 카메라 사용 (단 몇 줄!) import { Camera } from 'expo-camera';
   ```

---

### 5-4&#41; 배포의 간소화(EAS Build)
- `클라우드 빌드`
  - 앱을 스토어에 배포하기 위해 필요한 최종 파일(.ipa 또는 .aab)을 Expo 서버에서 대신 빌드
  - 개발자의 컴퓨터에 고성능 빌드 환경(특히 macOS)이 없어도 앱을 쉽게 만들 수 있음
- 웹 개발자 관점: 마치 Vercel이나 Netlify에서 자동으로 빌드하고 배포해주는 것과 같음
- 한 줄로 iOS와 Android 모두 빌드
  ```bash
  $ eas build --platform all
  ```
- 장점
  - Windows에서도 iOS 앱 빌드 가능 (일반적으로는 macOS 필요)
  - 빌드 서버 관리 불필요
  - 자동화된 배포 파이프라인

---