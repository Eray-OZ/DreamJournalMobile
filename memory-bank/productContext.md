# Product Context: Dream Journal Mobile

## Problem Statement

Users who journal their dreams need a simple, accessible way to:

1. Record dreams quickly before they fade
2. Understand the meaning behind their dreams
3. Track patterns across dreams over time

## Target Users

- Dream journaling enthusiasts
- People interested in self-reflection
- Users seeking psychological insight from dreams

## User Experience Goals

### Core Experience

1. **Quick Entry** - Minimal friction to record a dream
2. **Instant Insight** - AI analysis delivered immediately after saving
3. **Easy Browsing** - Find past dreams by category or search
4. **Always Available** - Works offline, syncs when connected

### User Journey

```
Open App → Login (once) → See Dream List → Add Dream →
Enter Title + Content → Submit → View AI Analysis →
Browse/Search Past Dreams → Filter by Category
```

## Functional Logic

### Dream Flow

1. User enters dream title and content
2. App sends content to Gemini API for analysis
3. Gemini returns:
   - Psychological/symbolic analysis
   - Category classification
4. Dream saved to Firestore with analysis
5. User can view, search, filter, or delete dreams

### Categories

| Category     | Turkish | Description                |
| ------------ | ------- | -------------------------- |
| Fear         | Korku   | Nightmare, anxiety dreams  |
| Relationship | İlişki  | Dreams about relationships |
| Work         | İş      | Career/work related        |
| Family       | Aile    | Family members             |
| Past         | Geçmiş  | Memories, nostalgia        |
| Future       | Gelecek | Aspirations, predictions   |
| Other        | Diğer   | Uncategorized              |

## Value Proposition

- **Privacy** - Only user sees their dreams
- **AI Analysis** - Professional-level dream interpretation
- **Convenience** - Mobile-first, always accessible
- **Organization** - Automatic categorization
