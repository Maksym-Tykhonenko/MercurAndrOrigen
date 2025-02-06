import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Card, Title, Paragraph, Text} from 'react-native-paper';

const inspirationStyles = StyleSheet.create({
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
  title: {
    color: '#e0e0ff',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 15,
  },
  quote: {
    color: '#d0d0ff',
    fontSize: 16,
    fontStyle: 'italic',
    lineHeight: 24,
    textAlign: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});

export const DailyInspiration = () => {
  const inspirations = [
    'The universe is as boundless as your possibilities',
    'Each star reminds us of the magnificence of the cosmos',
    'Look up and dream of the impossible',
  ];

  const [quote, setQuote] = useState(inspirations[0]);

  useEffect(() => {
    const index = Math.floor(Math.random() * inspirations.length);
    setQuote(inspirations[index]);
  }, []);

  return (
    <Card style={inspirationStyles.card}>
      <Card.Content>
        <Title style={inspirationStyles.title}>
          Cosmic Inspiration of the Day
        </Title>
        <Text style={inspirationStyles.quote}>{quote}</Text>
      </Card.Content>
    </Card>
  );
};
