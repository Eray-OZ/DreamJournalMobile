import { router } from 'expo-router';
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, Dimensions, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PieChart } from 'react-native-gifted-charts';
import Svg, { Path } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Animated, { 
  FadeInDown, 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  withSequence 
} from 'react-native-reanimated';

import { colors, spacing, borderRadius } from '../../constants/theme';
import { useDreamStore } from '../../store/dreamStore';
import { CATEGORIES, CATEGORY_COLORS } from '../../constants/categories';
import { useTranslation } from '../../store/languageStore';
import { WavyUnderline } from '../../components/WavyUnderline';
import { ScaleButton } from '../../components/ScaleButton';

const { width } = Dimensions.get('window');

export default function StatsScreen() {
  const insets = useSafeAreaInsets();
  const { dreams } = useDreamStore();
  const { t } = useTranslation();

  // Pulse animation for Top Theme
  const pulse = useSharedValue(0.4);
  
  React.useEffect(() => {
    pulse.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1500 }),
        withTiming(0.4, { duration: 1500 })
      ),
      -1,
      true
    );
  }, []);

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: pulse.value,
  }));

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
      
      return {
        value: count,
        color: color,
        category: category, 
        gradientCenterColor: color,
        focused: true,
      };
    }).sort((a, b) => b.value - a.value); // Sort by biggest slice
  }, [dreams]);

  // 4. Most Active
  const topCategory = useMemo(() => {
      if (pieData.length === 0) return null;
      return pieData[0]?.category;
  }, [pieData]);


  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.content, { paddingTop: insets.top + spacing.xl, paddingBottom: 100 }]}>
      
      {/* HEADER */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xxl }}>
          <View>
            <Text style={styles.eyebrow}>REM</Text>
            <View>
              <Text style={styles.pageTitle}>{t('tab_stats')}</Text>
              <WavyUnderline />
            </View>
          </View>
          <ScaleButton 
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
          </ScaleButton>
      </View>

      {/* SUMMARY CARDS */}
      <View style={styles.summaryRow}>
          {/* Total Dreams */}
          <Animated.View 
            entering={FadeInDown.delay(100).duration(600)}
            style={styles.summaryCard}
          >
              <Text style={styles.summaryValue}>{totalDreams}</Text>
              <Text style={styles.summaryLabel}>{t('total_dreams')}</Text>
          </Animated.View>

          {/* Top Theme */}
          <Animated.View 
            entering={FadeInDown.delay(200).duration(600)}
            style={[
              styles.summaryCard, 
              { 
                backgroundColor: (pieData[0]?.color || colors.primary) + '20', 
                borderColor: (pieData[0]?.color || colors.primary) + '40' 
              }
            ]}
          >
              <Animated.View style={[StyleSheet.absoluteFill, { borderRadius: borderRadius.xl, borderWidth: 2, borderColor: pieData[0]?.color || colors.primaryLight }, pulseStyle]} />
              <Text style={styles.summaryValue}>{topCategory?.icon || '—'}</Text>
              <Text style={[styles.summaryLabel, { color: pieData[0]?.color || colors.primaryLight }]}>{t('top_theme')}</Text>
          </Animated.View>
      </View>

      {/* PIE CHART SECTION */}
      <Animated.View 
        entering={FadeInDown.delay(300).duration(600)}
        style={styles.chartContainer}
      >
          <View style={{ alignItems: 'center', paddingVertical: 20 }}>
            {pieData.length > 0 ? (
                <PieChart
                    data={pieData}
                    donut={false}
                    innerRadius={0}
                    showText={false}
                    radius={120}
                    centerLabelComponent={() => null}
                />
            ) : (
                <Text style={{ color: colors.textSecondary }}>No data yet</Text>
            )}
          </View>

          {/* LEGEND SECTION */}
          <View style={styles.legendContainer}>
            {pieData.map((item, index) => (
                <View key={index} style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: item.color }]} />
                    <Text style={styles.legendIcon}>{item.category?.icon}</Text>
                    <Text style={styles.legendText}>
                        {t(item.category?.labelKey || 'cat_other')}
                    </Text>
                    <Text style={styles.legendCount}>{item.value}</Text>
                </View>
            ))}
          </View>
      </Animated.View>

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
  eyebrow: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.primaryLight,
    letterSpacing: 2,
    marginBottom: 4,
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
