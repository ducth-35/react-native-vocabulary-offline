import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState, Topic, DailyProgress, UserSettings } from '../types';
import { vocabularyData } from '../data/vocabulary';

interface VocabularyStore extends AppState {
  actions: {
    // Topic actions
    getTopicById: (id: string) => Topic | undefined;
    
    // Daily progress actions
    addWordToDaily: (wordId: string) => void;
    addFlashcardReview: (wordId: string) => void;
    setQuizScore: (score: number) => void;
    
    // Settings actions
    updateSettings: (settings: Partial<UserSettings>) => void;
    
    // Progress tracking
    incrementStreak: () => void;
    resetStreak: () => void;
    getTodayProgress: () => DailyProgress | undefined;
    
    // Daily words
    getDailyWords: () => string[];
    getCompletedWords: () => string[];
    generateDailyWords: () => void;
  };
}

const today = new Date().toISOString().split('T')[0];

const initialState: AppState = {
  topics: vocabularyData,
  dailyProgress: [],
  userSettings: {
    dailyWordCount: 5,
    soundEnabled: true,
    language: 'vi',
    theme: 'light',
  },
  currentStreak: 0,
  totalWordsLearned: 0,
};

export const useVocabularyStore = create<VocabularyStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      actions: {
        getTopicById: (id: string) => {
          const state = get();

          // If no topics in state, use default data
          if (!state.topics || state.topics.length === 0) {
            return vocabularyData.find(topic => topic.id === id);
          }

          return state.topics.find(topic => topic.id === id);
        },

        addWordToDaily: (wordId: string) => {
          set((state) => {
            const todayProgress = state.dailyProgress.find(p => p.date === today);

            if (todayProgress) {
              if (!todayProgress.wordsCompleted.includes(wordId)) {
                todayProgress.wordsCompleted.push(wordId);
              }
            } else {
              state.dailyProgress.push({
                date: today,
                wordsLearned: [],
                wordsCompleted: [wordId],
                flashcardsReviewed: [],
              });
            }

            // Update total words learned
            const allWordsCompleted = new Set();
            state.dailyProgress.forEach(progress => {
              progress.wordsCompleted.forEach(word => allWordsCompleted.add(word));
            });
            state.totalWordsLearned = allWordsCompleted.size;

            return { ...state };
          });
        },

        addFlashcardReview: (wordId: string) => {
          set((state) => {
            const todayProgress = state.dailyProgress.find(p => p.date === today);
            
            if (todayProgress) {
              if (!todayProgress.flashcardsReviewed.includes(wordId)) {
                todayProgress.flashcardsReviewed.push(wordId);
              }
            } else {
              state.dailyProgress.push({
                date: today,
                wordsLearned: [],
                wordsCompleted: [],
                flashcardsReviewed: [wordId],
              });
            }
            
            return { ...state };
          });
        },

        setQuizScore: (score: number) => {
          set((state) => {
            const todayProgress = state.dailyProgress.find(p => p.date === today);
            
            if (todayProgress) {
              todayProgress.quizScore = score;
            } else {
              state.dailyProgress.push({
                date: today,
                wordsLearned: [],
                wordsCompleted: [],
                flashcardsReviewed: [],
                quizScore: score,
              });
            }
            
            return { ...state };
          });
        },

        updateSettings: (newSettings: Partial<UserSettings>) => {
          set((state) => ({
            ...state,
            userSettings: { ...state.userSettings, ...newSettings },
          }));
        },

        incrementStreak: () => {
          set((state) => ({
            ...state,
            currentStreak: state.currentStreak + 1,
          }));
        },

        resetStreak: () => {
          set((state) => ({
            ...state,
            currentStreak: 0,
          }));
        },

        getTodayProgress: () => {
          const state = get();
          return state.dailyProgress.find(p => p.date === today);
        },

        getDailyWords: () => {
          const state = get();
          const todayProgress = state.dailyProgress.find(p => p.date === today);
          return todayProgress?.wordsLearned || [];
        },

        getCompletedWords: () => {
          const state = get();
          const todayProgress = state.dailyProgress.find(p => p.date === today);
          return todayProgress?.wordsCompleted || [];
        },

        generateDailyWords: () => {
          set((state) => {
            const { dailyWordCount } = state.userSettings;

            // Get all words from all topics
            const allWords = state.topics.flatMap(topic => topic.words);

            if (allWords.length === 0) {
              return state;
            }

            // Check if today already has words assigned
            const existingProgress = state.dailyProgress.find(p => p.date === today);

            if (existingProgress && existingProgress.wordsLearned.length > 0) {
              return state; // Don't regenerate if already has words for today
            }

            // Randomly select daily words
            const shuffled = [...allWords].sort(() => 0.5 - Math.random());
            const selectedWords = shuffled.slice(0, dailyWordCount);

            if (existingProgress) {
              // Update existing progress
              existingProgress.wordsLearned = selectedWords.map(w => w.id);
            } else {
              // Create new progress for today
              state.dailyProgress.push({
                date: today,
                wordsLearned: selectedWords.map(w => w.id),
                wordsCompleted: [],
                flashcardsReviewed: [],
              });
            }

            return { ...state };
          });
        },
      },
    }),
    {
      name: 'vocabulary-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Add version to force reset if needed
      version: 1,
      // Ensure topics are always loaded
      onRehydrateStorage: () => (state) => {
        if (!state?.topics || state.topics.length === 0) {
          state.topics = vocabularyData;
        }
      },
    }
  )
);
