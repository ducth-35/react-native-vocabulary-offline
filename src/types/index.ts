// Vocabulary App Types

export interface Word {
  id: string;
  english: string;
  vietnamese: string;
  phonetic: string;
  example?: string;
  topicId: string;
}

export interface Topic {
  id: string;
  name: string;
  nameVietnamese: string;
  description: string;
  icon: string;
  color: string;
  words: Word[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  wordId: string;
}

export interface Quiz {
  id: string;
  topicId: string;
  questions: QuizQuestion[];
}

export interface DailyProgress {
  date: string;
  wordsLearned: string[]; // Words assigned for today
  wordsCompleted: string[]; // Words actually completed/learned
  quizScore?: number;
  flashcardsReviewed: string[];
}

export interface UserSettings {
  dailyWordCount: number;
  soundEnabled: boolean;
  language: 'vi' | 'en';
  theme: 'light' | 'dark';
}

export interface AppState {
  topics: Topic[];
  dailyProgress: DailyProgress[];
  userSettings: UserSettings;
  currentStreak: number;
  totalWordsLearned: number;
}
