# Active Context: Dream Journal Mobile

## Current Status

✅ **UI Revamp Complete** - Deep Nebula glassmorphic design implemented.
✅ **Localization Complete** - AI prompts respond to app language (TR/EN).
✅ **UX Improved** - Direct navigation to dream detail after creation.

## Recent Changes (Dec 31, 2024 - Session 2)

### UI/UX

1. **Theme**: Deep Nebula Purple (`#0F0720`) with violet/pink gradients.
2. **Tab Bar**: Floating glass tab bar with gradient FAB.
3. **Home Screen**: Minimalist header, glassmorphic cards, pill search.
4. **Dream Detail**: Clean header (Title → Date → Category), gradient AI Analysis border.
5. **Post-Creation Flow**: Removed success alert, direct navigation to new dream.

### Code Changes

- `constants/theme.js`: New color palette and glassmorphism tokens.
- `app/_layout.tsx`: Global theme colors.
- `app/(tabs)/_layout.tsx`: Glass tab bar with BlurView + LinearGradient FAB.
- `app/(tabs)/index.tsx`: Redesigned dream list and header.
- `app/(tabs)/add.jsx`: Passes language to AI, navigates to dream detail on success.
- `app/dream/[id].jsx`: Refined header layout.
- `services/ai.service.js`: Localized prompts (TR/EN), removed unused category prompt.
- `store/dreamStore.js`: `addDream` accepts language parameter.

### Dependencies Added

- `expo-linear-gradient`
- `expo-blur`

## Next Steps

1. [ ] Test Google Sign-In
2. [ ] Dream editing feature
3. [ ] Pull-to-refresh refinement

## Known Issues

- None.
