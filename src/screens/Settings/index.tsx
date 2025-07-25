import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  Alert,
} from 'react-native';
import React from 'react';
import { useVocabularyStore } from '../../store/useVocabularyStore';

export const SettingsScreen: React.FC = () => {
  const { userSettings, actions } = useVocabularyStore(state => state);

  const dailyWordOptions = [3, 5, 10, 15, 20];

  const updateDailyWordCount = (count: number) => {
    if (actions && actions.updateSettings) {
      actions.updateSettings({ dailyWordCount: count });
      Alert.alert('Cập nhật thành công', `Số từ học mỗi ngày: ${count}`);
    }
  };

  const toggleSound = (enabled: boolean) => {
    if (actions && actions.updateSettings) {
      actions.updateSettings({ soundEnabled: enabled });
    }
  };

  const renderDailyWordOption = (count: number) => (
    <TouchableOpacity
      key={count}
      style={[
        styles.optionButton,
        userSettings.dailyWordCount === count && styles.selectedOption
      ]}
      onPress={() => updateDailyWordCount(count)}
    >
      <Text style={[
        styles.optionText,
        userSettings.dailyWordCount === count && styles.selectedOptionText
      ]}>
        {count} từ/ngày
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Cài Đặt</Text>
        <Text style={styles.subtitle}>Tùy chỉnh trải nghiệm học tập</Text>
      </View>

      {/* Settings Content */}
      <View style={styles.content}>
        {/* Daily Words Setting */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Số từ học mỗi ngày</Text>
          <Text style={styles.sectionDescription}>
            Chọn số lượng từ vựng mới bạn muốn học mỗi ngày
          </Text>
          <View style={styles.optionsContainer}>
            {dailyWordOptions.map(count => renderDailyWordOption(count))}
          </View>
        </View>

        {/* Sound Setting */}
        <View style={styles.section}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Âm thanh phát âm</Text>
              <Text style={styles.settingDescription}>
                Bật/tắt phát âm từ vựng
              </Text>
            </View>
            <Switch
              value={userSettings.soundEnabled}
              onValueChange={toggleSound}
              trackColor={{ false: '#BDC3C7', true: '#3498DB' }}
              thumbColor={userSettings.soundEnabled ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>
        </View>

        {/* App Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin ứng dụng</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>📱 Từ Vựng Mỗi Ngày</Text>
            <Text style={styles.infoText}>🎯 Phiên bản: 1.0.0</Text>
            <Text style={styles.infoText}>🌟 Học từ vựng tiếng Anh dễ dàng</Text>
            <Text style={styles.infoText}>💡 Hoạt động hoàn toàn offline</Text>
          </View>
        </View>

        {/* Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mẹo học tập</Text>
          <View style={styles.tipsContainer}>
            <Text style={styles.tipText}>
              💪 Học đều đặn mỗi ngày để có kết quả tốt nhất
            </Text>
            <Text style={styles.tipText}>
              🔄 Sử dụng Flashcard để ôn tập từ đã học
            </Text>
            <Text style={styles.tipText}>
              🧠 Làm Quiz để kiểm tra kiến thức
            </Text>
            <Text style={styles.tipText}>
              🎯 Đặt mục tiêu nhỏ và thực hiện đều đặn
            </Text>
          </View>
        </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    backgroundColor: '#FFFFFF',
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
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 15,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionButton: {
    backgroundColor: '#ECF0F1',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    backgroundColor: '#3498DB',
    borderColor: '#2980B9',
  },
  optionText: {
    fontSize: 14,
    color: '#2C3E50',
    fontWeight: '600',
  },
  selectedOptionText: {
    color: '#FFFFFF',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingInfo: {
    flex: 1,
    marginRight: 15,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  infoContainer: {
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#2C3E50',
    lineHeight: 20,
  },
  tipsContainer: {
    gap: 12,
  },
  tipText: {
    fontSize: 14,
    color: '#2C3E50',
    lineHeight: 20,
  },
});
