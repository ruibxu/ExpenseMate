import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import  Expenses  from './screens/Expenses';
import  Reports  from './screens/Reports';
import  Add  from './screens/Add';
import  Settings  from './screens/Settings';

// create bottom tab navigator
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    // react navigation container
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

});
