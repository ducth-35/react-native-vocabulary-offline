import {NativeStackScreenProps as RNStackScreenProps} from '@react-navigation/native-stack';
import {BottomTabScreenProps as RNTabScreenProps} from '@react-navigation/bottom-tabs';

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

export enum TAB_SCREEN {
  HOME_TAB = 'HOME_TAB',
  TOPICS_TAB = 'TOPICS_TAB',
  DAILY_WORDS_TAB = 'DAILY_WORDS_TAB',
  PROFILE_TAB = 'PROFILE_TAB',
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
  MAIN_TAB: undefined;
};

export type TabParamList = {
  [TAB_SCREEN.HOME_TAB]: undefined;
  [TAB_SCREEN.TOPICS_TAB]: undefined;
  [TAB_SCREEN.DAILY_WORDS_TAB]: undefined;
  [TAB_SCREEN.PROFILE_TAB]: undefined;
};

export type StackScreenProps<T extends keyof RootStackParamList> =
  RNStackScreenProps<RootStackParamList, T>;

export type TabScreenProps<T extends keyof TabParamList> =
  RNTabScreenProps<TabParamList, T>;
