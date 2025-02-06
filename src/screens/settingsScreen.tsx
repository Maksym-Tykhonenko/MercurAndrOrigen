import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  Button,
  Card,
  Icon,
  Modal,
  Portal,
  Switch,
  Text,
} from 'react-native-paper';
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
    justifyContent: 'space-between',
    padding: 15,
  },
  cardTitle: {
    color: '#e0e0ff',
    fontSize: 18,
    marginLeft: 15,
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
  clearButton: {
    backgroundColor: '#ff4757',
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  clearButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmModal: {
    backgroundColor: '#252642',
    margin: 20,
    borderRadius: 15,
    padding: 20,
  },
  modalTitle: {
    color: '#e0e0ff',
    fontSize: 20,
    marginBottom: 15,
  },
  modalMessage: {
    color: '#b8b8ff',
    fontSize: 16,
    marginBottom: 20,
  },
});

export const SettingsScreen: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const navigation = useNavigation<any>();

  const handleClearProfile = async () => {
    setShowConfirmModal(false);
    await AsyncStorage.clear();
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.contentContainer}>
          <Text style={[styles.profileName, {textAlign: 'center'}]}>
            Settings
          </Text>

          <Card style={styles.profileCard}>
            <Card.Content style={styles.cardContent}>
              <Icon source="bell" size={24} color="#88c0d0" />
              <Text style={styles.cardTitle}>Notifications</Text>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                color="#88c0d0"
              />
            </Card.Content>
          </Card>

          <Card style={styles.profileCard}>
            <Card.Content style={styles.cardContent}>
              <Icon source="theme-light-dark" size={24} color="#88c0d0" />
              <Text style={styles.cardTitle}>Dark Theme</Text>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                color="#88c0d0"
              />
            </Card.Content>
          </Card>

          <Button
            mode="contained"
            style={styles.clearButton}
            onPress={() => setShowConfirmModal(true)}>
            Clear Profile
          </Button>
        </View>
      </ScrollView>

      <Portal>
        <Modal
          style={{backgroundColor: 'rgba(0,0,0,0.2)'}}
          visible={showConfirmModal}
          onDismiss={() => setShowConfirmModal(false)}
          contentContainerStyle={styles.confirmModal}>
          <Text style={styles.modalTitle}>Clear Profile</Text>
          <Text style={styles.modalMessage}>
            Are you sure you want to clear your profile? This action cannot be
            undone.
          </Text>
          <View style={styles.modalButtons}>
            <Button
              mode="outlined"
              onPress={() => setShowConfirmModal(false)}
              textColor="#88c0d0">
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={handleClearProfile}
              buttonColor="#ff4757">
              Clear
            </Button>
          </View>
        </Modal>
      </Portal>
    </SafeAreaView>
  );
};
