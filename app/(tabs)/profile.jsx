import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAuthStore } from '../../store/authStore';
import { useTranslation } from '../../store/languageStore';

export default function ProfileScreen() {
  const { user, signOut, isLoading } = useAuthStore();
  const { t, language, setLanguage, getLanguages, getCurrentLanguage } = useTranslation();
  const currentLang = getCurrentLanguage();
  const languages = getLanguages();

  const handleSignOut = () => {
    Alert.alert(
      t('logout'),
      t('logout_confirm'),
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('logout'),
          style: 'destructive',
          onPress: async () => {
            await signOut();
          },
        },
      ]
    );
  };

  const handleLanguageChange = (langCode) => {
    setLanguage(langCode);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.email?.charAt(0).toUpperCase() || '?'}
          </Text>
        </View>
        <Text style={styles.email}>{user?.email || t('unknown_user')}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('account')}</Text>
        
        <View style={styles.menuItem}>
          <Text style={styles.menuIcon}>📧</Text>
          <View style={styles.menuContent}>
            <Text style={styles.menuLabel}>{t('email')}</Text>
            <Text style={styles.menuValue}>{user?.email}</Text>
          </View>
        </View>

        <View style={styles.menuItem}>
          <Text style={styles.menuIcon}>📅</Text>
          <View style={styles.menuContent}>
            <Text style={styles.menuLabel}>{t('registration_date')}</Text>
            <Text style={styles.menuValue}>
              {user?.metadata?.creationTime
                ? new Date(user.metadata.creationTime).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US')
                : t('unknown')}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('language')}</Text>
        <View style={styles.languageContainer}>
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={[
                styles.languageOption,
                language === lang.code && styles.languageOptionActive,
              ]}
              onPress={() => handleLanguageChange(lang.code)}
            >
              <Text style={styles.languageFlag}>{lang.flag}</Text>
              <Text
                style={[
                  styles.languageName,
                  language === lang.code && styles.languageNameActive,
                ]}
              >
                {lang.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('app')}</Text>
        
        <View style={styles.menuItem}>
          <Text style={styles.menuIcon}>🌙</Text>
          <View style={styles.menuContent}>
            <Text style={styles.menuLabel}>{t('app_name')}</Text>
            <Text style={styles.menuValue}>v1.0.0</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.signOutButton}
        onPress={handleSignOut}
        disabled={isLoading}
      >
        <Text style={styles.signOutText}>{t('logout')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a1a',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  profileCard: {
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#2a2a4e',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#6c5ce7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  email: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '500',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#2a2a4e',
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  menuContent: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 2,
  },
  menuValue: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  languageContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  languageOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2a2a4e',
    gap: 8,
  },
  languageOptionActive: {
    backgroundColor: '#6c5ce7',
    borderColor: '#6c5ce7',
  },
  languageFlag: {
    fontSize: 24,
  },
  languageName: {
    fontSize: 16,
    color: '#888',
    fontWeight: '500',
  },
  languageNameActive: {
    color: '#fff',
  },
  signOutButton: {
    backgroundColor: '#ff4757',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  signOutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
