import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  Text,
  Card,
  Button,
  IconButton,
  Portal,
  Modal,
  ProgressBar,
  Chip,
  List,
  Avatar,
} from 'react-native-paper';
import {Header} from '../components/header';
import {MoonPhase} from '../components/moonPhase';
import {AstronomicalEvents} from '../components/astronomicalEvents';
import {DailyInspiration} from '../components/dailyInspiration';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1b2e',
  },
  scrollContent: {
    flex: 1,
  },
  contentContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  footer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#2d2d4f',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -3},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  footerText: {
    textAlign: 'center',
    color: '#e0e0ff',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  starTrackerCard: {
    backgroundColor: '#252642',
    marginVertical: 15,
    borderRadius: 15,
    elevation: 8,
  },
  cardTitle: {
    color: '#88c0d0',
    fontSize: 20,
    marginBottom: 10,
  },
  reminderButton: {
    backgroundColor: '#88c0d0',
    marginTop: 10,
  },
  modalContent: {
    backgroundColor: '#252642',
    margin: 20,
    borderRadius: 15,
    padding: 20,
  },
  shareButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  achievementBadge: {
    position: 'absolute',
    right: -5,
    top: -5,
    backgroundColor: '#ffd700',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  achievementText: {
    color: '#1a1b2e',
    fontSize: 12,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    padding: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: '#88c0d0',
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#e0e0ff',
    fontSize: 12,
  },
  progressContainer: {
    marginTop: 10,
  },
  progressLabel: {
    color: '#e0e0ff',
    marginBottom: 5,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10,
  },
  eventChip: {
    backgroundColor: '#2d2d4f',
  },
  challengeCard: {
    backgroundColor: '#252642',
    marginVertical: 15,
    borderRadius: 15,
  },
  friendActivity: {
    backgroundColor: '#252642',
    marginVertical: 15,
    borderRadius: 15,
  },
  prediction: {
    backgroundColor: '#2d2d4f',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  badge: {
    backgroundColor: '#88c0d0',
    padding: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  weatherAlert: {
    backgroundColor: '#ff4757',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
});

interface StargazingSession {
  date: string;
  duration: number;
  events: string[];
  notes?: string;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  reward: number;
  completed: boolean;
}

const MOCK_CHALLENGES: Challenge[] = [
  {
    id: '1',
    title: 'Planet Hunter',
    description: 'Spot 3 different planets this week',
    reward: 100,
    completed: false,
  },
  {
    id: '2',
    title: 'Meteor Master',
    description: 'Watch a meteor shower',
    reward: 150,
    completed: false,
  },
];

export const Home = () => {
  const [showReminder, setShowReminder] = useState(false);
  const [stargazingStreak, setStargazingStreak] = useState(0);
  const [showAchievement, setShowAchievement] = useState(false);
  const [sessions, setSessions] = useState<StargazingSession[]>([]);
  const [monthlyGoal, setMonthlyGoal] = useState(10);
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>(MOCK_CHALLENGES);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showWeatherAlert, setShowWeatherAlert] = useState(true);

  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const savedSessions = await AsyncStorage.getItem('stargazing_sessions');
      if (savedSessions) {
        setSessions(JSON.parse(savedSessions));
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const toggleChallengeComplete = (id: string) => {
    setChallenges(prev =>
      prev.map(c => (c.id === id ? {...c, completed: !c.completed} : c)),
    );
  };

  const handleStargazingLog = async () => {
    if (selectedEvents.length === 0) {
      Alert.alert(
        'Select Events',
        'Please select at least one celestial event you observed',
      );
      return;
    }

    const newSession: StargazingSession = {
      date: new Date().toISOString(),
      duration: 30,
      events: selectedEvents,
    };

    const updatedSessions = [...sessions, newSession];
    setSessions(updatedSessions);

    const newStreak = stargazingStreak + 1;
    setStargazingStreak(newStreak);

    if (newStreak % 5 === 0) {
      setShowAchievement(true);
    }

    try {
      await AsyncStorage.setItem(
        'stargazing_sessions',
        JSON.stringify(updatedSessions),
      );
    } catch (error) {
      console.error('Error saving session:', error);
    }
  };

  const monthlyProgress = sessions.filter(
    s => new Date(s.date).getMonth() === new Date().getMonth(),
  ).length;

  const availableEvents = ['Moon', 'Planets', 'Stars', 'Meteors', 'Nebulae'];

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView style={styles.scrollContent}>
        <View style={styles.contentContainer}>
          {showWeatherAlert && (
            <TouchableOpacity
              style={styles.weatherAlert}
              onPress={() => setShowWeatherAlert(false)}>
              <Text style={{color: '#fff'}}>
                Clear skies tonight! Perfect for stargazing 🌟
              </Text>
            </TouchableOpacity>
          )}

          <MoonPhase />
          <AstronomicalEvents />

          <Card style={styles.challengeCard}>
            <Card.Content>
              <Text style={styles.cardTitle}>Weekly Challenges</Text>
              {challenges.map(challenge => (
                <TouchableOpacity
                  key={challenge.id}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 8,
                  }}
                  onPress={() => toggleChallengeComplete(challenge.id)}>
                  <IconButton
                    icon={
                      challenge.completed ? 'check-circle' : 'circle-outline'
                    }
                    iconColor={challenge.completed ? '#88c0d0' : '#e0e0ff'}
                  />
                  <View style={{flex: 1}}>
                    <Text style={{color: '#e0e0ff'}}>{challenge.title}</Text>
                    <Text style={{color: '#b8b8ff'}}>
                      {challenge.description}
                    </Text>
                  </View>
                  <View style={styles.badge}>
                    <Text style={{color: '#1a1b2e'}}>
                      {challenge.reward}pts
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </Card.Content>
          </Card>

          <Card style={styles.starTrackerCard}>
            <Card.Content>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.cardTitle}>Star Gazing Tracker</Text>
                {showAchievement && (
                  <View style={styles.achievementBadge}>
                    <Text style={styles.achievementText}>✨</Text>
                  </View>
                )}
              </View>

              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{stargazingStreak}</Text>
                  <Text style={styles.statLabel}>Day Streak</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{sessions.length}</Text>
                  <Text style={styles.statLabel}>Total Sessions</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{monthlyProgress}</Text>
                  <Text style={styles.statLabel}>This Month</Text>
                </View>
              </View>

              <View style={styles.progressContainer}>
                <Text style={styles.progressLabel}>Monthly Goal Progress</Text>
                <ProgressBar
                  progress={monthlyProgress / monthlyGoal}
                  color="#88c0d0"
                />
              </View>

              <Text style={[styles.progressLabel, {marginTop: 15}]}>
                What did you observe today?
              </Text>
              <View style={styles.chipContainer}>
                {availableEvents.map(event => (
                  <Chip
                    key={event}
                    selected={selectedEvents.includes(event)}
                    onPress={() => {
                      setSelectedEvents(prev =>
                        prev.includes(event)
                          ? prev.filter(e => e !== event)
                          : [...prev, event],
                      );
                    }}
                    style={styles.eventChip}
                    selectedColor="#88c0d0">
                    {event}
                  </Chip>
                ))}
              </View>

              <Button
                mode="contained"
                style={styles.reminderButton}
                onPress={handleStargazingLog}>
                Log Tonight's Session
              </Button>
            </Card.Content>
          </Card>

          <Card style={styles.friendActivity}>
            <Card.Content>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={styles.cardTitle}>Community Activity</Text>
                <Button
                  mode="text"
                  textColor="#88c0d0"
                  onPress={() => setShowLeaderboard(true)}>
                  View All
                </Button>
              </View>
              <List.Item
                title="Alex spotted Jupiter"
                description="15 minutes ago"
                left={props => <Avatar.Text size={40} label="A" />}
                titleStyle={{color: '#e0e0ff'}}
                descriptionStyle={{color: '#b8b8ff'}}
              />
              <List.Item
                title="Maria logged a meteor shower"
                description="1 hour ago"
                left={props => <Avatar.Text size={40} label="M" />}
                titleStyle={{color: '#e0e0ff'}}
                descriptionStyle={{color: '#b8b8ff'}}
              />
            </Card.Content>
          </Card>

          <View style={styles.prediction}>
            <Text style={{color: '#e0e0ff', fontSize: 16}}>
              Next Major Event: Lunar Eclipse
            </Text>
            <Text style={{color: '#b8b8ff', marginTop: 5}}>
              In 3 days - Set reminder?
            </Text>
            <Button
              mode="contained"
              style={{marginTop: 10, backgroundColor: '#88c0d0'}}
              onPress={() => {}}>
              Remind Me
            </Button>
          </View>

          <DailyInspiration />
        </View>
      </ScrollView>

      <Portal>
        <Modal
          visible={showReminder}
          onDismiss={() => setShowReminder(false)}
          contentContainerStyle={styles.modalContent}>
          <Text style={{color: '#e0e0ff', marginBottom: 15}}>
            Set a reminder for tonight's celestial events?
          </Text>
          <Button
            mode="contained"
            onPress={() => setShowReminder(false)}
            style={{backgroundColor: '#88c0d0'}}>
            Set Reminder
          </Button>
        </Modal>
        <Modal
          visible={showLeaderboard}
          onDismiss={() => setShowLeaderboard(false)}
          contentContainerStyle={styles.modalContent}>
          <Text style={[styles.cardTitle, {marginBottom: 15}]}>
            Top Stargazers This Week
          </Text>
          {[
            {name: 'Alex', points: 450},
            {name: 'Maria', points: 380},
            {name: 'John', points: 310},
          ].map((user, index) => (
            <View key={user.name} style={styles.leaderboardItem}>
              <Text style={{color: '#88c0d0', marginRight: 10}}>
                #{index + 1}
              </Text>
              <Avatar.Text
                size={40}
                label={user.name[0]}
                style={{marginRight: 10}}
              />
              <View style={{flex: 1}}>
                <Text style={{color: '#e0e0ff'}}>{user.name}</Text>
                <Text style={{color: '#b8b8ff'}}>{user.points} points</Text>
              </View>
            </View>
          ))}
        </Modal>
      </Portal>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Follow cosmic events with us ✨</Text>
      </View>
    </SafeAreaView>
  );
};
