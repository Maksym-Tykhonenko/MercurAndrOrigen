import React, {useState} from 'react';
import {View, ScrollView, StyleSheet, Dimensions} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  Text,
  Modal,
  Portal,
  ProgressBar,
  Icon,
} from 'react-native-paper';
import PieChart, {Slice} from 'react-native-pie-chart';

interface QuizCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  questions: Question[];
}

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  answers: Array<{
    questionText: string;
    selectedAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    explanation?: string;
  }>;
}

const QUIZ_CATEGORIES: QuizCategory[] = [
  {
    id: 'solar-system',
    title: 'Solar System Challenge',
    icon: 'solar-power',
    description: 'Dive deep into planetary knowledge',
    questions: [
      {
        id: 'q1',
        text: 'Which planet is known as the "Red Planet"?',
        options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
        correctAnswer: 1,
        explanation:
          'Mars gets its reddish appearance from iron oxide (rust) on its surface.',
      },
      {
        id: 'q2',
        text: 'How many planets are in our solar system?',
        options: ['7', '8', '9', '10'],
        correctAnswer: 1,
        explanation:
          'Since 2006, Pluto is no longer considered a planet, leaving 8 planets.',
      },
      {
        id: 'q3',
        text: 'Which planet is the largest in our solar system?',
        options: ['Saturn', 'Neptune', 'Jupiter', 'Uranus'],
        correctAnswer: 2,
        explanation:
          'Jupiter is the largest planet, with a mass more than two and a half times that of all the other planets combined.',
      },
      {
        id: 'q4',
        text: 'Which planet rotates on its side?',
        options: ['Mars', 'Venus', 'Uranus', 'Mercury'],
        correctAnswer: 2,
        explanation:
          'Uranus is tilted almost 98 degrees, causing extreme seasonal variations.',
      },
      {
        id: 'q5',
        text: 'Which planet is closest to the Sun?',
        options: ['Mercury', 'Venus', 'Earth', 'Mars'],
        correctAnswer: 0,
        explanation:
          'Mercury is the closest planet to the Sun, with an average distance of 57.9 million kilometers.',
      },
      {
        id: 'q6',
        text: 'What planet has the most moons?',
        options: ['Saturn', 'Jupiter', 'Neptune', 'Mars'],
        correctAnswer: 1,
        explanation:
          'Jupiter has 79 confirmed moons, making it the planet with the most moons in our solar system.',
      },
    ],
  },
  {
    id: 'space-exploration',
    title: 'Space Exploration History',
    icon: 'rocket-outline',
    description: 'Journey through human space achievements',
    questions: [
      {
        id: 'q1',
        text: 'Who was the first human in space?',
        options: [
          'Neil Armstrong',
          'Yuri Gagarin',
          'Buzz Aldrin',
          'John Glenn',
        ],
        correctAnswer: 1,
        explanation:
          'Yuri Gagarin, a Soviet cosmonaut, became the first human to journey into outer space on April 12, 1961.',
      },
      {
        id: 'q2',
        text: 'In which year did humans first land on the Moon?',
        options: ['1965', '1967', '1969', '1972'],
        correctAnswer: 2,
        explanation:
          'The Apollo 11 mission landed Neil Armstrong and Buzz Aldrin on the Moon on July 20, 1969.',
      },
      {
        id: 'q3',
        text: 'What was the name of the first artificial satellite launched into space?',
        options: ['Sputnik 1', 'Apollo 11', 'Voyager 1', 'Hubble'],
        correctAnswer: 0,
        explanation:
          'Sputnik 1, launched by the Soviet Union in 1957, was the first artificial satellite.',
      },
      {
        id: 'q4',
        text: 'Which space probe was the first to reach interstellar space?',
        options: ['Voyager 1', 'Pioneer 10', 'Cassini', 'New Horizons'],
        correctAnswer: 0,
        explanation:
          'Voyager 1, launched in 1977, entered interstellar space in 2012.',
      },
    ],
  },
  {
    id: 'cosmos-discoveries',
    title: 'Cosmos Discoveries',
    icon: 'star-outline',
    description: 'Test your knowledge about space wonders',
    questions: [
      {
        id: 'q1',
        text: 'What is the largest known star in the universe?',
        options: ['Sirius', 'UY Scuti', 'Betelgeuse', 'Polaris'],
        correctAnswer: 1,
        explanation:
          'UY Scuti is currently considered the largest known star in the universe in terms of volume.',
      },
      {
        id: 'q2',
        text: 'What is the name of the black hole at the center of the Milky Way?',
        options: ['Sagittarius A*', 'Cygnus X-1', 'Andromeda X', 'M87'],
        correctAnswer: 0,
        explanation:
          'Sagittarius A* is the supermassive black hole located at the center of the Milky Way galaxy.',
      },
      {
        id: 'q3',
        text: 'Which galaxy is closest to the Milky Way?',
        options: [
          'Andromeda Galaxy',
          'Triangulum Galaxy',
          'Messier 81',
          'Whirlpool Galaxy',
        ],
        correctAnswer: 0,
        explanation:
          'The Andromeda Galaxy is the closest spiral galaxy to the Milky Way and is on a collision course with it.',
      },
    ],
  },
  {
    id: 'space-technology',
    title: 'Space Technology Trivia',
    icon: 'satellite-uplink',
    description: 'Learn about the technology powering space missions',
    questions: [
      {
        id: 'q1',
        text: 'Which rocket is the most powerful ever launched?',
        options: ['Saturn V', 'Falcon Heavy', 'SLS', 'Starship'],
        correctAnswer: 0,
        explanation:
          'Saturn V, used during the Apollo missions, remains the most powerful rocket ever successfully launched.',
      },
      {
        id: 'q2',
        text: 'Which organization launched the Hubble Space Telescope?',
        options: ['NASA', 'ESA', 'SpaceX', 'ISRO'],
        correctAnswer: 0,
        explanation:
          'NASA launched the Hubble Space Telescope in partnership with the European Space Agency (ESA) in 1990.',
      },
    ],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1b2e',
    padding: 15,
  },
  screenTitle: {
    fontSize: 28,
    textAlign: 'center',
    marginVertical: 20,
    color: '#e0e0ff',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  categoryCard: {
    marginVertical: 10,
    backgroundColor: '#252642',
    borderRadius: 15,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  cardTitle: {
    color: '#e0e0ff',
    fontSize: 20,
    marginBottom: 5,
  },
  cardDescription: {
    color: '#b8b8ff',
    fontSize: 14,
  },
  modalContainer: {
    backgroundColor: '#252642',
    margin: 20,
    borderRadius: 15,
    padding: 25,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  questionText: {
    fontSize: 20,
    marginBottom: 25,
    textAlign: 'center',
    color: '#e0e0ff',
    lineHeight: 28,
  },
  answerButton: {
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: '#2d2d4f',
  },
  answerButtonLabel: {
    fontSize: 16,
    padding: 8,
    color: '#e0e0ff',
  },
  progressBar: {
    marginTop: 20,
    height: 8,
    borderRadius: 4,
  },
  resultsModalContainer: {
    backgroundColor: '#252642',
    margin: 20,
    borderRadius: 15,
    padding: 25,
    maxHeight: '90%',
  },
  resultsTitle: {
    textAlign: 'center',
    marginBottom: 25,
    color: '#e0e0ff',
    fontSize: 24,
    fontWeight: '600',
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: 25,
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    gap: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    color: '#e0e0ff',
    fontSize: 16,
  },
  answerReviewCard: {
    marginVertical: 10,
    backgroundColor: '#2d2d4f',
    borderRadius: 12,
  },
  answerReviewText: {
    fontSize: 16,
    marginBottom: 12,
    lineHeight: 24,
  },
  correctAnswer: {
    color: '#4CAF50',
  },
  incorrectAnswer: {
    color: '#F44336',
  },
  answerDetail: {
    color: '#b8b8ff',
    marginVertical: 4,
    fontSize: 15,
  },
  explanationText: {
    marginTop: 12,
    fontStyle: 'italic',
    color: '#88c0d0',
    fontSize: 14,
    lineHeight: 20,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#4c566a',
  },
});

export const SurveysScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory | null>(
    null,
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [resultsModalVisible, setResultsModalVisible] = useState(false);

  const startQuiz = (category: QuizCategory) => {
    setSelectedCategory(category);
    setCurrentQuestionIndex(0);
    setQuizResult({
      totalQuestions: category.questions.length,
      correctAnswers: 0,
      incorrectAnswers: 0,
      answers: [],
    });
    setModalVisible(true);
  };

  const handleAnswer = (selectedOptionIndex: number) => {
    if (!selectedCategory || !quizResult) return;

    const currentQuestion = selectedCategory.questions[currentQuestionIndex];
    const isCorrect = selectedOptionIndex === currentQuestion.correctAnswer;

    const newResult = {
      ...quizResult,
      correctAnswers: isCorrect
        ? quizResult.correctAnswers + 1
        : quizResult.correctAnswers,
      incorrectAnswers: !isCorrect
        ? quizResult.incorrectAnswers + 1
        : quizResult.incorrectAnswers,
      answers: [
        ...quizResult.answers,
        {
          questionText: currentQuestion.text,
          selectedAnswer: currentQuestion.options[selectedOptionIndex],
          correctAnswer: currentQuestion.options[currentQuestion.correctAnswer],
          isCorrect,
          explanation: currentQuestion.explanation,
        },
      ],
    };

    if (currentQuestionIndex < selectedCategory.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setQuizResult(newResult);
    } else {
      setQuizResult(newResult);
      setModalVisible(false);
      setResultsModalVisible(true);
    }
  };

  const renderQuizCategories = () => {
    return QUIZ_CATEGORIES.map(category => (
      <Card
        key={category.id}
        style={styles.categoryCard}
        onPress={() => startQuiz(category)}>
        <Card.Content style={styles.cardContent}>
          <Icon source={category.icon} size={32} color="#88c0d0" />
          <View style={{marginLeft: 15, flex: 1}}>
            <Text style={styles.cardTitle}>{category.title}</Text>
            <Text style={styles.cardDescription}>{category.description}</Text>
          </View>
        </Card.Content>
      </Card>
    ));
  };

  const renderQuizModal = () => {
    if (!selectedCategory) return null;

    const currentQuestion = selectedCategory.questions[currentQuestionIndex];

    return (
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={styles.modalContainer}>
          <Text style={styles.questionText}>{currentQuestion.text}</Text>
          {currentQuestion.options.map((option, index) => (
            <Button
              key={index}
              mode="contained"
              onPress={() => handleAnswer(index)}
              style={styles.answerButton}
              labelStyle={styles.answerButtonLabel}>
              {option}
            </Button>
          ))}
          <ProgressBar
            progress={
              (currentQuestionIndex + 1) / selectedCategory.questions.length
            }
            color="#88c0d0"
            style={styles.progressBar}
          />
        </Modal>
      </Portal>
    );
  };

  const renderResultsModal = () => {
    if (!quizResult) return null;

    const chartWidth = Dimensions.get('window').width * 0.5;
    const series: Slice[] = [
      {
        value: quizResult.correctAnswers,
        color: '#4CAF50',
      },
      {
        value: quizResult.incorrectAnswers,
        color: '#F44336',
      },
    ];

    return (
      <Portal>
        <Modal
          visible={resultsModalVisible}
          onDismiss={() => setResultsModalVisible(false)}
          contentContainerStyle={styles.resultsModalContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Title style={styles.resultsTitle}>Quiz Results</Title>

            <View style={styles.chartContainer}>
              <PieChart widthAndHeight={chartWidth} series={series} />
              <View style={styles.chartLegend}>
                <View style={styles.legendItem}>
                  <View
                    style={[styles.legendDot, {backgroundColor: '#4CAF50'}]}
                  />
                  <Text style={styles.legendText}>
                    Correct: {quizResult.correctAnswers}
                  </Text>
                </View>
                <View style={styles.legendItem}>
                  <View
                    style={[styles.legendDot, {backgroundColor: '#F44336'}]}
                  />
                  <Text style={styles.legendText}>
                    Incorrect: {quizResult.incorrectAnswers}
                  </Text>
                </View>
              </View>
            </View>

            {quizResult.answers.map((answer, index) => (
              <Card key={index} style={styles.answerReviewCard}>
                <Card.Content>
                  <Text
                    style={[
                      styles.answerReviewText,
                      answer.isCorrect
                        ? styles.correctAnswer
                        : styles.incorrectAnswer,
                    ]}>
                    Question {index + 1}: {answer.questionText}
                  </Text>
                  <Text style={styles.answerDetail}>
                    Your Answer: {answer.selectedAnswer}
                  </Text>
                  <Text style={styles.answerDetail}>
                    Correct Answer: {answer.correctAnswer}
                  </Text>
                  {answer.explanation && (
                    <Text style={styles.explanationText}>
                      {answer.explanation}
                    </Text>
                  )}
                </Card.Content>
              </Card>
            ))}

            <Button
              mode="contained"
              onPress={() => setResultsModalVisible(false)}
              style={styles.closeButton}>
              Close Results
            </Button>
          </ScrollView>
        </Modal>
      </Portal>
    );
  };

  return (
    <View style={styles.container}>
      <Title style={styles.screenTitle}>Astronomy Quizzes</Title>
      <ScrollView>{renderQuizCategories()}</ScrollView>
      {renderQuizModal()}
      {renderResultsModal()}
    </View>
  );
};
