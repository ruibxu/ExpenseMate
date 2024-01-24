import { View, Alert } from 'react-native';
import React from 'react'
import ListItem from '../components/ListItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = () => {

    const createAlert = () =>
    Alert.alert('Clear your data', 'This will clear all your expense data, and this is irreversible', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Confirm', onPress: () => handleClearLocalStorage()},
    ]);

    const handleClearLocalStorage = async () => {
        try {
          await AsyncStorage.removeItem('expenses');
          console.log('Local storage "expenses" cleared successfully.');
        } catch (error) {
          console.error('Error clearing local storage:', error);
        }
    };

    return (    
        <View
            style={{
                flexDirection: 'column',
                marginBottom: 16,
            }}>

            <ListItem 
                title="Clear Data" 
                onPress={() => createAlert()} 
                titleStyle={{ color: 'red' }} 
            />

        </View>

    );
}

export default Settings;
