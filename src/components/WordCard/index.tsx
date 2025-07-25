import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { Word } from '../../types';
import { ttsService } from '../../utils';

interface WordCardProps {
  word: Word;
  showExample?: boolean;
  onPress?: () => void;
  style?: any;
}

export const WordCard: React.FC<WordCardProps> = ({
  word,
  showExample = true,
  onPress,
  style,
}) => {
  const playPronunciation = async () => {
    try {
      await ttsService.speakEnglish(word.english);
    } catch (error) {
      console.error('Failed to play pronunciation:', error);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.header}>
        <View style={styles.mainInfo}>
          <Text style={styles.englishWord}>{word.english}</Text>
          <Text style={styles.phonetic}>{word.phonetic}</Text>
        </View>
        <TouchableOpacity
          style={styles.playButton}
          onPress={playPronunciation}
        >
          <Text style={styles.playIcon}>🔊</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.vietnameseWord}>{word.vietnamese}</Text>
      
      {showExample && word.example && (
        <View style={styles.exampleContainer}>
          <Text style={styles.exampleLabel}>Ví dụ:</Text>
          <Text style={styles.exampleText}>{word.example}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  mainInfo: {
    flex: 1,
  },
  englishWord: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  phonetic: {
    fontSize: 14,
    color: '#7F8C8D',
    fontStyle: 'italic',
  },
  playButton: {
    padding: 8,
  },
  playIcon: {
    fontSize: 20,
  },
  vietnameseWord: {
    fontSize: 18,
    color: '#E74C3C',
    fontWeight: '600',
    marginBottom: 10,
  },
  exampleContainer: {
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#3498DB',
  },
  exampleLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    fontWeight: '600',
    marginBottom: 4,
  },
  exampleText: {
    fontSize: 14,
    color: '#2C3E50',
    fontStyle: 'italic',
  },
});
