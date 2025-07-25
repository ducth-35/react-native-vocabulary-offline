import {NativeStackScreenProps as RNStackScreenProps} from '@react-navigation/native-stack';

export enum APP_SCREEN {
  HOME = 'HOME_SCREEN',
  PROFILE = 'PROFILE_SCREEN',
  TOPICS = 'TOPICS_SCREEN',
  TOPIC_DETAIL = 'TOPIC_DETAIL_SCREEN',
  FLASHCARD = 'FLASHCARD_SCREEN',
  QUIZ = 'QUIZ_SCREEN',
  DAILY_WORDS = 'DAILY_WORDS_SCREEN',
  SETTINGS = 'SETTINGS_SCREEN',
}

export type RootStackParamList = {
  [APP_SCREEN.HOME]: undefined;
  [APP_SCREEN.PROFILE]: undefined;
  [APP_SCREEN.TOPICS]: undefined;
  [APP_SCREEN.TOPIC_DETAIL]: { topicId: string };
  [APP_SCREEN.FLASHCARD]: { topicId?: string; words?: string[] };
  [APP_SCREEN.QUIZ]: { topicId?: string };
  [APP_SCREEN.DAILY_WORDS]: undefined;
  [APP_SCREEN.SETTINGS]: undefined;
};

export type StackScreenProps<T extends keyof RootStackParamList> =
  RNStackScreenProps<RootStackParamList, T>;
