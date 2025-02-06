import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  Text,
  FAB,
  Portal,
  Modal,
  TextInput,
  IconButton,
  Card,
  Button,
  Chip,
} from 'react-native-paper';
import {Header} from '../components/header';
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1b2e',
  },
  content: {
    padding: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  photoCard: {
    width: width / 2 - 24,
    marginBottom: 16,
    backgroundColor: '#252642',
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardTitle: {
    color: '#e0e0ff',
    fontSize: 16,
    fontWeight: '600',
  },
  cardSubtitle: {
    color: '#88c0d0',
    fontSize: 12,
  },
  photo: {
    width: '100%',
    height: width / 2 - 24,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#88c0d0',
    borderRadius: 16,
  },
  modal: {
    backgroundColor: '#252642',
    margin: 20,
    borderRadius: 15,
    padding: 20,
    elevation: 5,
  },
  input: {
    backgroundColor: '#1a1b2e',
    marginVertical: 8,
    borderRadius: 8,
  },
  inputText: {
    color: '#ffffff',
  },
  inputLabel: {
    color: '#88c0d0',
    fontWeight: '500',
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 16,
    gap: 8,
  },
  detailModal: {
    backgroundColor: '#252642',
    margin: 20,
    borderRadius: 15,
    padding: 0,
    elevation: 5,
  },
  detailImage: {
    width: '100%',
    height: width - 40,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  detailContent: {
    padding: 20,
  },
  detailTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  detailDescription: {
    color: '#b8b8ff',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  chip: {
    margin: 4,
    backgroundColor: '#1a1b2e',
    borderRadius: 8,
  },
  chipText: {
    color: '#88c0d0',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    backgroundColor: '#1a1b2e',
    borderRadius: 12,
    marginVertical: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: '#88c0d0',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  statLabel: {
    color: '#e0e0ff',
    fontSize: 14,
  },
  filterChip: {
    margin: 4,
    backgroundColor: '#1a1b2e',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#88c0d0',
  },
  filterChipSelected: {
    backgroundColor: '#88c0d0',
  },
  filterChipText: {
    color: '#e0e0ff',
  },
  addButton: {
    backgroundColor: '#88c0d0',
    marginTop: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonLabel: {
    color: '#1a1b2e',
    fontSize: 16,
    fontWeight: '600',
  },
});

interface Photo {
  id: string;
  uri: string;
  title: string;
  description: string;
  location: string;
  date: string;
  category: string;
  likes: number;
  tags: string[];
}

export const PhotoAlbumScreen = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newPhoto, setNewPhoto] = useState({
    title: '',
    description: '',
    location: '',
    category: '',
    tags: '',
    uri: '',
  });

  const categories = [
    'all',
    'planets',
    'stars',
    'nebulae',
    'galaxies',
    'other',
  ];
  const STORAGE_KEY = '@photo_album';

  React.useEffect(() => {
    loadPhotosFromStorage();
  }, []);

  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });

    if (result.assets && result.assets[0].uri) {
      setNewPhoto({...newPhoto, uri: result.assets[0].uri});
      setModalVisible(true);
    }
  };

  const savePhotosToStorage = async (photos: Photo[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
    } catch (error) {
      console.error('Error saving photos to storage:', error);
    }
  };

  const loadPhotosFromStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonValue) {
        setPhotos(JSON.parse(jsonValue));
      }
    } catch (error) {
      console.error('Error loading photos from storage:', error);
    }
  };

  const addPhoto = () => {
    const photo: Photo = {
      id: Date.now().toString(),
      uri: newPhoto.uri,
      title: newPhoto.title,
      description: newPhoto.description,
      location: newPhoto.location,
      date: new Date().toISOString(),
      category: newPhoto.category,
      likes: 0,
      tags: newPhoto.tags.split(',').map(tag => tag.trim()),
    };

    const updatedPhotos = [photo, ...photos];
    setPhotos(updatedPhotos);
    savePhotosToStorage(updatedPhotos);
    setModalVisible(false);
    resetForm();
  };

  const resetForm = () => {
    setNewPhoto({
      title: '',
      description: '',
      location: '',
      category: '',
      tags: '',
      uri: '',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView style={styles.content}>
        <View style={styles.filterContainer}>
          {categories.map(category => (
            <Button
              key={category}
              mode={selectedCategory === category ? 'contained' : 'outlined'}
              style={[
                styles.filterChip,
                selectedCategory === category && styles.filterChipSelected,
              ]}
              labelStyle={styles.filterChipText}
              onPress={() => setSelectedCategory(category)}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </View>

        <View style={styles.gridContainer}>
          {photos
            .filter(
              photo =>
                selectedCategory === 'all' ||
                photo.category === selectedCategory,
            )
            .map(photo => (
              <TouchableOpacity
                key={photo.id}
                onPress={() => {
                  setSelectedPhoto(photo);
                  setDetailModalVisible(true);
                }}>
                <Card style={styles.photoCard}>
                  <Card.Cover source={{uri: photo.uri}} style={styles.photo} />
                  <Card.Title
                    title={photo.title}
                    subtitle={photo.date}
                    titleStyle={styles.cardTitle}
                    subtitleStyle={styles.cardSubtitle}
                  />
                </Card>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>

      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={styles.modal}>
          <TextInput
            label="Title"
            value={newPhoto.title}
            onChangeText={text => setNewPhoto({...newPhoto, title: text})}
            style={styles.input}
            theme={{
              colors: {
                primary: '#88c0d0',
                text: '#ffffff',
                placeholder: '#88c0d0',
              },
            }}
            textColor="#ffffff"
            outlineColor="#88c0d0"
            mode="outlined"
          />
          <TextInput
            label="Description"
            value={newPhoto.description}
            onChangeText={text => setNewPhoto({...newPhoto, description: text})}
            style={styles.input}
            theme={{
              colors: {
                primary: '#88c0d0',
                text: '#ffffff',
                placeholder: '#88c0d0',
              },
            }}
            textColor="#ffffff"
            outlineColor="#88c0d0"
            mode="outlined"
            multiline
          />
          <TextInput
            label="Location"
            value={newPhoto.location}
            onChangeText={text => setNewPhoto({...newPhoto, location: text})}
            style={styles.input}
            theme={{
              colors: {
                primary: '#88c0d0',
                text: '#ffffff',
                placeholder: '#88c0d0',
              },
            }}
            textColor="#ffffff"
            outlineColor="#88c0d0"
            mode="outlined"
          />
          <TextInput
            label="Category"
            value={newPhoto.category}
            onChangeText={text => setNewPhoto({...newPhoto, category: text})}
            style={styles.input}
            theme={{
              colors: {
                primary: '#88c0d0',
                text: '#ffffff',
                placeholder: '#88c0d0',
              },
            }}
            textColor="#ffffff"
            outlineColor="#88c0d0"
            mode="outlined"
          />
          <TextInput
            label="Tags (comma-separated)"
            value={newPhoto.tags}
            onChangeText={text => setNewPhoto({...newPhoto, tags: text})}
            style={styles.input}
            theme={{
              colors: {
                primary: '#88c0d0',
                text: '#ffffff',
                placeholder: '#88c0d0',
              },
            }}
            textColor="#ffffff"
            outlineColor="#88c0d0"
            mode="outlined"
          />
          <Button
            mode="contained"
            onPress={addPhoto}
            style={styles.addButton}
            labelStyle={styles.addButtonLabel}>
            Add Photo
          </Button>
        </Modal>

        <Modal
          visible={detailModalVisible}
          onDismiss={() => setDetailModalVisible(false)}
          contentContainerStyle={styles.detailModal}>
          {selectedPhoto && (
            <>
              <Image
                source={{uri: selectedPhoto.uri}}
                style={styles.detailImage}
              />
              <View style={styles.detailContent}>
                <Text style={styles.detailTitle}>{selectedPhoto.title}</Text>
                <Text style={styles.detailDescription}>
                  {selectedPhoto.description}
                </Text>
                <View style={styles.statsContainer}>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{selectedPhoto.likes}</Text>
                    <Text style={styles.statLabel}>Likes</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>
                      {selectedPhoto.location}
                    </Text>
                    <Text style={styles.statLabel}>Location</Text>
                  </View>
                </View>
                <View style={styles.filterContainer}>
                  {selectedPhoto.tags.map(tag => (
                    <Chip
                      key={tag}
                      style={styles.chip}
                      textStyle={styles.chipText}>
                      {tag}
                    </Chip>
                  ))}
                </View>
              </View>
            </>
          )}
        </Modal>
      </Portal>

      <FAB icon="camera" style={styles.fab} onPress={pickImage} />
    </SafeAreaView>
  );
};
