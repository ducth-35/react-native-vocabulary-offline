import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React, { useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useVocabularyStore } from '../../store/useVocabularyStore';
import { navigate } from '../../navigators/navigation-services';
import { APP_SCREEN } from '../../navigators/screen-type';
import { colors, spacing, borderRadius, shadows } from '../../styles/theme';
import { useHideTabBarOnScroll } from '../../components';

export const HomeScreen: React.FC = () => {
  const {
    currentStreak,
    totalWordsLearned,
    userSettings,
    actions
  } = useVocabularyStore(state => state);

  const { onScroll } = useHideTabBarOnScroll({ scrollThreshold: 30 });

  useEffect(() => {
    // Generate daily words when app starts
    if (actions && actions.generateDailyWords) {
      actions.generateDailyWords();
    }
  }, [actions]);

  const menuItems = [
    {
      title: 'Học Theo Chủ Đề',
      subtitle: 'Khám phá từ vựng theo chủ đề',
      icon: '📚',
      gradient: colors.topicColors.fruits.gradient,
      screen: APP_SCREEN.TOPICS,
    },
    {
      title: 'Từ Vựng Hôm Nay',
      subtitle: `${userSettings.dailyWordCount} từ mới mỗi ngày`,
      icon: '📅',
      gradient: colors.topicColors.animals.gradient,
      screen: APP_SCREEN.DAILY_WORDS,
    },
    {
      title: 'Flashcard',
      subtitle: 'Ôn tập nhanh với thẻ từ',
      icon: '🃏',
      gradient: colors.topicColors.colors.gradient,
      screen: APP_SCREEN.FLASHCARD,
    },
    {
      title: 'Kiểm Tra',
      subtitle: 'Làm bài quiz tổng hợp',
      icon: '🧠',
      gradient: colors.topicColors.jobs.gradient,
      screen: APP_SCREEN.QUIZ,
    },
  ];

  const renderMenuItem = (item: typeof menuItems[0], index: number) => (
    <TouchableOpacity
      key={index}
      style={styles.menuItemContainer}
      onPress={() => navigate(item.screen)}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={item.gradient}
        style={styles.menuItem}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.menuIconContainer}>
          <Text style={styles.menuIcon}>{item.icon}</Text>
        </View>
        <View style={styles.menuTextContainer}>
          <Text style={styles.menuTitle}>{item.title}</Text>
          <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header with Gradient */}
        <LinearGradient
          colors={colors.primaryGradient}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.appTitle}>Từ Vựng Mỗi Ngày</Text>
          <Text style={styles.welcomeText}>Chào mừng bạn đến với ứng dụng học từ vựng!</Text>
        </LinearGradient>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <LinearGradient
            colors={colors.successGradient}
            style={styles.statCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.statIcon}>🔥</Text>
            <Text style={styles.statNumber}>{currentStreak}</Text>
            <Text style={styles.statLabel}>Ngày liên tiếp</Text>
          </LinearGradient>

          <LinearGradient
            colors={colors.secondaryGradient}
            style={styles.statCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.statIcon}>📚</Text>
            <Text style={styles.statNumber}>{totalWordsLearned}</Text>
            <Text style={styles.statLabel}>Từ đã học</Text>
          </LinearGradient>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <Text style={styles.sectionTitle}>Bắt đầu học ngay</Text>
          {menuItems.map((item, index) => renderMenuItem(item, index))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Học một chút mỗi ngày, tiến bộ mỗi ngày! 🌟
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Space for tab bar
  },
  header: {
    padding: spacing.xxxl,
    alignItems: 'center',
    marginBottom: spacing.xl,
    paddingTop: spacing.huge,
    paddingBottom: spacing.xxxl,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.textWhite,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 16,
    color: colors.textWhite,
    textAlign: 'center',
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: spacing.xl,
    marginBottom: spacing.xxxl,
    gap: spacing.lg,
  },
  statCard: {
    flex: 1,
    padding: spacing.xl,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    ...shadows.medium,
  },
  statIcon: {
    fontSize: 28,
    marginBottom: spacing.sm,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textWhite,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textWhite,
    opacity: 0.9,
    textAlign: 'center',
  },
  menuContainer: {
    paddingHorizontal: spacing.xl,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  menuItemContainer: {
    marginBottom: spacing.lg,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.xl,
    borderRadius: borderRadius.lg,
    ...shadows.medium,
  },
  menuIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.lg,
  },
  menuIcon: {
    fontSize: 28,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textWhite,
    marginBottom: spacing.xs,
  },
  menuSubtitle: {
    fontSize: 14,
    color: colors.textWhite,
    opacity: 0.9,
  },
  footer: {
    padding: spacing.xxxl,
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  footerText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
