import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useVocabularyStore } from '../../store/useVocabularyStore';
import { navigate } from '../../navigators/navigation-services';
import { APP_SCREEN } from '../../navigators/screen-type';
import { Topic } from '../../types';
import { colors, spacing, borderRadius, shadows } from '../../styles/theme';
import { useHideTabBarOnScroll } from '../../components';

export const TopicsScreen: React.FC = () => {
  const { topics } = useVocabularyStore(state => state);
  const { onScroll } = useHideTabBarOnScroll({ scrollThreshold: 40 });

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

  const renderTopicItem = ({ item }: { item: Topic }) => (
    <TouchableOpacity
      style={styles.topicCardContainer}
      onPress={() => navigate(APP_SCREEN.TOPIC_DETAIL, { topicId: item.id })}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={getTopicGradient(item.id)}
        style={styles.topicCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.topicIconContainer}>
          <Text style={styles.topicIcon}>{item.icon}</Text>
        </View>
        <View style={styles.topicInfo}>
          <Text style={styles.topicName}>{item.nameVietnamese}</Text>
          <Text style={styles.topicNameEn}>{item.name}</Text>
          <Text style={styles.topicDescription}>{item.description}</Text>
          <View style={styles.wordCountContainer}>
            <Text style={styles.wordCount}>{item.words.length} từ vựng</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={colors.primaryGradient}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.title}>Chủ Đề Học Tập</Text>
        <Text style={styles.subtitle}>Chọn chủ đề bạn muốn học</Text>
      </LinearGradient>

      <FlatList
        data={topics}
        renderItem={renderTopicItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        numColumns={1}
        onScroll={onScroll}
        scrollEventThrottle={16}
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
    padding: spacing.xxxl,
    paddingTop: spacing.huge,
    paddingBottom: spacing.xxxl,
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textWhite,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textWhite,
    textAlign: 'center',
    opacity: 0.9,
  },
  listContainer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: 120, // Extra space for tab bar
  },
  topicCardContainer: {
    marginBottom: spacing.lg,
  },
  topicCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.xl,
    borderRadius: borderRadius.lg,
    ...shadows.medium,
  },
  topicIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.lg,
  },
  topicIcon: {
    fontSize: 36,
  },
  topicInfo: {
    flex: 1,
  },
  topicName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textWhite,
    marginBottom: spacing.xs,
  },
  topicNameEn: {
    fontSize: 16,
    color: colors.textWhite,
    opacity: 0.9,
    marginBottom: spacing.sm,
  },
  topicDescription: {
    fontSize: 14,
    color: colors.textWhite,
    opacity: 0.8,
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
    fontSize: 12,
    color: colors.textWhite,
    fontWeight: '600',
  },
});
