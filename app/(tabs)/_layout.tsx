import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../constants/theme';
import { useTranslation } from '../../store/languageStore';

export default function TabLayout() {
  const { t } = useTranslation();
  
  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textMuted,
          tabBarStyle: {
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            borderTopColor: colors.border,
            borderTopWidth: 1,
            height: 70,
            paddingBottom: 10,
            paddingTop: 10,
          },
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontWeight: '600',
          },
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: t('tab_dreams'),
            tabBarIcon: ({ color, focused }) => (
              <View style={focused ? styles.activeIconContainer : undefined}>
                <FontAwesome name="moon-o" size={24} color={color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="add"
          options={{
            title: t('tab_add'),
            tabBarIcon: ({ color }) => (
              <View style={styles.addButton}>
                <FontAwesome name="plus" size={24} color="#fff" />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: t('tab_profile'),
            tabBarIcon: ({ color, focused }) => (
              <View style={focused ? styles.activeIconContainer : undefined}>
                <FontAwesome name="user" size={24} color={color} />
              </View>
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  activeIconContainer: {
    // Active indicator styling
  },
  addButton: {
    width: 56,
    height: 56,
    backgroundColor: colors.primaryDark,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -30,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
});
