import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  Card,
  Icon,
  Button,
  TextInput,
  Modal,
  Portal,
  Avatar,
} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

interface UserProfile {
  name: string;
  email: string;
  age?: number;
  location?: string;
  interests?: string[];
  bio?: string;
  avatarUri?: string;
}

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
  inputContainer: {
    marginBottom: 12,
  },
});

interface UserProfile {
  name: string;
  email: string;
  age?: number;
  location?: string;
  interests?: string[];
  bio?: string;
  avatarUri?: string;
}

const defaultProfile: UserProfile = {
  name: '',
  email: '',
  age: undefined,
  location: '',
  interests: [],
  bio: '',
  avatarUri: '',
};

export const ProfileScreen: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: 'none',
    email: 'none',
  });
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [tempProfile, setTempProfile] = useState<UserProfile>({...profile});

  const navigation = useNavigation<any>();

  // Load profile on initialization
  useEffect(() => {
    loadProfile();
  }, []);

  // Save profile when it changes
  useEffect(() => {
    saveProfile();
  }, [profile]);

  // Load profile from AsyncStorage
  const loadProfile = async () => {
    try {
      const savedProfile = await AsyncStorage.getItem('userProfile');
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      }
    } catch (error) {
      console.error('Failed to load profile', error);
    }
  };

  // Save profile to AsyncStorage
  const saveProfile = async () => {
    try {
      await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
    } catch (error) {
      console.error('Failed to save profile', error);
    }
  };

  // Select avatar from gallery
  const pickAvatar = async () => {
    const result: any = await launchImageLibrary({
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 0.8,
    });

    if (result.assets && result.assets[0].uri) {
      setProfile(prev => ({
        ...prev,
        avatarUri: result.assets[0].uri,
      }));
    }
  };

  // Edit profile
  const handleEditProfile = () => {
    setTempProfile({...profile});
    setEditModalVisible(true);
  };

  // Save profile changes
  const saveProfileChanges = () => {
    setProfile(tempProfile);
    setEditModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContent}>
        <View style={styles.contentContainer}>
          {/* Profile */}
          <View style={styles.profileHeader}>
            <TouchableOpacity onPress={pickAvatar}>
              <Image
                source={
                  profile.avatarUri ? {uri: profile.avatarUri} : undefined
                }
                style={styles.profileImage}
              />
            </TouchableOpacity>
            <Text style={styles.profileName}>{profile.name}</Text>
            <Text style={styles.profileEmail}>{profile.email}</Text>
          </View>

          {/* Profile Cards */}
          <Card style={styles.profileCard} onPress={handleEditProfile}>
            <Card.Content style={styles.cardContent}>
              <Icon source="account-edit" size={24} color="#88c0d0" />
              <Text style={styles.cardTitle}>Edit Profile</Text>
            </Card.Content>
          </Card>

          <Card
            onPress={() => navigation.navigate('Achievements')}
            style={styles.profileCard}>
            <Card.Content style={styles.cardContent}>
              <Icon source="star" size={24} color="#88c0d0" />
              <Text style={styles.cardTitle}>Achievements</Text>
            </Card.Content>
          </Card>

          <Card
            onPress={() => navigation.navigate('Settings')}
            style={styles.profileCard}>
            <Card.Content style={styles.cardContent}>
              <Icon source="cog" size={24} color="#88c0d0" />
              <Text style={styles.cardTitle}>Settings</Text>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>

      <Portal>
        <Modal
          visible={editModalVisible}
          onDismiss={() => setEditModalVisible(false)}
          contentContainerStyle={styles.modalContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {[
              {label: 'Name', value: tempProfile.name, field: 'name'},
              {label: 'Email', value: tempProfile.email, field: 'email'},
              {
                label: 'Age',
                value: tempProfile.age?.toString(),
                field: 'age',
                keyboardType: 'numeric',
              },
              {
                label: 'Location',
                value: tempProfile.location,
                field: 'location',
              },
              {
                label: 'Interests (comma-separated)',
                value: tempProfile.interests?.join(', '),
                field: 'interests',
              },
              {
                label: 'Bio',
                value: tempProfile.bio,
                field: 'bio',
                multiline: true,
              },
            ].map(({label, value, field, keyboardType, multiline}) => (
              <View key={field} style={styles.inputContainer}>
                <TextInput
                  label={label}
                  value={value || ''}
                  onChangeText={text =>
                    setTempProfile(prev => ({
                      ...prev,
                      [field]:
                        field === 'age'
                          ? text
                            ? parseInt(text)
                            : undefined
                          : field === 'interests'
                          ? text
                              .split(',')
                              .map(i => i.trim())
                              .filter(i => i)
                          : text,
                    }))
                  }
                  style={[styles.input, multiline && {height: 100}]}
                  contentStyle={{color: '#ffffff'}}
                  theme={{
                    colors: {
                      primary: '#88c0d0',
                      text: '#ffffff',
                      placeholder: '#88c0d0',
                      background: '#1a1b2e',
                      onSurfaceVariant: '#e0e0ff',
                    },
                  }}
                  mode="outlined"
                  outlineColor="#88c0d0"
                  activeOutlineColor="#88c0d0"
                  multiline={multiline}
                />
              </View>
            ))}
            <View style={styles.modalButtons}>
              <Button
                mode="contained"
                onPress={() => {
                  setEditModalVisible(false);
                  setTempProfile({...defaultProfile});
                }}
                style={{backgroundColor: '#4c566a'}}>
                Cancel
              </Button>
              <Button
                mode="contained"
                onPress={saveProfileChanges}
                style={{backgroundColor: '#88c0d0'}}>
                Save
              </Button>
            </View>
          </ScrollView>
        </Modal>
      </Portal>
    </SafeAreaView>
  );
};
