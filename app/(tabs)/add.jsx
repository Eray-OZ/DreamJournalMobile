import { router } from 'expo-router';
import { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { CATEGORIES } from '../../constants/categories';
import { useAuthStore } from '../../store/authStore';
import { useDreamStore } from '../../store/dreamStore';
import { useTranslation } from '../../store/languageStore';

export default function AddDreamScreen() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Diğer');
  const { user } = useAuthStore();
  const { addDream, isLoading } = useDreamStore();
  const { t } = useTranslation();

  // Filter out 'all' from categories for selection
  const selectableCategories = CATEGORIES.filter(c => c.id !== 'all');

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert(t('error'), t('enter_title'));
      return;
    }

    if (!content.trim()) {
      Alert.alert(t('error'), t('enter_dream'));
      return;
    }

    if (content.trim().length < 20) {
      Alert.alert(t('error'), t('dream_too_short'));
      return;
    }

    const { id, error } = await addDream(user.uid, title.trim(), content.trim(), selectedCategory);

    if (id) {
      Alert.alert(t('success'), t('dream_saved'), [
        {
          text: t('confirm'),
          onPress: () => {
            setTitle('');
            setContent('');
            setSelectedCategory('Diğer');
            router.push('/(tabs)');
          },
        },
      ]);
    } else if (error) {
      Alert.alert(t('error'), error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.emoji}>✨</Text>
          <Text style={styles.title}>{t('new_dream')}</Text>
          <Text style={styles.subtitle}>{t('add_dream_subtitle')}</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t('dream_title')}</Text>
            <TextInput
              style={styles.input}
              placeholder={t('dream_title_placeholder')}
              placeholderTextColor="#666"
              value={title}
              onChangeText={setTitle}
              maxLength={100}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t('category')}</Text>
            <View style={styles.categoryGrid}>
              {selectableCategories.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.categoryOption,
                    selectedCategory === cat.id && styles.categoryOptionActive,
                  ]}
                  onPress={() => setSelectedCategory(cat.id)}
                >
                  <Text style={styles.categoryOptionIcon}>{cat.icon}</Text>
                  <Text
                    style={[
                      styles.categoryOptionText,
                      selectedCategory === cat.id && styles.categoryOptionTextActive,
                    ]}
                  >
                    {t(cat.labelKey)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t('your_dream')}</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder={t('dream_content_placeholder')}
              placeholderTextColor="#666"
              value={content}
              onChangeText={setContent}
              multiline
              numberOfLines={8}
              textAlignVertical="top"
            />
            <Text style={styles.charCount}>{content.length} {t('characters')}</Text>
          </View>

          <TouchableOpacity
            style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator color="#fff" size="small" />
                <Text style={styles.loadingText}>{t('analyzing')}</Text>
              </View>
            ) : (
              <Text style={styles.submitButtonText}>{t('save_and_analyze')}</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.tips}>
          <Text style={styles.tipsTitle}>💡 {t('tips')}</Text>
          <Text style={styles.tipText}>• {t('tip_1')}</Text>
          <Text style={styles.tipText}>• {t('tip_2')}</Text>
          <Text style={styles.tipText}>• {t('tip_3')}</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a1a',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  input: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#2a2a4e',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2a2a4e',
  },
  categoryOptionActive: {
    backgroundColor: '#6c5ce7',
    borderColor: '#6c5ce7',
  },
  categoryOptionIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  categoryOptionText: {
    fontSize: 14,
    color: '#888',
    fontWeight: '500',
  },
  categoryOptionTextActive: {
    color: '#fff',
  },
  textArea: {
    minHeight: 160,
    paddingTop: 16,
  },
  charCount: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: '#6c5ce7',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 12,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
  },
  tips: {
    marginTop: 32,
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2a2a4e',
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  tipText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 6,
    lineHeight: 20,
  },
});
