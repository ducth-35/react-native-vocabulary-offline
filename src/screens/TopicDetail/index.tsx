import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Pressable,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useVocabularyStore } from '../../store/useVocabularyStore';
import { navigate } from '../../navigators/navigation-services';
import { APP_SCREEN, RootStackParamList } from '../../navigators/screen-type';
import { Word } from '../../types';
import { ttsService } from '../../utils';
import { vocabularyData } from '../../data/vocabulary';
import { colors, spacing, borderRadius, shadows } from '../../styles/theme';

type TopicDetailRouteProp = RouteProp<RootStackParamList, APP_SCREEN.TOPIC_DETAIL>;

export const TopicDetailScreen: React.FC = () => {
  const route = useRoute<TopicDetailRouteProp>();
  const { topicId } = route.params;

  let topic = useVocabularyStore(state =>
    state.actions && state.actions.getTopicById ? state.actions.getTopicById(topicId) : undefined
  );

  // Fallback: if store fails, get directly from data
  if (!topic) {
    topic = vocabularyData.find(t => t.id === topicId);
  }

  if (!topic) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Không tìm thấy chủ đề</Text>
      </SafeAreaView>
    );
  }

  const getTopicGradient = (topicId: string) => {
    switch (topicId) {
      case 'fruits': return colors.topicColors.fruits.gradient;
      case 'animals': return colors.topicColors.animals.gradient;
      case 'colors': return colors.topicColors.colors.gradient;
      case 'family': return colors.topicColors.family.gradient;
      case 'jobs': return colors.topicColors.jobs.gradient;
      default: return colors.primaryGradient;
    }
  };

  const playPronunciation = async (word: string) => {
    try {
      await ttsService.speakEnglish(word);
    } catch (error) {
      console.error('Failed to play pronunciation:', error);
    }
  };

  const renderWordItem = ({ item }: { item: Word }) => (
    <View style={styles.wordCard}>
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
    </View>
  );

  const startFlashcard = () => {
    if (topic) {
      navigate(APP_SCREEN.FLASHCARD, {
        topicId: topic.id,
        words: topic.words.map(w => w.id)
      });
    }
  };

  const startQuiz = () => {
    if (topic) {
      navigate(APP_SCREEN.QUIZ, { topicId: topic.id });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Gradient */}
      <LinearGradient
        colors={getTopicGradient(topic.id)}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.topicIconContainer}>
          <Text style={styles.topicIcon}>{topic.icon}</Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.topicName}>{topic.nameVietnamese}</Text>
          <Text style={styles.topicNameEn}>{topic.name}</Text>
          <View style={styles.wordCountContainer}>
            <Text style={styles.wordCount}>{topic.words.length} từ vựng</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.actionButtonContainer} onPress={startFlashcard}>
          <LinearGradient
            colors={colors.successGradient}
            style={styles.actionButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.actionIcon}>🃏</Text>
            <Text style={styles.actionText}>Flashcard</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButtonContainer} onPress={startQuiz}>
          <LinearGradient
            colors={colors.warningGradient}
            style={styles.actionButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.actionIcon}>🧠</Text>
            <Text style={styles.actionText}>Quiz</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Words List */}
      <FlatList
        data={topic.words}
        renderItem={renderWordItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.xxxl,
    paddingTop: spacing.huge,
    paddingBottom: spacing.xxxl,
    marginBottom: spacing.xl,
  },
  topicIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.lg,
  },
  topicIcon: {
    fontSize: 40,
  },
  headerInfo: {
    flex: 1,
  },
  topicName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.textWhite,
    marginBottom: spacing.xs,
  },
  topicNameEn: {
    fontSize: 18,
    color: colors.textWhite,
    opacity: 0.9,
    marginBottom: spacing.sm,
  },
  wordCountContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    alignSelf: 'flex-start',
  },
  wordCount: {
    fontSize: 14,
    color: colors.textWhite,
    fontWeight: '600',
  },
  actionContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.xl,
    gap: spacing.md,
  },
  actionButtonContainer: {
    flex: 1,
  },
  actionButton: {
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    ...shadows.medium,
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textWhite,
  },
  listContainer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
  wordCard: {
    backgroundColor: colors.backgroundCard,
    padding: spacing.xl,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.lg,
    ...shadows.card,
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
  errorText: {
    fontSize: 18,
    color: colors.secondary,
    textAlign: 'center',
    marginTop: 50,
  },
});
