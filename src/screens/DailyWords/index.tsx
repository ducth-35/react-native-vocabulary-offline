import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Pressable,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useVocabularyStore } from '../../store/useVocabularyStore';
import { navigate } from '../../navigators/navigation-services';
import { APP_SCREEN } from '../../navigators/screen-type';
import { Word } from '../../types';
import { ttsService } from '../../utils';
import { colors, spacing, borderRadius, shadows } from '../../styles/theme';
import { useHideTabBarOnScroll } from '../../components';

export const DailyWordsScreen: React.FC = () => {
  const {
    topics,
    actions
  } = useVocabularyStore(state => state);

  const [dailyWords, setDailyWords] = useState<Word[]>([]);
  const [learnedWords, setLearnedWords] = useState<string[]>([]);
  const { onScroll } = useHideTabBarOnScroll({ scrollThreshold: 40 });

  const refreshData = () => {
    // Get today's words (assigned for today)
    if (actions && actions.getDailyWords) {
      const wordIds = actions.getDailyWords();

      // Get word objects
      const allWords = topics.flatMap(topic => topic.words);
      const words = allWords.filter(word => wordIds.includes(word.id));

      setDailyWords(words);

      // Get completed words - only those that belong to today's words
      if (actions && actions.getCompletedWords) {
        const completedIds = actions.getCompletedWords();
        // Filter to only include words that are in today's daily words
        const todayCompletedIds = completedIds.filter(id => wordIds.includes(id));
        setLearnedWords(todayCompletedIds);
      }
    }
  };

  useEffect(() => {
    // Generate daily words if not already generated
    if (actions && actions.generateDailyWords) {
      actions.generateDailyWords();
    }

    refreshData();
  }, [topics, actions]);

  const markWordAsLearned = (wordId: string) => {
    if (actions && actions.addWordToDaily) {
      actions.addWordToDaily(wordId);
      // Refresh data from store to ensure consistency
      refreshData();
    }
  };

  const playPronunciation = async (word: string) => {
    try {
      await ttsService.speakEnglish(word);
    } catch (error) {
      console.error('Failed to play pronunciation:', error);
    }
  };

  const startFlashcardWithDailyWords = () => {
    if (dailyWords.length > 0) {
      navigate(APP_SCREEN.FLASHCARD, { 
        words: dailyWords.map(w => w.id)
      });
    }
  };

  const renderWordItem = ({ item }: { item: Word }) => {
    const isLearned = learnedWords.includes(item.id);

    return (
      <View style={[styles.wordCard, isLearned && styles.learnedWordCard]}>
        <View style={styles.wordHeader}>
          <View style={styles.wordMainInfo}>
            <Text style={styles.englishWord}>{item.english}</Text>
            <Text style={styles.phonetic}>{item.phonetic}</Text>
          </View>
          <Pressable
            style={styles.playButton}
            onPress={() => playPronunciation(item.english)}
            hitSlop={10}
          >
            <LinearGradient
              colors={colors.primaryGradient}
              style={styles.playButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              pointerEvents="none"
            >
              <Text style={styles.playIcon}>🔊</Text>
            </LinearGradient>
          </Pressable>
        </View>

        <Text style={styles.vietnameseWord}>{item.vietnamese}</Text>

        {item.example && (
          <View style={styles.exampleContainer}>
            <Text style={styles.exampleLabel}>Ví dụ:</Text>
            <Text style={styles.exampleText}>{item.example}</Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.learnButtonContainer}
          onPress={() => markWordAsLearned(item.id)}
          disabled={isLearned}
        >
          <LinearGradient
            colors={isLearned ? ['#a0aec0', '#718096'] : colors.successGradient}
            style={styles.learnButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            pointerEvents="none"
          >
            <Text style={styles.learnButtonText}>
              {isLearned ? '✓ Đã học' : 'Đánh dấu đã học'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  };

  const completedCount = learnedWords.length;
  const totalCount = dailyWords.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Gradient */}
      <LinearGradient
        colors={colors.primaryGradient}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.title}>Từ Vựng Hôm Nay</Text>
        <Text style={styles.date}>
          {new Date().toLocaleDateString('vi-VN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </Text>
      </LinearGradient>

      {/* Progress Card */}
      <View style={styles.progressCard}>
        <LinearGradient
          colors={colors.successGradient}
          style={styles.progressContainer}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.progressInfo}>
            <Text style={styles.progressText}>
              Tiến độ hôm nay
            </Text>
            <Text style={styles.progressNumbers}>
              {completedCount}/{totalCount} từ
            </Text>
            <Text style={styles.progressPercentage}>
              {Math.round(progressPercentage)}% hoàn thành
            </Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${progressPercentage}%` }
                ]}
              />
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Action Buttons */}
      {dailyWords.length > 0 && (
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.actionButtonContainer}
            onPress={startFlashcardWithDailyWords}
          >
            <LinearGradient
              colors={colors.warningGradient}
              style={styles.actionButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.actionIcon}>🃏</Text>
              <Text style={styles.actionText}>Học với Flashcard</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}

      {/* Words List */}
      {dailyWords.length > 0 ? (
        <FlatList
          data={dailyWords}
          renderItem={renderWordItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📚</Text>
          <Text style={styles.emptyTitle}>Chưa có từ vựng hôm nay</Text>
          <Text style={styles.emptyText}>
            Hãy thiết lập số lượng từ học mỗi ngày trong cài đặt
          </Text>
        </View>
      )}

      {/* Congratulations */}
      {completedCount === totalCount && totalCount > 0 && (
        <View style={styles.congratsContainer}>
          <Text style={styles.congratsIcon}>🎉</Text>
          <Text style={styles.congratsText}>
            Chúc mừng! Bạn đã hoàn thành từ vựng hôm nay!
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.xxxl,
    paddingTop: spacing.huge,
    paddingBottom: spacing.xxxl,
    marginBottom: spacing.xl,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textWhite,
    marginBottom: spacing.sm,
  },
  date: {
    fontSize: 14,
    color: colors.textWhite,
    opacity: 0.9,
  },
  progressCard: {
    marginHorizontal: spacing.xl,
    marginBottom: spacing.xl,
  },
  progressContainer: {
    padding: spacing.xl,
    borderRadius: borderRadius.lg,
    ...shadows.medium,
  },
  progressInfo: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  progressText: {
    fontSize: 16,
    color: colors.textWhite,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  progressNumbers: {
    fontSize: 24,
    color: colors.textWhite,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  progressPercentage: {
    fontSize: 14,
    color: colors.textWhite,
    opacity: 0.9,
  },
  progressBarContainer: {
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.textWhite,
    borderRadius: 4,
  },
  actionContainer: {
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.xl,
  },
  actionButtonContainer: {
    width: '100%',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    ...shadows.medium,
  },
  actionIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  actionText: {
    fontSize: 16,
    color: colors.textWhite,
    fontWeight: '600',
  },
  listContainer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: 120, // Extra space for tab bar
  },
  wordCard: {
    backgroundColor: colors.backgroundCard,
    padding: spacing.xl,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.lg,
    ...shadows.card,
  },
  learnedWordCard: {
    backgroundColor: colors.successLight,
    borderLeftWidth: 4,
    borderLeftColor: colors.success,
  },
  wordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  wordMainInfo: {
    flex: 1,
  },
  englishWord: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  phonetic: {
    fontSize: 14,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  playButton: {
    borderRadius: borderRadius.round,
  },
  playButtonGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    fontSize: 18,
  },
  vietnameseWord: {
    fontSize: 20,
    color: colors.secondary,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  exampleContainer: {
    backgroundColor: colors.primaryLight,
    padding: spacing.md,
    borderRadius: borderRadius.sm,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
    marginBottom: spacing.lg,
  },
  exampleLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  exampleText: {
    fontSize: 14,
    color: colors.textPrimary,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  learnButtonContainer: {
    borderRadius: borderRadius.sm,
  },
  learnButton: {
    padding: spacing.md,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
  },
  learnButtonText: {
    color: colors.textWhite,
    fontWeight: '600',
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    lineHeight: 24,
  },
  congratsContainer: {
    backgroundColor: '#D5EDDA',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#27AE60',
  },
  congratsIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  congratsText: {
    fontSize: 16,
    color: '#27AE60',
    fontWeight: '600',
    textAlign: 'center',
  },
});
