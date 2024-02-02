import { View, Alert } from 'react-native';
import React,{useContext} from 'react'
import ListItem from '../components/ListItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import { theme } from '../theme';

import { ExpensesContext } from '../context/ExpenseReportContext';

const Settings = ({ navigation }) => {

    const { setExpenses } = useContext(ExpensesContext);

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
          setExpenses([]);
          console.log('Local storage "expenses" cleared successfully.');
        } catch (error) {
          console.error('Error clearing local storage:', error);
        }
    };

    return (    
        <View
            style={{
                flexDirection: 'column',
                margin: 16,
                borderRadius: 20,
                overflow: 'hidden',
            }}>
            <ListItem 
                label="Categories"
                detail={
                  <AntDesign name="right" size={24} color= {theme.colors.text} style={{opacity: 0.5 }}/>
                }
                onPress={() => navigation.navigate('Categories')}
            />
            <ListItem 
                label="Clear your data"
                onPress={createAlert}
                isDestructive
            />

        </View>

    );
}

export default Settings;
