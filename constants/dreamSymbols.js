// Dream Symbol Dictionary Data
// Sources: Freud's "The Interpretation of Dreams", Jungian archetypes
// TODO: Replace with real content from user's source

export const dreamSymbols = [
  {
    id: 'water',
    icon: '💧',
    name: { tr: 'Su', en: 'Water' },
    freudian: {
      tr: 'Su, bilinçdışını ve doğumla ilişkili anıları temsil eder.',
      en: 'Water represents the unconscious and birth-related memories.',
    },
    jungian: {
      tr: 'Su, kolektif bilinçdışının simgesidir.',
      en: 'Water symbolizes the collective unconscious.',
    },
    variations: ['ocean', 'river', 'rain', 'flood'],
  },
  {
    id: 'flying',
    icon: '🕊️',
    name: { tr: 'Uçmak', en: 'Flying' },
    freudian: {
      tr: 'Uçmak, özgürlük arzusunu temsil eder.',
      en: 'Flying represents the desire for freedom.',
    },
    jungian: {
      tr: 'Uçmak, ruhsal özgürlüğü simgeler.',
      en: 'Flying symbolizes spiritual freedom.',
    },
    variations: ['falling', 'floating', 'wings'],
  },
  {
    id: 'teeth',
    icon: '🦷',
    name: { tr: 'Dişler', en: 'Teeth' },
    freudian: {
      tr: 'Diş kaybı rüyaları güç kaybını simgeler.',
      en: 'Dreams of losing teeth symbolize loss of power.',
    },
    jungian: {
      tr: 'Dişler, yeniden doğuşu ve dönüşümü simgeler.',
      en: 'Teeth symbolize rebirth and transformation.',
    },
    variations: ['breaking', 'falling out', 'growing'],
  },
  {
    id: 'snake',
    icon: '🐍',
    name: { tr: 'Yılan', en: 'Snake' },
    freudian: {
      tr: 'Yılan, gizli korkuları temsil eder.',
      en: 'The snake represents hidden fears.',
    },
    jungian: {
      tr: 'Yılan, dönüşüm ve şifa simgesidir.',
      en: 'The snake symbolizes transformation and healing.',
    },
    variations: ['serpent', 'reptile', 'cobra'],
  },
  {
    id: 'death',
    icon: '💀',
    name: { tr: 'Ölüm', en: 'Death' },
    freudian: {
      tr: 'Ölüm rüyaları genellikle değişimi simgeler.',
      en: 'Death dreams often symbolize change.',
    },
    jungian: {
      tr: 'Ölüm, büyük dönüşümün simgesidir.',
      en: 'Death symbolizes major transformation.',
    },
    variations: ['funeral', 'dying', 'corpse'],
  },
  {
    id: 'house',
    icon: '🏠',
    name: { tr: 'Ev', en: 'House' },
    freudian: {
      tr: 'Ev, benliği ve iç dünyayı temsil eder.',
      en: 'The house represents the self and inner world.',
    },
    jungian: {
      tr: 'Ev, ruhun yapısını temsil eder.',
      en: 'The house represents the structure of the psyche.',
    },
    variations: ['room', 'basement', 'attic', 'door'],
  },
  {
    id: 'chase',
    icon: '🏃',
    name: { tr: 'Kovalanmak', en: 'Being Chased' },
    freudian: {
      tr: 'Kovalanma rüyaları, kaçınılan durumları temsil eder.',
      en: 'Chase dreams represent avoided situations.',
    },
    jungian: {
      tr: 'Kovalayan figür genellikle gölge arketiptir.',
      en: 'The chasing figure is often the shadow archetype.',
    },
    variations: ['running', 'hiding', 'escape'],
  },
  {
    id: 'fire',
    icon: '🔥',
    name: { tr: 'Ateş', en: 'Fire' },
    freudian: {
      tr: 'Ateş, tutkuyu ve enerjiyi temsil eder.',
      en: 'Fire represents passion and energy.',
    },
    jungian: {
      tr: 'Ateş, dönüşüm ve saflaştırmanın simgesidir.',
      en: 'Fire symbolizes transformation and purification.',
    },
    variations: ['burning', 'flames', 'smoke'],
  },
  {
    id: 'ocean',
    icon: '🌊',
    name: { tr: 'Okyanus', en: 'Ocean' },
    freudian: {
      tr: 'Okyanus, duygusal derinliği simgeler.',
      en: 'Ocean symbolizes emotional depth.',
    },
    jungian: {
      tr: 'Okyanus, kolektif bilinçdışının enginliğini simgeler.',
      en: 'Ocean symbolizes the vastness of the collective unconscious.',
    },
    variations: ['waves', 'drowning', 'swimming', 'beach'],
  },
  {
    id: 'moon',
    icon: '🌙',
    name: { tr: 'Ay', en: 'Moon' },
    freudian: {
      tr: 'Ay, kadınsı enerjiyi simgeler.',
      en: 'Moon symbolizes feminine energy.',
    },
    jungian: {
      tr: 'Ay, bilinçdışını ve sezgiyi simgeler.',
      en: 'Moon symbolizes the unconscious and intuition.',
    },
    variations: ['night', 'darkness', 'stars'],
  },
];

// Group symbols alphabetically for UI
export const getSymbolsByLetter = (language = 'en') => {
  const grouped = {};
  dreamSymbols.forEach((symbol) => {
    const name = symbol.name[language];
    const firstLetter = name.charAt(0).toUpperCase();
    if (!grouped[firstLetter]) {
      grouped[firstLetter] = [];
    }
    grouped[firstLetter].push(symbol);
  });
  
  Object.keys(grouped).forEach((letter) => {
    grouped[letter].sort((a, b) => 
      a.name[language].localeCompare(b.name[language], language)
    );
  });
  
  return grouped;
};

// Get sorted letters for section list
export const getSortedLetters = (language = 'en') => {
  const grouped = getSymbolsByLetter(language);
  return Object.keys(grouped).sort((a, b) => a.localeCompare(b, language));
};

// Search symbols
export const searchSymbols = (query, language = 'en') => {
  const lowerQuery = query.toLowerCase();
  return dreamSymbols.filter((symbol) =>
    symbol.name[language].toLowerCase().includes(lowerQuery) ||
    symbol.variations.some((v) => v.toLowerCase().includes(lowerQuery))
  );
};
