# Tech Context: REM

## Technology Stack

| Layer      | Technology          | Version   |
| ---------- | ------------------- | --------- |
| Framework  | Expo (React Native) | SDK ~52   |
| Navigation | Expo Router         | Built-in  |
| State      | Zustand             | Latest    |
| Auth       | Firebase Auth       | v10+      |
| Database   | Cloud Firestore     | v10+      |
| AI         | Gemini API          | 2.0-flash |
| Animations | Reanimated          | Latest    |
| Build      | EAS Build           | Managed   |

## Dependencies

### Core

```json
{
  "expo": "~52.x",
  "react": "18.x",
  "react-native": "0.76.x",
  "firebase": "^10.x",
  "zustand": "^4.x",
  "react-native-reanimated": "~3.16.1",
  "@react-native-async-storage/async-storage": "^2.x"
}
```

### UI/Navigation

- `expo-router` - File-based routing
- `@expo/vector-icons` - Icon library
- `@react-navigation/native` - Navigation primitives

## Development Setup

### Requirements

- Node.js v18+
- npm or yarn
- Expo CLI (`npx expo`)
- iOS Simulator (macOS) or Android Emulator

### Commands

```bash
npm install          # Install dependencies
npx expo start       # Start dev server
npx expo run:ios     # Run on iOS simulator
npx expo run:android # Run on Android emulator
npx eas build -p android --profile preview # Build APK locally/cloud
```

## External Services

### Firebase

- **Auth**: Email/Password, Google Sign-In
- **Firestore**: Document database with offline persistence
- **Console**: https://console.firebase.google.com

### Gemini API

- **Model**: `gemini-2.0-flash`
- **Endpoint**: `https://generativelanguage.googleapis.com/v1beta/...`
- **Console**: https://aistudio.google.com

## Environment Variables

```env
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=
EXPO_PUBLIC_GEMINI_API_KEY=
```

## Constraints

- Expo managed workflow (no native code modifications)
- Must support iOS 13+ and Android API 21+
- Gemini API rate limits apply
- Firebase free tier limits (Spark plan)

## File Structure

```
DreamJournal/
├── app/             # Expo Router screens
├── components/      # Reusable UI components
├── constants/       # App constants
├── services/        # API services
├── store/           # Zustand stores
├── hooks/           # Custom hooks
├── assets/          # Fonts, images
└── memory-bank/     # Project documentation
```
