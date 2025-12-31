import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, Dimensions, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PieChart } from 'react-native-gifted-charts';
import Svg, { Path } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { colors, spacing, borderRadius } from '../../constants/theme';
import { useDreamStore } from '../../store/dreamStore';
import { CATEGORIES, CATEGORY_COLORS } from '../../constants/categories';
import { useTranslation } from '../../store/languageStore';

const { width } = Dimensions.get('window');

export default function StatsScreen() {
  const insets = useSafeAreaInsets();
  const { dreams } = useDreamStore();
  const { t } = useTranslation();

  // --- Data Processing ---

  // 1. Total Dreams
  const totalDreams = dreams.length;

  // 2. Category Distribution for Pie Chart
  const pieData = useMemo(() => {
    const counts = {};
    dreams.forEach(d => {
      counts[d.category] = (counts[d.category] || 0) + 1;
    });

    return Object.keys(counts).map(catId => {
      const count = counts[catId];
      const category = CATEGORIES.find(c => c.id === catId);
      const color = CATEGORY_COLORS[catId] || CATEGORY_COLORS.other;
      
        value: count,
        color: color, // Use vivid category color
        text: '', // Removed emoji from chart
        category: category, // Store for Legend
        // Gradient props if supported or just solid
        gradientCenterColor: color,
        focused: true,
      };
    }).sort((a, b) => b.value - a.value); // Sort by biggest slice
  }, [dreams]);



  // 4. Most Active
  const topCategory = useMemo(() => {
      if (pieData.length === 0) return null;
      const topItem = pieData[0]; // Already sorted
      const cat = CATEGORIES.find(c => CATEGORY_COLORS[c.id] === topItem.color || (CATEGORY_COLORS[c.id] && c.icon === topItem.text));
      // Reverse lookup is tricky, better to store ID in pieData? 
      // Let's re-find by matching icon since we stored icon in text
      return CATEGORIES.find(c => c.icon === topItem.text);
  }, [pieData]);


  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.content, { paddingTop: insets.top + spacing.xl, paddingBottom: 100 }]}>
      
      {/* HEADER */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xxl }}>
          <View>
            <Text style={styles.pageTitle}>Stats</Text>
            <Svg height="8" width="100%" viewBox="0 0 100 10" preserveAspectRatio="none" style={styles.titleUnderline}>
                <Path d="M0 5 Q50 10 100 5" stroke={colors.primaryLight} strokeWidth="3" fill="none" />
            </Svg>
          </View>
          <TouchableOpacity 
            onPress={() => router.push('/add')}
          >
             <LinearGradient
                colors={[colors.secondary, colors.primary]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                style={{ width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}
            >
              <FontAwesome name="plus" size={20} color={colors.text} />
            </LinearGradient>
          </TouchableOpacity>
      </View>

      {/* SUMMARY CARDS */}
      <View style={styles.summaryRow}>
          {/* Total Dreams */}
          <View style={styles.summaryCard}>
              <Text style={styles.summaryValue}>{totalDreams}</Text>
              <Text style={styles.summaryLabel}>Total Dreams</Text>
          </View>

          {/* Top Theme */}
          <View style={[styles.summaryCard, { backgroundColor: colors.primary + '20', borderColor: colors.primary + '40' }]}>
              <Text style={styles.summaryValue}>{topCategory?.icon || '—'}</Text>
              <Text style={[styles.summaryLabel, { color: colors.primaryLight }]}>Top Theme</Text>
          </View>
      </View>

      {/* PIE CHART SECTION */}
      <View style={styles.chartContainer}>
          <Text style={styles.sectionTitle}>Distribution</Text>
          <View style={{ alignItems: 'center', paddingVertical: 20 }}>
            {pieData.length > 0 ? (
                <PieChart
                    data={pieData}
                    donut
                    showText
                    textColor="white"
                    radius={120}
                    textSize={20}
                    innerRadius={70}
                    innerCircleColor={colors.background}
                    centerLabelComponent={() => {
                        return (
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 28, color: 'white', fontWeight: 'bold' }}>{totalDreams}</Text>
                                <Text style={{ fontSize: 12, color: colors.textSecondary }}>Dreams</Text>
                            </View>
                        );
                    }}
                />
            ) : (
                <Text style={{ color: colors.textSecondary }}>No data yet</Text>
            )}
          </View>
      </View>

      {/* BAR CHART SECTION */}


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.lg,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primaryLight,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    marginBottom: 4,
  },
  titleUnderline: {
      position: 'absolute',
      bottom: -8,
      left: 0,
  },
  summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: spacing.xxl,
  },
  summaryCard: {
      flex: 1,
      backgroundColor: colors.cardBg,
      borderRadius: borderRadius.xl,
      padding: spacing.lg,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 4,
      borderWidth: 1,
      borderColor: colors.border,
  },
  summaryValue: {
      fontSize: 36,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 4,
  },
  summaryLabel: {
      fontSize: 14,
      color: colors.textSecondary,
      fontWeight: '600',
  },
  chartContainer: {
      backgroundColor: colors.cardBg,
      borderRadius: borderRadius.xl,
      padding: spacing.lg,
      marginBottom: spacing.xxl,
      borderWidth: 1,
      borderColor: colors.border,
  },
  sectionTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 12,
  },
  legendContainer: {
      marginTop: 8,
      gap: 12,
  },
  legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
  },
  legendDot: {
      width: 12,
      height: 12,
      borderRadius: 6,
      marginRight: 12,
  },
  legendIcon: {
      fontSize: 16,
      marginRight: 8,
  },
  legendText: {
      fontSize: 16,
      color: colors.text,
      fontWeight: '600',
      flex: 1,
  },
  legendCount: {
      fontSize: 16,
      color: colors.textSecondary,
      fontWeight: '700',
  },
});
