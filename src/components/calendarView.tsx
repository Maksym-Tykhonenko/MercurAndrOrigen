import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Calendar, DateData} from 'react-native-calendars';
import {Modal, Portal, Text, Card, IconButton} from 'react-native-paper';

export interface AstronomicalEvent {
  title: string;
  description: string;
  type?: 'meteor-shower' | 'solar-eclipse' | 'lunar-eclipse' | 'other';
  additionalDetails?: string;
}

export type AstronomicalEventMap = {
  [date: string]: AstronomicalEvent;
};

const ASTRONOMICAL_EVENTS: AstronomicalEventMap = {
  '2024-01-03': {
    title: 'Quadrantids Meteor Shower',
    description: 'Active meteor shower with up to 40 meteors per hour',
    type: 'meteor-shower',
  },
  '2024-04-08': {
    title: 'Total Solar Eclipse',
    description: 'Visible across North America',
    type: 'solar-eclipse',
  },
  '2024-08-12': {
    title: 'Perseids Meteor Shower',
    description: 'Most active meteor shower of the year',
    type: 'meteor-shower',
  },
  '2024-10-14': {
    title: 'Annular Solar Eclipse',
    description: 'Ring of fire eclipse',
    type: 'solar-eclipse',
  },
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  calendarContainer: {
    backgroundColor: '#252642',
    borderRadius: 15,
    padding: 10,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  modalContainer: {
    backgroundColor: '#252642',
    margin: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },
  modalCard: {
    backgroundColor: '#252642',
  },
  modalHeader: {
    backgroundColor: '#2d2d4f',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    color: '#e0e0ff',
    fontSize: 18,
    fontWeight: '600',
  },
  modalContent: {
    padding: 20,
  },
  eventTitle: {
    color: '#e0e0ff',
    fontWeight: 'bold',
    marginBottom: 12,
    fontSize: 20,
  },
  eventDescription: {
    color: '#b8b8ff',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  eventType: {
    color: '#6b6bff',
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  noEventText: {
    color: '#b8b8ff',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
});

export const CalendarView: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);
    setModalVisible(true);
  };

  const renderMarkedDates = () => {
    const markedDates: {[date: string]: any} = {};
    Object.keys(ASTRONOMICAL_EVENTS).forEach(date => {
      const event = ASTRONOMICAL_EVENTS[date];
      let dotColor = '#b8b8ff'; // default color

      switch (event.type) {
        case 'meteor-shower':
          dotColor = '#88c0d0';
          break;
        case 'solar-eclipse':
          dotColor = '#ebcb8b';
          break;
        case 'lunar-eclipse':
          dotColor = '#b48ead';
          break;
      }

      markedDates[date] = {
        marked: true,
        dotColor,
        selected: date === selectedDate,
        selectedColor: '#4c566a',
      };
    });
    return markedDates;
  };

  const getEventForDate = (date: string | null): any | undefined => {
    return date ? ASTRONOMICAL_EVENTS[date] : undefined;
  };

  const renderEventDetails = () => {
    const event = getEventForDate(selectedDate);
    if (!event) {
      return (
        <Text style={styles.noEventText}>
          No astronomical events on this date
        </Text>
      );
    }
    return (
      <>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <Text style={styles.eventDescription}>{event.description}</Text>
        {event.type && (
          <Text style={styles.eventType}>{event.type.replace('-', ' ')}</Text>
        )}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <Calendar
          markedDates={renderMarkedDates()}
          onDayPress={handleDayPress}
          theme={{
            calendarBackground: '#252642',
            textSectionTitleColor: '#e0e0ff',
            selectedDayBackgroundColor: '#4c566a',
            selectedDayTextColor: '#e0e0ff',
            todayTextColor: '#88c0d0',
            dayTextColor: '#e0e0ff',
            textDisabledColor: '#4c566a',
            dotColor: '#88c0d0',
            monthTextColor: '#e0e0ff',
            textMonthFontWeight: 'bold',
            arrowColor: '#88c0d0',
            indicatorColor: '#88c0d0',
          }}
        />
      </View>

      <Portal>
        <Modal
          style={{backgroundColor: 'rgba(0,0,0,0.2)'}}
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {selectedDate
                ? new Date(selectedDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : ''}
            </Text>
            <IconButton
              icon="close"
              iconColor="#e0e0ff"
              size={20}
              onPress={() => setModalVisible(false)}
            />
          </View>
          <View style={styles.modalContent}>{renderEventDetails()}</View>
        </Modal>
      </Portal>
    </View>
  );
};
