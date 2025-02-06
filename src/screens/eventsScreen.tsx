import React, {useState} from 'react';
import {SafeAreaView, View, ScrollView, StyleSheet, Alert} from 'react-native';
import {
  Text,
  Card,
  Button,
  IconButton,
  FAB,
  Portal,
  Modal,
  TextInput,
  Snackbar,
} from 'react-native-paper';
import {Header} from '../components/header';
import {MoonPhase} from '../components/moonPhase';
import {CalendarView} from '../components/calendarView';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1b2e',
  },
  content: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  eventCard: {
    backgroundColor: '#252642',
    marginVertical: 10,
    borderRadius: 15,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#88c0d0',
  },
  modal: {
    backgroundColor: '#252642',
    margin: 20,
    borderRadius: 15,
    padding: 20,
  },
  input: {
    backgroundColor: '#2d2d4f',
    marginVertical: 8,
    height: 60,
  },
  filterChip: {
    margin: 4,
    backgroundColor: '#2d2d4f',
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  modalTitle: {
    color: '#e0e0ff',
    fontSize: 20,
    marginBottom: 15,
  },
  eventsList: {
    marginTop: 20,
  },
  eventItem: {
    backgroundColor: '#252642',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  eventTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventDate: {
    color: '#88c0d0',
    marginTop: 5,
  },
  eventNotes: {
    color: '#e0e0ff',
    marginTop: 5,
  },
});

export const EventsScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [customEvent, setCustomEvent] = useState({
    title: '',
    date: '',
    notes: '',
  });
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [events, setEvents] = useState<any>([]);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const addCustomEvent = () => {
    if (!customEvent.title || !customEvent.date) {
      Alert.alert('Please fill in title and date');
      return;
    }

    setEvents([...events, {...customEvent, type: 'custom'}]);
    setModalVisible(false);
    setCustomEvent({title: '', date: '', notes: ''});
    setSnackbarVisible(true);
  };

  const inputTheme = {
    colors: {
      text: '#ffffff',
      primary: '#88c0d0',
      placeholder: '#b8b8ff',
      background: '#2d2d4f',
      onSurfaceVariant: '#e0e0ff',
    },
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView>
        <View style={styles.content}>
          <MoonPhase />
          <View style={styles.filterContainer}>
            {['all', 'lunar', 'meteor', 'custom'].map(filter => (
              <Button
                key={filter}
                mode={selectedFilter === filter ? 'contained' : 'outlined'}
                style={styles.filterChip}
                onPress={() => setSelectedFilter(filter)}>
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Button>
            ))}
          </View>

          <CalendarView />

          <View style={styles.eventsList}>
            {events
              .filter(
                (event: any) =>
                  selectedFilter === 'all' || event.type === selectedFilter,
              )
              .map((event: any, index: any) => (
                <Card key={index} style={styles.eventItem}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventDate}>{event.date}</Text>
                  {event.notes && (
                    <Text style={styles.eventNotes}>{event.notes}</Text>
                  )}
                </Card>
              ))}
          </View>
        </View>
      </ScrollView>

      <Portal>
        <Modal
          style={{backgroundColor: 'rgba(0,0,0,0.2)'}}
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={styles.modal}>
          <Text style={styles.modalTitle}>Add Custom Event</Text>
          <TextInput
            label="Event Title"
            value={customEvent.title}
            onChangeText={text => setCustomEvent({...customEvent, title: text})}
            style={styles.input}
            theme={inputTheme}
            mode="flat"
            textColor="#ffffff"
          />
          <TextInput
            label="Date"
            value={customEvent.date}
            onChangeText={text => setCustomEvent({...customEvent, date: text})}
            style={styles.input}
            theme={inputTheme}
            mode="flat"
            textColor="#ffffff"
          />
          <TextInput
            label="Notes"
            value={customEvent.notes}
            onChangeText={text => setCustomEvent({...customEvent, notes: text})}
            style={[styles.input, {height: 100}]}
            theme={inputTheme}
            mode="flat"
            textColor="#ffffff"
            multiline
          />
          <Button
            mode="contained"
            onPress={addCustomEvent}
            style={{marginTop: 15}}
            buttonColor="#88c0d0">
            Add Event
          </Button>
        </Modal>
      </Portal>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={{backgroundColor: '#2d2d4f'}}
        action={{
          label: 'OK',
          onPress: () => setSnackbarVisible(false),
        }}>
        Event added successfully
      </Snackbar>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      />
    </SafeAreaView>
  );
};
