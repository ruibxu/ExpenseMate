import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import  Expenses  from './screens/Expenses';
import  Reports  from './screens/Reports';
import  Add  from './screens/Add';
import  Settings  from './screens/Settings';
import Categories  from './screens/Categories';

import { theme } from './theme';
import { TabBarIcon } from './components/TabBarIcon';

// create bottom tab navigator
const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
    screenOptions={() => ({
      headerStyle: {
        backgroundColor: theme.colors.card,
      },
      headerTitleAlign: 'center',
    })}>
      <Stack.Screen name="Settings" component={Settings}  />
      <Stack.Screen name="Categories" component={Categories} />
    </Stack.Navigator>
  );
}

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
          headerTitleAlign: 'center',
          tabBarIcon: () => <TabBarIcon name={route.name} />, 

        })}
      >
        <Tab.Screen 
          name="Expenses" 
          component={Expenses} 
        />
        <Tab.Screen 
          name="Reports" 
          component={Reports} 
        />

        <Tab.Screen 
          name="Add" 
          component={Add} 
        />

        <Tab.Screen 
          name="Settings2" 
          component={MyStack}
          options={{ headerShown: false, tabBarLabel: 'Settings' }}
        />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

