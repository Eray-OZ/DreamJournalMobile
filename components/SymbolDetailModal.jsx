import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { FontAwesome } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../constants/theme';
import { useTranslation } from '../store/languageStore';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function SymbolDetailModal({ visible, symbol, onClose, language }) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('freudian');

  if (!symbol) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />
        
        <View style={styles.modalContainer}>
          {/* Handle bar */}
          <View style={styles.handleBar} />

          {/* Close button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <FontAwesome name="times" size={20} color={colors.textMuted} />
          </TouchableOpacity>

          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Symbol Header */}
            <View style={styles.header}>
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>{symbol.icon}</Text>
              </View>
              <Text style={styles.symbolName}>{symbol.name[language]}</Text>
            </View>

            {/* Tab Selector */}
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'freudian' && styles.activeTab]}
                onPress={() => setActiveTab('freudian')}
              >
                <Text style={[styles.tabText, activeTab === 'freudian' && styles.activeTabText]}>
                  {t('freudian_view') || 'Freudian'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'jungian' && styles.activeTab]}
                onPress={() => setActiveTab('jungian')}
              >
                <Text style={[styles.tabText, activeTab === 'jungian' && styles.activeTabText]}>
                  {t('jungian_view') || 'Jungian'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Interpretation Content */}
            <View style={styles.contentCard}>
              <View style={styles.contentHeader}>
                <FontAwesome 
                  name={activeTab === 'freudian' ? 'user-md' : 'moon-o'} 
                  size={16} 
                  color={colors.primary} 
                />
                <Text style={styles.contentTitle}>
                  {activeTab === 'freudian' 
                    ? (t('freudian_interpretation') || 'Freudian Interpretation')
                    : (t('jungian_interpretation') || 'Jungian Interpretation')
                  }
                </Text>
              </View>
              <Text style={styles.contentText}>
                {activeTab === 'freudian' 
                  ? symbol.freudian[language]
                  : symbol.jungian[language]
                }
              </Text>
            </View>

            {/* Variations */}
            {symbol.variations && symbol.variations.length > 0 && (
              <View style={styles.variationsContainer}>
                <Text style={styles.variationsTitle}>
                  {t('variations') || 'Related Symbols'}
                </Text>
                <View style={styles.variationsList}>
                  {symbol.variations.map((variation, index) => (
                    <View key={index} style={styles.variationChip}>
                      <Text style={styles.variationText}>{variation}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Source Citation */}
            <View style={styles.sourceContainer}>
              <FontAwesome name="book" size={12} color={colors.textMuted} />
              <Text style={styles.sourceText}>
                {t('source_freud') || 'Source: The Interpretation of Dreams (1899)'}
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: colors.background,
    borderTopLeftRadius: borderRadius.xxxl,
    borderTopRightRadius: borderRadius.xxxl,
    maxHeight: SCREEN_HEIGHT * 0.85,
    paddingTop: spacing.md,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderBottomWidth: 0,
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: colors.textMuted,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: spacing.lg,
  },
  closeButton: {
    position: 'absolute',
    top: spacing.lg,
    right: spacing.xl,
    zIndex: 10,
    padding: spacing.sm,
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  icon: {
    fontSize: 40,
  },
  symbolName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.inputBg,
    borderRadius: borderRadius.lg,
    padding: spacing.xs,
    marginBottom: spacing.xl,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderRadius: borderRadius.md,
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textMuted,
  },
  activeTabText: {
    color: colors.text,
  },
  contentCard: {
    backgroundColor: colors.cardBg,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  contentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  contentTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  contentText: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  variationsContainer: {
    marginBottom: spacing.xl,
  },
  variationsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
  },
  variationsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  variationChip: {
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
  },
  variationText: {
    fontSize: 12,
    color: colors.primaryLight,
  },
  sourceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.glassBorder,
  },
  sourceText: {
    fontSize: 12,
    color: colors.textMuted,
    fontStyle: 'italic',
  },
});
