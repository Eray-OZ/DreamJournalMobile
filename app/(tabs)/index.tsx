import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { CATEGORIES, getCategoryIcon } from '../../constants/categories';
import { useAuthStore } from '../../store/authStore';
import { useDreamStore } from '../../store/dreamStore';
import { useTranslation } from '../../store/languageStore';

export default function DreamListScreen() {
  const { user } = useAuthStore();
  const {
    isLoading,
    fetchDreams,
    selectedCategory,
    setCategory,
    searchQuery,
    setSearchQuery,
    getFilteredDreams,
  } = useDreamStore();
  const { t, language } = useTranslation();

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (user?.uid) {
      fetchDreams(user.uid);
    }
  }, [user?.uid]);

  const onRefresh = async () => {
    setRefreshing(true);
    if (user?.uid) {
      await fetchDreams(user.uid);
    }
    setRefreshing(false);
  };

  const filteredDreams = getFilteredDreams();

  const renderDreamCard = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.dreamCard}
      onPress={() => router.push(`/dream/${item.id}`)}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.categoryIcon}>{getCategoryIcon(item.category)}</Text>
        <Text style={styles.categoryText}>
          {t(CATEGORIES.find(c => c.id === item.category)?.labelKey || 'cat_other')}
        </Text>
      </View>
      <Text style={styles.dreamTitle} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={styles.dreamContent} numberOfLines={2}>
        {item.content}
      </Text>
      <Text style={styles.dreamDate}>
        {item.createdAt?.toDate?.()?.toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US') || t('no_date')}
      </Text>
    </TouchableOpacity>
  );

  const renderCategoryFilter = () => (
    <View style={styles.categoryContainer}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryChip,
              (item.id === 'all' ? !selectedCategory : selectedCategory === item.id) &&
                styles.categoryChipActive,
            ]}
            onPress={() => setCategory(item.id === 'all' ? null : item.id)}
          >
            <Text style={styles.categoryChipIcon}>{item.icon}</Text>
            <Text
              style={[
                styles.categoryChipText,
                (item.id === 'all' ? !selectedCategory : selectedCategory === item.id) &&
                  styles.categoryChipTextActive,
              ]}
            >
              {t(item.labelKey)}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.categoryList}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={t('search_placeholder')}
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {renderCategoryFilter()}

      {isLoading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6c5ce7" />
        </View>
      ) : filteredDreams.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🌙</Text>
          <Text style={styles.emptyText}>{t('no_dreams')}</Text>
          <Text style={styles.emptySubtext}>{t('no_dreams_hint')}</Text>
        </View>
      ) : (
        <FlatList
          data={filteredDreams}
          keyExtractor={(item) => item.id}
          renderItem={renderDreamCard}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#6c5ce7"
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a1a',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchInput: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#2a2a4e',
  },
  categoryContainer: {
    marginTop: 16,
  },
  categoryList: {
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#2a2a4e',
  },
  categoryChipActive: {
    backgroundColor: '#6c5ce7',
    borderColor: '#6c5ce7',
  },
  categoryChipIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  categoryChipText: {
    color: '#888',
    fontSize: 14,
    fontWeight: '500',
  },
  categoryChipTextActive: {
    color: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
  listContainer: {
    padding: 16,
    gap: 12,
  },
  dreamCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2a2a4e',
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  categoryText: {
    fontSize: 12,
    color: '#6c5ce7',
    fontWeight: '500',
  },
  dreamTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 6,
  },
  dreamContent: {
    fontSize: 14,
    color: '#aaa',
    lineHeight: 20,
    marginBottom: 8,
  },
  dreamDate: {
    fontSize: 12,
    color: '#666',
  },
});
