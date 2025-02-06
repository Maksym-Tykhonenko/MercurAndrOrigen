import {StyleSheet} from 'react-native';
import {Card, Text, Title} from 'react-native-paper';

const moonPhaseStyles = StyleSheet.create({
  card: {
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
  content: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: '#e0e0ff',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 15,
  },
  moonEmoji: {
    fontSize: 80,
    marginVertical: 10,
  },
});

export const MoonPhase = () => {
  const phases = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'];
  const currentPhaseIndex = Math.floor((new Date().getDate() / 29.5) * 8) % 8;

  return (
    <Card style={moonPhaseStyles.card}>
      <Card.Content style={moonPhaseStyles.content}>
        <Title style={moonPhaseStyles.title}>Moon Phase</Title>
        <Text style={moonPhaseStyles.moonEmoji}>
          {phases[currentPhaseIndex]}
        </Text>
      </Card.Content>
    </Card>
  );
};
