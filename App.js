import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import  Expenses  from './screens/Expenses';
import  Reports  from './screens/Reports';
import  Add  from './screens/Add';
import  Settings  from './screens/Settings';

import { theme } from './theme';
import { TabBarIcon } from './components/TabBarIcon';

// create bottom tab navigator
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    // react navigation container
    <NavigationContainer theme={theme}>
      <StatusBar style="auto" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: {
            backgroundColor: theme.colors.card,
            borderTopWidth: 0,
          },
          headerStyle: {
            backgroundColor: theme.colors.card,
          },
        })}
      >
        <Tab.Screen 
          options={
            {
              tabBarIcon: () => <TabBarIcon name="Expenses" />,
            }
          } 
          name="Expenses" 
          component={Expenses} 
        />
        <Tab.Screen 
          options={
            {
              tabBarIcon: () => <TabBarIcon name="Reports" />,
            }
          }
          name="Reports" 
          component={Reports} 
        />

        <Tab.Screen 
          options={
            {
              tabBarIcon: () => <TabBarIcon name="Add" />,
            }
          }
          name="Add" 
          component={Add} 
        />

        <Tab.Screen 
          options={
            {
              tabBarIcon: () => <TabBarIcon name="Settings" />,
            }
          }
          name="Settings" 
          component={Settings} 
        />


      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

});
