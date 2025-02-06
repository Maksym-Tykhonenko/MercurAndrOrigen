import {ScrollView, StyleSheet, View} from 'react-native';
import {Card, Icon, Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

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
  profileHeader: {
    alignItems: 'center',
    marginBottom: 25,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#88c0d0',
  },
  profileName: {
    color: '#e0e0ff',
    fontSize: 24,
    fontWeight: '600',
    marginTop: 15,
    letterSpacing: 0.5,
  },
  profileEmail: {
    color: '#b8b8ff',
    fontSize: 16,
    marginTop: 5,
  },
  profileCard: {
    backgroundColor: '#252642',
    marginVertical: 10,
    borderRadius: 15,
    elevation: 8,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  cardTitle: {
    color: '#e0e0ff',
    fontSize: 18,
    marginBottom: 5,
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
  modalContainer: {
    backgroundColor: '#252642',
    margin: 20,
    borderRadius: 15,
    padding: 20,
  },
  input: {
    backgroundColor: '#1a1b2e',
    marginVertical: 10,
    color: '#e0e0ff',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export const AchievementsScreen: React.FC = () => {
  const achievements = [
    {
      id: '1',
      title: 'First Cosmic Step',
      description: 'Completed the first astronomy quiz',
      icon: 'rocket-launch',
    },
    {
      id: '2',
      title: 'Star Gazer',
      description: 'Learned more than 50 astronomy facts',
      icon: 'star-outline',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.contentContainer}>
          <Text style={[styles.profileName, {textAlign: 'center'}]}>
            My Achievements
          </Text>
          {achievements.map(achievement => (
            <Card key={achievement.id} style={styles.profileCard}>
              <Card.Content style={styles.cardContent}>
                <Icon source={achievement.icon} size={24} color="#88c0d0" />
                <View style={{marginLeft: 10}}>
                  <Text style={styles.cardTitle}>{achievement.title}</Text>
                  <Text style={{color: '#b8b8ff'}}>
                    {achievement.description}
                  </Text>
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
