import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon, PaperProvider} from 'react-native-paper';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';

// Імпорт екранів
import {Home} from './src/screens/home';
import {EventsScreen} from './src/screens/eventsScreen';
import {SurveysScreen} from './src/screens/surveysScreen';
import {AchievementsScreen} from './src/screens/achievementsScreen';
import {SettingsScreen} from './src/screens/settingsScreen';
import {ProfileScreen} from './src/screens/profile';
import {PhotoAlbumScreen} from './src/screens/photoAlbumScreen';

const ProfileStack = createNativeStackNavigator<any>();
const Tab = createBottomTabNavigator<any>();

// Navigator для профілю
const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1b2e',
        },
        headerTintColor: '#e0e0ff',
        headerTitleStyle: {
          color: '#e0e0ff',
        },
      }}>
      <ProfileStack.Screen
        options={{headerShown: false}}
        name="TabNavigation"
        component={TabNavigation}
      />
      <ProfileStack.Screen name="Achievements" component={AchievementsScreen} />
      <ProfileStack.Screen name="Settings" component={SettingsScreen} />
    </ProfileStack.Navigator>
  );
};

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#b8b8ff',
        tabBarInactiveTintColor: '#6b6b8f',
        tabBarStyle: tabBarStyles.tabBar,
        tabBarLabelStyle: tabBarStyles.tabLabel,
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({color}) => (
            <Icon source="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Events"
        component={EventsScreen}
        options={{
          tabBarLabel: 'Events',
          tabBarIcon: ({color}) => (
            <Icon source="calendar" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Album"
        component={PhotoAlbumScreen}
        options={{
          tabBarLabel: 'Album',
          tabBarIcon: ({color}) => (
            <Icon source="camera" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Surveys"
        component={SurveysScreen}
        options={{
          tabBarLabel: 'Surveys',
          tabBarIcon: ({color}) => (
            <Icon source="clipboard-text" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileMain"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <Icon source="face-man-profile" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Стилі для таб-бару
const tabBarStyles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#252642',
    borderTopWidth: 0,
    elevation: 8,
    height: 60,
    paddingBottom: 8,
    paddingTop: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
});

// Основний додаток з навігацією
export const App = () => {
  const theme = {
    colors: {
      primary: '#b8b8ff',
      background: '#1a1b2e',
      surface: '#252642',
      text: '#e0e0ff',
      placeholder: '#6b6b8f',
    },
  };

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <ProfileNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
};
