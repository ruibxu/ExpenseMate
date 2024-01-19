import { View, Alert } from 'react-native';
import React from 'react'
import ListItem from '../components/ListItem';


const Settings = () => {

    const createAlert = () =>
    Alert.alert('Clear your data', 'This will clear all your expense data, and this is irreversible', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Confirm', onPress: () => console.log('OK Pressed')},
    ]);

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
