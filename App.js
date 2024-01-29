import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView} from 'react-native';
import { NavigationContainer ,} from '@react-navigation/native';
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
import Home from './screens/Home';

import { CategoryProvider } from './context/CategoryContext';


//create a stack navigator
const Stack = createStackNavigator();

export default function App() {


  return (
    // react navigation container
    <CategoryProvider>
      <NavigationContainer theme={theme}>
        <StatusBar style="auto" />
        <Stack.Navigator
          screenOptions={({route}) => ({
            headerStyle: {
              backgroundColor: theme.colors.card,
            },
            headerTitleAlign: 'center',
          })}
        >
          <Stack.Screen 
            name="Home" 
            component={Home}  
            options={{ 
              headerShown: false,
            }}
          />
          <Stack.Screen name="Categories" component={Categories} />
        </Stack.Navigator>
      </NavigationContainer>
    </CategoryProvider>
  );
}

