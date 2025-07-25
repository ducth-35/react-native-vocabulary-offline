import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Animated,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useVocabularyStore } from '../../store/useVocabularyStore';
import { APP_SCREEN, RootStackParamList } from '../../navigators/screen-type';
import { Word } from '../../types';
import { ttsService } from '../../utils';
import { colors, spacing, borderRadius, shadows } from '../../styles/theme';

type FlashcardRouteProp = RouteProp<RootStackParamList, APP_SCREEN.FLASHCARD>;

export const FlashcardScreen: React.FC = () => {
  const route = useRoute<FlashcardRouteProp>();
  const { topicId, words: wordIds } = route.params || {};

  const { topics, actions } = useVocabularyStore(state => state);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [words, setWords] = useState<Word[]>([]);

  const flipAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let wordsToUse: Word[] = [];

    if (topicId && actions && actions.getTopicById) {
      const topic = actions.getTopicById(topicId);
      wordsToUse = topic?.words || [];
    } else if (wordIds) {
      // Get words from all topics by IDs
      const allWords = topics.flatMap(topic => topic.words);
      wordsToUse = allWords.filter(word => wordIds.includes(word.id));
    } else {
      // Use all words from all topics
      wordsToUse = topics.flatMap(topic => topic.words);
    }

    // Shuffle words
    const shuffledWords = [...wordsToUse].sort(() => Math.random() - 0.5);
    setWords(shuffledWords);
  }, [topicId, wordIds, topics, actions]);

  const currentWord = words[currentIndex];

  const flipCard = () => {
    Animated.timing(flipAnimation, {
      toValue: isFlipped ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setIsFlipped(!isFlipped);

    if (!isFlipped && currentWord && actions && actions.addFlashcardReview) {
      // Mark as reviewed when showing the answer
      actions.addFlashcardReview(currentWord.id);
    }
  };

  const nextCard = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
      flipAnimation.setValue(0);
    } else {
      Alert.alert(
        'Hoàn thành!',
        'Bạn đã xem hết tất cả flashcard. Chúc mừng!',
        [{ text: 'OK' }]
      );
    }
  };

  const previousCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
      flipAnimation.setValue(0);
    }
  };

  const playPronunciation = async (event?: any) => {
    // Prevent card flip when sound button is pressed
    if (event) {
      event.stopPropagation();
    }

    if (currentWord) {
      try {
        await ttsService.speakEnglish(currentWord.english);
      } catch (error) {
        console.error('Failed to play pronunciation:', error);
      }
    }
  };

  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });  

  if (words.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Không có từ vựng để hiển thị</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Gradient */}
      <LinearGradient
        colors={colors.primaryGradient}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.title}>Flashcard</Text>
        <Text style={styles.progress}>
          {currentIndex + 1} / {words.length}
        </Text>
      </LinearGradient>

      {/* Card Container */}
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          {/* Front Side */}
          <Animated.View
            style={[
              styles.cardSide,
              { transform: [{ rotateY: frontInterpolate }] },
            ]}
          >
            <View
              style={styles.cardTouchable}
            >
              <View
                // colors={colors.primaryGradient}
                style={styles.cardContent}
                // start={{ x: 0, y: 0 }}
                // end={{ x: 1, y: 1 }}
                // pointerEvents='none'
              >
                <Text style={styles.englishWord}>{currentWord?.english}</Text>
                <Text style={styles.phonetic}>{currentWord?.phonetic}</Text>
                <TouchableOpacity
                  style={styles.soundButton}
                  onPress={playPronunciation}
                >
                  <View
                    // colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)']}
                    style={styles.soundButtonGradient}
                    // start={{ x: 0, y: 0 }}
                    // end={{ x: 1, y: 1 }}
                    // pointerEvents="none"
                  >
                    <Text style={styles.soundIcon}>🔊</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={flipCard} style={{
                  position: 'absolute',
                  bottom: spacing.xl,
                
                }}>
                  <Text style={styles.tapHint}>Chạm để xem nghĩa</Text>
                </TouchableOpacity>

              </View>
            </View>
          </Animated.View>

          {/* Back Side */}
          <Animated.View
            style={[
              styles.cardSide,
              styles.cardBack,
              { transform: [{ rotateY: backInterpolate }] },
            ]}
          >
            <View
              style={styles.cardTouchable}

            >
              <View
                // colors={colors.secondaryGradient}
                style={styles.cardContent}
                // start={{ x: 0, y: 0 }}
                // end={{ x: 1, y: 1 }}
              >
                <Text style={styles.englishWordSmall}>{currentWord?.english}</Text>
                <Text style={styles.vietnameseWord}>{currentWord?.vietnamese}</Text>
                {currentWord?.example && (
                  <View style={styles.exampleContainer}>
                    <Text style={styles.exampleLabel}>Ví dụ:</Text>
                    <Text style={styles.exampleText}>{currentWord.example}</Text>
                  </View>
                )}
                <TouchableOpacity onPress={flipCard} style={{
                  position: 'absolute',
                  bottom: spacing.xl
                }}>
                  <Text style={styles.tapHint}>Chạm để quay lại</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </View>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={styles.navButtonContainer}
          onPress={previousCard}
          disabled={currentIndex === 0}
        >
          <LinearGradient
            colors={currentIndex === 0 ? ['#a0aec0', '#718096'] : colors.successGradient}
            style={styles.navButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.navButtonText}>Trước</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButtonContainer}
          onPress={nextCard}
          disabled={currentIndex === words.length - 1}
        >
          <LinearGradient
            colors={currentIndex === words.length - 1 ? ['#a0aec0', '#718096'] : colors.warningGradient}
            style={styles.navButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.navButtonText}>Tiếp</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
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
  progress: {
    fontSize: 16,
    color: colors.textWhite,
    opacity: 0.9,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  card: {
    width: '100%',
    height: 400,
    position: 'relative',
  },
  cardSide: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
  },
  cardBack: {
    transform: [{ rotateY: '180deg' }],
  },
  cardTouchable: {
    flex: 1,
    borderRadius: borderRadius.xl,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xxxl,
    borderRadius: borderRadius.xl,
    ...shadows.large,
  },
  englishWord: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.textWhite,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  englishWordSmall: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textWhite,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  phonetic: {
    fontSize: 18,
    color: colors.textWhite,
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: spacing.xl,
    fontStyle: 'italic',
  },
  vietnameseWord: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.textWhite,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  soundButton: {
    marginBottom: spacing.xl,
    borderRadius: borderRadius.round,
  },
  soundButtonGradient: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  soundIcon: {
    fontSize: 24,
  },
  exampleContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    marginBottom: spacing.xl,
    width: '100%',
  },
  exampleLabel: {
    fontSize: 12,
    color: colors.textWhite,
    opacity: 0.8,
    marginBottom: spacing.xs,
    fontWeight: '600',
  },
  exampleText: {
    fontSize: 14,
    color: colors.textWhite,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 20,
  },
  tapHint: {
    fontSize: 14,
    color: colors.textWhite,
    opacity: 0.7,
    textAlign: 'center',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
    gap: spacing.lg,
  },
  navButtonContainer: {
    flex: 1,
    borderRadius: borderRadius.xl,
  },
  navButton: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    ...shadows.medium,
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textWhite,
  },
  errorText: {
    fontSize: 18,
    color: colors.secondary,
    textAlign: 'center',
    marginTop: 50,
  },
});
