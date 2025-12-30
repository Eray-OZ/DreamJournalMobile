# Active Context: Dream Journal Mobile

## Current Status

✅ **Core implementation complete** - App structure, authentication, and dream features built.

## Recent Changes (Latest Session)

1. Created Expo project with tabs template
2. Set up Firebase configuration with offline persistence
3. Implemented Zustand stores (auth + dreams)
4. Built all screens:
   - Login/Register (auth)
   - Dream list with search/filter
   - Add dream with Gemini integration
   - Dream detail view
   - Profile with logout

## Active Decisions

- Using **Zustand** for state management (per user preference)
- Using **Expo Router** for navigation (per user preference)
- Dark theme with purple accent (#6c5ce7)
- Turkish language for UI

## Current Work Focus

🔧 **Awaiting Firebase Setup** - User needs to:

1. Create Firebase project
2. Enable Auth providers
3. Set up Firestore
4. Add environment variables

## Next Steps

1. [ ] User: Create Firebase project and configure `.env`
2. [ ] Add Google Sign-In implementation (expo-auth-session)
3. [ ] Test full flow on iOS/Android simulators
4. [ ] Polish: loading states, error boundaries

## Known Issues

- Google Sign-In shows placeholder alert (needs expo-auth-session config)
- TypeScript lint warning in index.tsx (renderItem implicit 'any')

## Blockers

- Firebase credentials required to test authentication
- Gemini API key required to test dream analysis
