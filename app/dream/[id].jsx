import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { CATEGORIES, getCategoryIcon } from '../../constants/categories';
import { useAuthStore } from '../../store/authStore';
import { useDreamStore } from '../../store/dreamStore';
import { useTranslation } from '../../store/languageStore';

export default function DreamDetailScreen() {
  const { id } = useLocalSearchParams();
  const { user } = useAuthStore();
  const { currentDream, fetchDreamById, deleteDream, isLoading, clearCurrentDream } = useDreamStore();
  const { t, language } = useTranslation();

  useEffect(() => {
    if (user?.uid && id) {
      fetchDreamById(user.uid, id);
    }

    return () => {
      clearCurrentDream();
    };
  }, [user?.uid, id]);

  const handleDelete = () => {
    Alert.alert(
      t('delete_dream'),
      t('delete_confirm'),
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('delete'),
          style: 'destructive',
          onPress: async () => {
            const { error } = await deleteDream(user.uid, id);
            if (!error) {
              router.back();
            } else {
              Alert.alert(t('error'), error);
            }
          },
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6c5ce7" />
      </View>
    );
  }

  if (!currentDream) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{t('dream_not_found')}</Text>
      </View>
    );
  }

  const categoryLabel = t(CATEGORIES.find(c => c.id === currentDream.category)?.labelKey || 'cat_other');

  return (
    <>
      <Stack.Screen
        options={{
          title: t('dream_detail'),
          headerStyle: { backgroundColor: '#0a0a1a' },
          headerTintColor: '#fff',
        }}
      />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryIcon}>
              {getCategoryIcon(currentDream.category)}
            </Text>
            <Text style={styles.categoryText}>{categoryLabel}</Text>
          </View>
          <Text style={styles.title}>{currentDream.title}</Text>
          <Text style={styles.date}>
            {currentDream.createdAt?.toDate?.()?.toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }) || t('unknown_date')}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📝 {t('dream')}</Text>
          <View style={styles.card}>
            <Text style={styles.dreamContent}>{currentDream.content}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔮 {t('ai_analysis')}</Text>
          <View style={[styles.card, styles.analysisCard]}>
            <Text style={styles.analysisText}>{currentDream.analysis}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>🗑️ {t('delete_dream')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a0a1a',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a0a1a',
  },
  errorText: {
    fontSize: 18,
    color: '#888',
  },
  header: {
    marginBottom: 24,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6c5ce7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  categoryIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  categoryText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: '#888',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2a2a4e',
  },
  dreamContent: {
    fontSize: 16,
    color: '#ddd',
    lineHeight: 26,
  },
  analysisCard: {
    borderColor: '#6c5ce7',
    borderWidth: 1,
  },
  analysisText: {
    fontSize: 16,
    color: '#ddd',
    lineHeight: 26,
  },
  deleteButton: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ff4757',
    marginTop: 12,
  },
  deleteButtonText: {
    color: '#ff4757',
    fontSize: 16,
    fontWeight: '600',
  },
});
