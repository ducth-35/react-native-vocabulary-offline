import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import { useVocabularyStore } from '../../store/useVocabularyStore';
import { navigate } from '../../navigators/navigation-services';
import { APP_SCREEN } from '../../navigators/screen-type';

export const ProfileScreen: React.FC = () => {
  const {
    currentStreak,
    totalWordsLearned,
    userSettings,
    dailyProgress
  } = useVocabularyStore(state => state);

  const totalDaysStudied = dailyProgress.length;
  const averageWordsPerDay = totalDaysStudied > 0 ?
    Math.round(totalWordsLearned / totalDaysStudied) : 0;

  const profileStats = [
    {
      icon: '🔥',
      label: 'Chuỗi ngày học',
      value: `${currentStreak} ngày`,
      color: '#E74C3C',
    },
    {
      icon: '📚',
      label: 'Tổng từ đã học',
      value: `${totalWordsLearned} từ`,
      color: '#3498DB',
    },
    {
      icon: '📅',
      label: 'Ngày đã học',
      value: `${totalDaysStudied} ngày`,
      color: '#27AE60',
    },
    {
      icon: '⚡',
      label: 'Trung bình/ngày',
      value: `${averageWordsPerDay} từ`,
      color: '#F39C12',
    },
  ];

  const menuItems = [
    {
      icon: '⚙️',
      title: 'Cài đặt',
      subtitle: 'Tùy chỉnh ứng dụng',
      onPress: () => navigate(APP_SCREEN.SETTINGS),
    },
    {
      icon: '📊',
      title: 'Thống kê chi tiết',
      subtitle: 'Xem tiến độ học tập',
      onPress: () => {
        // TODO: Navigate to detailed stats
      },
    },
    {
      icon: '🎯',
      title: 'Mục tiêu',
      subtitle: 'Đặt mục tiêu học tập',
      onPress: () => {
        // TODO: Navigate to goals
      },
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Hồ Sơ Của Tôi</Text>
        <Text style={styles.subtitle}>Theo dõi tiến độ học tập</Text>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        {profileStats.map((stat, index) => (
          <View key={index} style={[styles.statCard, { borderLeftColor: stat.color }]}>
            <Text style={styles.statIcon}>{stat.icon}</Text>
            <View style={styles.statInfo}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Settings */}
      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Cài đặt hiện tại</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Từ học mỗi ngày:</Text>
          <Text style={styles.settingValue}>{userSettings.dailyWordCount} từ</Text>
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Âm thanh:</Text>
          <Text style={styles.settingValue}>
            {userSettings.soundEnabled ? 'Bật' : 'Tắt'}
          </Text>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menuSection}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={item.onPress}
            activeOpacity={0.7}
          >
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <View style={styles.menuInfo}>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
            </View>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7F8C8D',
  },
  statsGrid: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  statInfo: {
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  settingsSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  settingLabel: {
    fontSize: 16,
    color: '#2C3E50',
  },
  settingValue: {
    fontSize: 16,
    color: '#3498DB',
    fontWeight: '600',
  },
  menuSection: {
    paddingHorizontal: 20,
  },
  menuItem: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  menuInfo: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  menuArrow: {
    fontSize: 20,
    color: '#BDC3C7',
  },
});
