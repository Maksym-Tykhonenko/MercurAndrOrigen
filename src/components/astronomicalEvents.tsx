import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Title, Paragraph, Text} from 'react-native-paper';

const eventStyles = StyleSheet.create({
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
  eventContainer: {
    marginVertical: 10,
    borderLeftWidth: 2,
    borderLeftColor: '#6b6bff',
    paddingLeft: 15,
  },
  eventTitle: {
    color: '#e0e0ff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  eventDate: {
    color: '#b8b8ff',
    fontSize: 14,
    marginBottom: 5,
  },
  eventDescription: {
    color: '#d0d0ff',
    fontSize: 14,
  },
});

export const AstronomicalEvents = () => {
  const events = [
    {
      title: 'Perseids Meteor Shower',
      date: 'August 12-13, 2024',
      description: 'The most active meteor shower of the year',
    },
    {
      title: 'Solar Eclipse',
      date: 'April 8, 2024',
      description: 'Total solar eclipse',
    },
  ];

  return (
    <Card style={eventStyles.card}>
      <Card.Content>
        <Title style={eventStyles.title}>Upcoming Events</Title>
        {events.map((event, index) => (
          <View key={index} style={eventStyles.eventContainer}>
            <Text style={eventStyles.eventTitle}>{event.title}</Text>
            <Text style={eventStyles.eventDate}>{event.date}</Text>
            <Text style={eventStyles.eventDescription}>
              {event.description}
            </Text>
          </View>
        ))}
      </Card.Content>
    </Card>
  );
};
