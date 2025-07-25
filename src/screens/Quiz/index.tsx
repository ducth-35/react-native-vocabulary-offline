import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { useVocabularyStore } from '../../store/useVocabularyStore';
import { APP_SCREEN, RootStackParamList } from '../../navigators/screen-type';
import { Word, QuizQuestion } from '../../types';

type QuizRouteProp = RouteProp<RootStackParamList, APP_SCREEN.QUIZ>;

export const QuizScreen: React.FC = () => {
  const route = useRoute<QuizRouteProp>();
  const navigation = useNavigation();
  const { topicId } = route.params || {};

  const { actions, topics } = useVocabularyStore(state => state);
  const topic = useVocabularyStore(state =>
    topicId && state.actions && state.actions.getTopicById ? state.actions.getTopicById(topicId) : undefined
  );
  
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizTitle, setQuizTitle] = useState('');

  useEffect(() => {
    generateQuestions();
  }, [topic, topics]);

  const generateQuestions = () => {
    // Get words from specific topic or all topics
    let wordsToUse = [];
    let titleText = '';

    if (topic) {
      // Quiz for specific topic
      wordsToUse = topic.words;
      titleText = topic.nameVietnamese;
    } else {
      // General quiz from all topics
      wordsToUse = topics.flatMap(t => t.words);
      titleText = 'Tổng hợp';
    }

    setQuizTitle(titleText);

    if (wordsToUse.length < 4) {
      Alert.alert(
        'Lỗi',
        'Cần ít nhất 4 từ để tạo quiz',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack()
          }
        ]
      );
      return;
    }

    const shuffledWords = [...wordsToUse].sort(() => Math.random() - 0.5);
    const questionsToGenerate = Math.min(5, shuffledWords.length);
    const newQuestions: QuizQuestion[] = [];

    for (let i = 0; i < questionsToGenerate; i++) {
      const correctWord = shuffledWords[i];
      const wrongWords = wordsToUse
        .filter(w => w.id !== correctWord.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      const options = [correctWord, ...wrongWords]
        .sort(() => Math.random() - 0.5)
        .map(w => w.vietnamese);

      const correctAnswerIndex = options.findIndex(
        option => option === correctWord.vietnamese
      );

      newQuestions.push({
        id: `q${i}`,
        question: `"${correctWord.english}" có nghĩa là gì?`,
        options,
        correctAnswer: correctAnswerIndex,
        wordId: correctWord.id,
      });
    }

    setQuestions(newQuestions);
  };

  const selectAnswer = (answerIndex: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    
    if (answerIndex === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      // Quiz completed
      setShowResult(true);
      if (actions && actions.setQuizScore) {
        actions.setQuizScore(Math.round((score / questions.length) * 100));
      }
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setIsAnswered(false);
    generateQuestions();
  };

  // Remove this check since Quiz can work without specific topic

  if (questions.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Đang tạo câu hỏi...</Text>
      </SafeAreaView>
    );
  }

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Kết Quả Quiz</Text>
          <Text style={styles.resultScore}>{score}/{questions.length}</Text>
          <Text style={styles.resultPercentage}>{percentage}%</Text>
          
          <Text style={styles.resultMessage}>
            {percentage >= 80 ? 'Xuất sắc! 🎉' : 
             percentage >= 60 ? 'Tốt lắm! 👍' : 
             'Cần cố gắng thêm! 💪'}
          </Text>
          
          <TouchableOpacity style={styles.restartButton} onPress={restartQuiz}>
            <Text style={styles.restartButtonText}>Làm Lại</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Quiz - {quizTitle}</Text>
        <Text style={styles.progress}>
          Câu {currentQuestionIndex + 1} / {questions.length}
        </Text>
        <Text style={styles.score}>Điểm: {score}</Text>
      </View>

      {/* Question */}
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
      </View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        {currentQuestion.options.map((option, index) => {
          let buttonStyle = styles.optionButton;
          let textStyle = styles.optionText;
          
          if (isAnswered) {
            if (index === currentQuestion.correctAnswer) {
              buttonStyle = [styles.optionButton, styles.correctOption];
              textStyle = [styles.optionText, styles.correctOptionText];
            } else if (index === selectedAnswer) {
              buttonStyle = [styles.optionButton, styles.wrongOption];
              textStyle = [styles.optionText, styles.wrongOptionText];
            }
          } else if (selectedAnswer === index) {
            buttonStyle = [styles.optionButton, styles.selectedOption];
          }

          return (
            <TouchableOpacity
              key={index}
              style={buttonStyle}
              onPress={() => selectAnswer(index)}
              disabled={isAnswered}
            >
              <Text style={textStyle}>{option}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Next Button */}
      {isAnswered && (
        <View style={styles.nextContainer}>
          <TouchableOpacity style={styles.nextButton} onPress={nextQuestion}>
            <Text style={styles.nextButtonText}>
              {currentQuestionIndex < questions.length - 1 ? 'Câu Tiếp' : 'Xem Kết Quả'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  progress: {
    fontSize: 16,
    color: '#7F8C8D',
    marginBottom: 4,
  },
  score: {
    fontSize: 16,
    color: '#27AE60',
    fontWeight: '600',
  },
  questionContainer: {
    padding: 20,
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionText: {
    fontSize: 18,
    color: '#2C3E50',
    textAlign: 'center',
    fontWeight: '600',
  },
  optionsContainer: {
    paddingHorizontal: 20,
  },
  optionButton: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    borderColor: '#3498DB',
    backgroundColor: '#EBF3FD',
  },
  correctOption: {
    backgroundColor: '#D5EDDA',
    borderColor: '#27AE60',
  },
  wrongOption: {
    backgroundColor: '#F8D7DA',
    borderColor: '#E74C3C',
  },
  optionText: {
    fontSize: 16,
    color: '#2C3E50',
    textAlign: 'center',
    fontWeight: '500',
  },
  correctOptionText: {
    color: '#27AE60',
    fontWeight: '600',
  },
  wrongOptionText: {
    color: '#E74C3C',
    fontWeight: '600',
  },
  nextContainer: {
    padding: 20,
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#3498DB',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nextButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 20,
  },
  resultScore: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#3498DB',
    marginBottom: 10,
  },
  resultPercentage: {
    fontSize: 24,
    color: '#7F8C8D',
    marginBottom: 20,
  },
  resultMessage: {
    fontSize: 20,
    color: '#27AE60',
    textAlign: 'center',
    marginBottom: 40,
  },
  restartButton: {
    backgroundColor: '#3498DB',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  restartButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#E74C3C',
    textAlign: 'center',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#3498DB',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
