import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import en from '../constants/locales/en';
import tr from '../constants/locales/tr';

const translations = { tr, en };

export const useLanguageStore = create(
  persist(
    (set, get) => ({
      language: 'tr', // default language
      
      // Get current translations
      t: (key) => {
        const lang = get().language;
        return translations[lang]?.[key] || translations['en']?.[key] || key;
      },
      
      // Set language
      setLanguage: (lang) => {
        if (translations[lang]) {
          set({ language: lang });
        }
      },
      
      // Get available languages
      getLanguages: () => [
        { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
        { code: 'en', name: 'English', flag: '🇬🇧' },
      ],
      
      // Get current language info
      getCurrentLanguage: () => {
        const lang = get().language;
        const langs = get().getLanguages();
        return langs.find(l => l.code === lang) || langs[0];
      },
    }),
    {
      name: 'language-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// Hook for easy translation access
export const useTranslation = () => {
  const { t, language, setLanguage, getLanguages, getCurrentLanguage } = useLanguageStore();
  return { t, language, setLanguage, getLanguages, getCurrentLanguage };
};
