# Active Context: REM

## Current Work Focus

The project has just completed a major rebranding and UI polish phase. Every screen has been updated to reflect the new **REM** identity, and a premium animation suite has been integrated using `react-native-reanimated`.

## Recent Changes

- **Rebranding**: Successfully renamed the project to **REM**.
  - Updated `app.json`, `package.json`, and all localized headers.
  - Replaced "Dream Journal" with "REM" in English and Turkish locales.
  - Updated app icons and adaptive icons with deep nebula artwork.
- **Animations (Deep Nebula Suite)**:
  - **Staggered List Entrances**: Dreams list now slides and fades in progressively.
  - **SVG Draw Underlines**: Implemented `WavyUnderline` component using SVG `strokeDashoffset` for "writing" effects.
  - **Tactile Scale Micro-interactions**: Created `ScaleButton` component for springy haptic feedback on all tap targets.
  - **Pulsing Glow**: Added a "breathing" animation to the Top Theme card in Stats.
- **Build Infrastructure**:
  - Configured `eas.json` for Android APK generation using the `preview` profile.
  - Implemented `.easignore` to ensure `.env` keys are uploaded to the build server safely.
  - Resolved startup crash by ensuring `expo-router` imports were correct in `stats.jsx`.

## Active Decisions

- **Standardized Haptics**: Every button that triggers an action should now use `<ScaleButton>` instead of `<TouchableOpacity>`.
- **SVG Underlines**: All page titles should use `<WavyUnderline />` for consistency.
- **Managed Workflow**: Staying within the Expo Managed workflow to maximize cross-platform reliability despite the custom animations.

## Next Steps

1. **Build Verification**: Monitor the current EAS build (`npx eas build --profile preview --platform android`).
2. **New Feature Exploration**:
   - AI Dream Interpretation improvements.
   - Lucid Dreaming check reminders.
   - Voice recording support for dream entries.
   - Security Vault / Biometric Lock.
