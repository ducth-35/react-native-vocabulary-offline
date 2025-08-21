import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { APP_SCREEN, RootStackParamList } from './screen-type';
import {
  TopicDetailScreen,
  FlashcardScreen,
  QuizScreen,
  SettingsScreen
} from '../screens';
import { navigationRef } from './navigation-services';
import { TabNavigator } from './TabNavigator';

export const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigations: React.FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="MAIN_TAB"
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
          name="MAIN_TAB"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={APP_SCREEN.TOPIC_DETAIL}
          component={TopicDetailScreen}
          options={{
            title: 'Chi Tiết Chủ Đề',
            headerShown: true
          }}
        />
        <Stack.Screen
          name={APP_SCREEN.FLASHCARD}
          component={FlashcardScreen}
          options={{
            title: 'Flashcard',
            headerShown: true
          }}
        />
        <Stack.Screen
          name={APP_SCREEN.QUIZ}
          component={QuizScreen}
          options={{
            title: 'Quiz',
            headerShown: true
          }}
        />
        <Stack.Screen
          name={APP_SCREEN.SETTINGS}
          component={SettingsScreen}
          options={{
            title: 'Cài Đặt',
            headerShown: true
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
