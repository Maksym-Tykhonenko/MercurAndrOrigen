import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Icon, Text} from 'react-native-paper';

const headerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#1a1b2e',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2d2d4f',
    marginRight: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  icon: {
    color: '#b8b8ff',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#e0e0ff',
    letterSpacing: 0.5,
  },
  statusBar: {
    backgroundColor: '#1a1b2e',
  },
});

export const Header = () => {
  return (
    <View style={headerStyles.container}>
      <View style={headerStyles.iconContainer}>
        <Icon source={'star-shooting'} size={24} color="#b8b8ff" />
      </View>
      <Text style={headerStyles.title}>Mercur</Text>
    </View>
  );
};
