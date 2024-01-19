import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import  Expenses  from './components/Expenses';
import  Reports  from './components/Reports';
import  Add  from './components/Add';
import  Settings  from './components/Settings';


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator>
        <Tab.Screen name="Expenses" component={Expenses} />
        <Tab.Screen name="Reports" component={Reports} />
        <Tab.Screen name="Add" component={Add} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    height: 50,
    width: "100%",
    backgroundColor: 'red',
  },
  graph: {
    height: 300,
    width: "100%",
    backgroundColor: 'blue',
  },
  input: {
    paddingBottom: 20,
    width: "100%",
    backgroundColor: 'green',
  }


});
