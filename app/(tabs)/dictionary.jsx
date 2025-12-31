import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { useTranslation, useLanguageStore } from '../../store/languageStore';
import {
  dreamSymbols,
  getSymbolsByLetter,
  getSortedLetters,
  searchSymbols,
} from '../../constants/dreamSymbols';
import SymbolDetailModal from '../../components/SymbolDetailModal';
import { WavyUnderline } from '../../components/WavyUnderline';

export default function DictionaryScreen() {
  const { t } = useTranslation();
  const { language } = useLanguageStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Get sections data for SectionList
  const sections = useMemo(() => {
    if (searchQuery.trim()) {
      // Search mode - flat list
      const results = searchSymbols(searchQuery, language);
      if (results.length === 0) return [];
      return [{ title: t('search_results') || 'Results', data: results }];
    }

    // Alphabetical mode
    const grouped = getSymbolsByLetter(language);
    const letters = getSortedLetters(language);
    return letters.map((letter) => ({
      title: letter,
      data: grouped[letter],
    }));
  }, [searchQuery, language, t]);

  const handleSymbolPress = useCallback((symbol) => {
    setSelectedSymbol(symbol);
    setModalVisible(true);
  }, []);

  const renderSectionHeader = useCallback(({ section }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{section.title}</Text>
    </View>
  ), []);

  const renderItem = useCallback(({ item }) => (
    <TouchableOpacity
      style={styles.symbolCard}
      onPress={() => handleSymbolPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.symbolIconContainer}>
        <Text style={styles.symbolIcon}>{item.icon}</Text>
      </View>
      <View style={styles.symbolInfo}>
        <Text style={styles.symbolName}>{item.name[language]}</Text>
        <Text style={styles.symbolPreview} numberOfLines={1}>
          {item.freudian[language].substring(0, 50)}...
        </Text>
      </View>
      <FontAwesome name="chevron-right" size={14} color={colors.textMuted} />
    </TouchableOpacity>
  ), [language, handleSymbolPress]);

  const keyExtractor = useCallback((item) => item.id, []);

  return (
    <View style={styles.container}>
      {/* Header - matching app design */}
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>REM</Text>
          <View style={styles.titleRow}>
            <View>
              <Text style={styles.headerTitle}>{t('dictionary_title') || 'Dictionary'}</Text>
              <WavyUnderline />
            </View>
          </View>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder={t('search_symbols') || 'Search symbols...'}
            placeholderTextColor={colors.textTertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <FontAwesome name="times-circle" size={16} color={colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Symbol Count */}
      <View style={styles.countContainer}>
        <Text style={styles.countText}>
          {dreamSymbols.length} {t('symbols') || 'symbols'}
        </Text>
      </View>

      {/* Symbol List */}
      <SectionList
        sections={sections}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled={true}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <FontAwesome name="search" size={48} color={colors.textMuted} />
            <Text style={styles.emptyText}>
              {t('no_symbols_found') || 'No symbols found'}
            </Text>
          </View>
        }
      />

      {/* Symbol Detail Modal */}
      <SymbolDetailModal
        visible={modalVisible}
        symbol={selectedSymbol}
        onClose={() => setModalVisible(false)}
        language={language}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  eyebrow: {
    color: colors.primaryLight,
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 4,
    opacity: 0.8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: colors.primaryLight,
    letterSpacing: -1,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  searchSection: {
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBg,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 20,
    height: 56,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 12,
    opacity: 0.5,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
  },
  countContainer: {
    paddingHorizontal: 24,
    paddingVertical: spacing.sm,
  },
  countText: {
    fontSize: 12,
    color: colors.textMuted,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  sectionHeader: {
    backgroundColor: colors.background,
    paddingVertical: spacing.sm,
    paddingTop: spacing.md,
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  symbolCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBg,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  symbolIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  symbolIcon: {
    fontSize: 24,
  },
  symbolInfo: {
    flex: 1,
  },
  symbolName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  symbolPreview: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textMuted,
    marginTop: spacing.lg,
  },
});

