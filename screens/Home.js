import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import Expenses  from './Expenses';
import Reports  from './Reports';
import Add  from './Add';
import Settings  from './Settings';

import { theme } from '../theme';
import { TabBarIcon } from '../components/TabBarIcon';


const Tab = createBottomTabNavigator();

const Home = () => {
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: {
            backgroundColor: theme.colors.card,
            borderTopWidth: 0,
          },
          headerStyle: {
            backgroundColor: theme.colors.card,
          },
          tabBarActiveTintColor: theme.colors.activeText,
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
          name="Settings" 
          component={Settings}
        />

      </Tab.Navigator>
    )
}

export default Home;