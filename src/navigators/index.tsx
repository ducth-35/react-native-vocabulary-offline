import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { APP_SCREEN, RootStackParamList } from './screen-type';
import {
  HomeScreen,
  ProfileScreen,
  TopicsScreen,
  TopicDetailScreen,
  FlashcardScreen,
  QuizScreen,
  DailyWordsScreen,
  SettingsScreen
} from '../screens';
import { navigationRef } from './navigation-services';

export const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigations: React.FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={APP_SCREEN.HOME}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#3498DB',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
          headerShown: false
        }}
      >
        <Stack.Screen
          name={APP_SCREEN.HOME}
          component={HomeScreen}
          options={{ title: 'Từ Vựng Mỗi Ngày' }}
        />
        <Stack.Screen
          name={APP_SCREEN.PROFILE}
          component={ProfileScreen}
          options={{ title: 'Hồ Sơ' }}
        />
        <Stack.Screen
          name={APP_SCREEN.TOPICS}
          component={TopicsScreen}
          options={{ title: 'Chủ Đề' }}
        />
        <Stack.Screen
          name={APP_SCREEN.TOPIC_DETAIL}
          component={TopicDetailScreen}
          options={{ title: 'Chi Tiết Chủ Đề' }}
        />
        <Stack.Screen
          name={APP_SCREEN.FLASHCARD}
          component={FlashcardScreen}
          options={{ title: 'Flashcard' }}
        />
        <Stack.Screen
          name={APP_SCREEN.QUIZ}
          component={QuizScreen}
          options={{ title: 'Quiz' }}
        />
        <Stack.Screen
          name={APP_SCREEN.DAILY_WORDS}
          component={DailyWordsScreen}
          options={{ title: 'Từ Vựng Hôm Nay' }}
        />
        <Stack.Screen
          name={APP_SCREEN.SETTINGS}
          component={SettingsScreen}
          options={{ title: 'Cài Đặt' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
