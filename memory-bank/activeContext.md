# Active Context: Dream Journal Mobile

## Current Status

✅ **Calendar View Added** - Dreams shown by date with category-colored dots.
✅ **Date Selection** - Users can select a date when adding dreams (defaults to today).

## Recent Changes (Dec 31, 2024)

### Date Selection for Dreams

- Updated `dream.service.js` to accept optional `dreamDate` using Firestore `Timestamp`
- Updated `dreamStore.js` to pass date parameter
- Added date picker button and calendar modal to `add.jsx`
- Future dates are disabled

### Calendar Feature

- `app/(tabs)/calendar.jsx` with category-colored dots
- Day selection to view dreams
- Tab navigation: Dreams → Calendar → Add → Profile

### Previous

- Deep Nebula glassmorphic theme
- Localized AI prompts (TR/EN)

## Dependencies

`expo-router`, `zustand`, `firebase`, `expo-linear-gradient`, `expo-blur`, `react-native-calendars`

## Next Steps

1. [ ] Dream editing
2. [ ] Google Sign-In
3. [ ] Dream statistics
