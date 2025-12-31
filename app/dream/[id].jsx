import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo } from 'react';
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { CATEGORIES } from '../../constants/categories';
import { borderRadius, colors, shadows } from '../../constants/theme';
import { useAuthStore } from '../../store/authStore';
import { useDreamStore } from '../../store/dreamStore';
import { useTranslation } from '../../store/languageStore';

export default function DreamDetailScreen() {
  const { id } = useLocalSearchParams();
  const { user } = useAuthStore();
  const { currentDream, fetchDreamById, deleteDream, isLoading, clearCurrentDream, dreams } = useDreamStore();
  const { t, language } = useTranslation();

  // Try to get dream from cached list first to avoid flashing
  const cachedDream = useMemo(() => {
    return dreams.find(d => d.id === id);
  }, [dreams, id]);

  // Use cached dream or fetched currentDream
  const dream = currentDream || cachedDream;

  useEffect(() => {
    if (user?.uid && id) {
      fetchDreamById(user.uid, id);
    }
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

  // Only show loading if we have no dream data at all
  if (isLoading && !dream) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!dream) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{t('dream_not_found')}</Text>
      </View>
    );
  }

  const categoryLabel = t(CATEGORIES.find(c => c.id === dream.category)?.labelKey || 'cat_other');

  return (
    <>
      <Stack.Screen
        options={{
          title: '',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          contentStyle: { backgroundColor: colors.background },
        }}
      />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{dream.title}</Text>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{categoryLabel}</Text>
          </View>
          <Text style={styles.date}>
            {dream.createdAt?.toDate?.()?.toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }) || t('unknown_date')}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📝 {t('dream')}</Text>
          <View style={styles.card}>
            <Text style={styles.dreamContent}>{dream.content}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔮 {t('ai_analysis')}</Text>
          <View style={[styles.card, styles.analysisCard]}>
            <Text style={styles.analysisText}>{dream.analysis}</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.deleteButton} 
          onPress={handleDelete}
          activeOpacity={0.8}
        >
          <Text style={styles.deleteButtonText}>🗑️ {t('delete_dream')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  errorText: {
    fontSize: 18,
    color: colors.textSecondary,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  categoryBadge: {
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '600',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  date: {
    fontSize: 14,
    color: colors.textMuted,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  card: {
    backgroundColor: colors.cardBg,
    borderRadius: borderRadius.xxl,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.card,
  },
  dreamContent: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 26,
  },
  analysisCard: {
    borderColor: colors.primary,
    borderWidth: 1,
  },
  analysisText: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 26,
  },
  deleteButton: {
    backgroundColor: colors.cardBg,
    borderRadius: borderRadius.lg,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.danger,
    marginTop: 12,
  },
  deleteButtonText: {
    color: colors.danger,
    fontSize: 16,
    fontWeight: '600',
  },
});
