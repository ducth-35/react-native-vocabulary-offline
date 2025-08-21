import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { TAB_SCREEN, TabParamList } from './screen-type';
import {
  HomeScreen,
  TopicsScreen,
  DailyWordsScreen,
  ProfileScreen,
} from '../screens';
import { BottomTabWrapper, AnimatedTabBar } from '../components';

const Tab = createBottomTabNavigator<TabParamList>();

export const TabNavigator: React.FC = () => {
  return (
    <BottomTabWrapper
      animationConfig={{
        duration: 250,
        hideValue: 100,
        showValue: 0,
      }}
    >
      <Tab.Navigator
        tabBar={(props) => <AnimatedTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen
          name={TAB_SCREEN.HOME_TAB}
          component={HomeScreen}
          options={{
            tabBarLabel: 'Trang Chủ',
            tabBarIcon: ({ color, size }) => (
              <Text style={{ color, fontSize: size }}>🏠</Text>
            ),
          }}
        />
        <Tab.Screen
          name={TAB_SCREEN.TOPICS_TAB}
          component={TopicsScreen}
          options={{
            tabBarLabel: 'Chủ Đề',
            tabBarIcon: ({ color, size }) => (
              <Text style={{ color, fontSize: size }}>📚</Text>
            ),
          }}
        />
        <Tab.Screen
          name={TAB_SCREEN.DAILY_WORDS_TAB}
          component={DailyWordsScreen}
          options={{
            tabBarLabel: 'Hôm Nay',
            tabBarIcon: ({ color, size }) => (
              <Text style={{ color, fontSize: size }}>📅</Text>
            ),
          }}
        />
        <Tab.Screen
          name={TAB_SCREEN.PROFILE_TAB}
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Hồ Sơ',
            tabBarIcon: ({ color, size }) => (
              <Text style={{ color, fontSize: size }}>👤</Text>
            ),
          }}
        />
      </Tab.Navigator>
    </BottomTabWrapper>
  );
};
