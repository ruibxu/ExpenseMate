import React, { useState } from 'react';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
  TouchableOpacity,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { theme } from '../theme';
import { TabBarIcon } from '../components/TabBarIcon';

const Add = () => {

    const [amount, setAmount] = useState(""); // amount state
    const [date, setDate] = useState(new Date()); // date state
    const [dateShow, setDateShow] = useState(false); // date show state
    const [category, setCategory] = useState('undefined'); // category state

    // handle add expense button press
    const HandleButtonPress = async () => {
        try {

            if (amount <= 0) {
                // Show an alert if the amount is 0
                Alert.alert('Alert', 'Amount should be greater than 0');
                return; // Exit the function without saving data
            }
            if (!amount) {
                // Show an alert if the amount is empty
                Alert.alert('Alert', 'Please enter an amount');
                return; // Exit the function without saving data
            }
            if (isNaN(amount)) {
                // Show an alert if the amount is not a number
                Alert.alert('Alert', 'Please enter a valid amount');
                return; // Exit the function without saving data
            }

            const expenseData = {
              amount: parseInt(amount),
              date: date.toLocaleDateString(), // Save date as a string
              category,
            };
            // Retrieve existing data or initialize an empty array
            const existingData = JSON.parse(await AsyncStorage.getItem('expenses')) || [];
            // Add new expense data to the array
            existingData.push(expenseData);
            // Save the updated array back to local storage
            await AsyncStorage.setItem('expenses', JSON.stringify(existingData));
            console.log('Expense data saved:', expenseData);
          } catch (error) {
            console.error('Error saving expense data:', error);
          }
    }

    // only for debugging, this will console log the stored data
    const debugButtonPress = async () => {
        try {
            const storedData = await AsyncStorage.getItem('expenses');
            console.log('Stored Data:', storedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // handle open date picker
    const showDatepicker = () => {
        if (Platform.OS === 'android') {
            setDateShow(true);
        }        
    };

    // handle Date change
    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        if (Platform.OS === 'android') {
            setDateShow(false);
        }
        setDate(currentDate);

    }

    const handleCategoryChange = (selectedCategory) => {
        setCategory(selectedCategory);
        console.log(selectedCategory);
    };
    
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView style={styles.container}>
            
                <View style={styles.inner}>

                    <TextInput 
                        placeholder="Amount" 
                        style={styles.textInput}
                        value={amount}
                        onChangeText={text => setAmount(text)} 
                    />
                    
                    <View style={styles.date}>

                    <Text>Date:</Text>

                    {Platform.OS === 'android' && 
                    <TouchableOpacity 
                    
                    onPress={showDatepicker}>
                
                    <Text style={styles.dateText}>{date.toDateString()}</Text>        
                    
                    </TouchableOpacity>
                    }

                    {(dateShow || Platform.OS === 'ios') && 
                    (<DateTimePicker
                        value={date}
                        mode="date"
                        display="calendar"
                        onChange={handleDateChange}
                    />)
                    }
                    </View>


                    <View style={styles.category}>
                        <Text style={styles.label}>Category:</Text>
                        <Picker
                            selectedValue={category}
                            style={{ height: 120, width: 200 }}
                            itemStyle={{ height: 120 }}
                            onValueChange={handleCategoryChange}
                            >
                            <Picker.Item style={styles.pickerItem} label="undefined" value="undefined" />
                            <Picker.Item style={styles.pickerItem} label="Category 1" value="Category 1" />
                            <Picker.Item style={styles.pickerItem} label="Category 2" value="Category 2" />
                        </Picker>
                    </View>

                    <TouchableOpacity style={styles.btnContainer}>
                        <Button title="Add Expense" color="black" onPress={HandleButtonPress}/>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.btnContainer}>
                        <Button title="Print Expense" color="black" onPress={debugButtonPress}/>
                    </TouchableOpacity>

                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: 16,
    },
    inner: {
        display: 'flex',
        flexDirection: 'column',
    },
    date: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    dateText: {
        color: '#007AFF',
    },
    category: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    pickerItem:{
        fontSize: 16,
    },
    textInput: {
      height: 40,
      borderColor: 'gray',
      borderBottomWidth: 1,
      marginBottom: 36,
    },
    btnContainer: {
        backgroundColor: 'white',
        color: 'black',
        marginTop: 12,
    },
  });

  
export default Add;