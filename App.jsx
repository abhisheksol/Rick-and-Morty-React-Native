import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Import your screens
import HomePage from './src/screens/HomePage';
import CharacterCard from './src/components/CharacterCard';
import All_Char from './src/components/All_Char';
import CharacterListingPage from './src/screens/CharacterListingPage';
import CharacterDetailPage from './src/screens/CharacterDetailPage';

// Create navigators
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Stack Navigator
const StackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: 'green' }, // Change background color to green
    }}
  >
    <Stack.Screen name="HomePage" component={HomePage} />
    <Stack.Screen name="CharacterCard" component={CharacterCard} />
    <Stack.Screen name="All_Char" component={All_Char} />
    <Stack.Screen name="Character Detail" component={CharacterDetailPage} />
  </Stack.Navigator>
);

// Drawer Navigator
const DrawerNavigator = () => (
  <Drawer.Navigator
    screenOptions={{
      drawerStyle: {
        backgroundColor: 'yellow', // Background color of the drawer
      },
      drawerContentStyle: {
        backgroundColor: 'yellow', // Background color of drawer content
      },
      drawerLabelStyle: {
        color: 'purple', // Color of drawer item labels
        fontSize: 16,
      },
      drawerActiveTintColor: 'red', // Color of active drawer item label
      drawerInactiveTintColor: 'black', // Color of inactive drawer item label
    }}
  >
    <Drawer.Screen name="Home" component={StackNavigator} />
    <Drawer.Screen name="Character List" component={CharacterListingPage} />
    {/* <Drawer.Screen name="Character Detail" component={CharacterDetailPage} /> */}
    {/* Add other drawer screens if needed */}
  </Drawer.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
