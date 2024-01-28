import React, { useState, useEffect, useContext} from 'react';
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
  useColorScheme,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

import { theme } from '../theme';
import uuid from 'react-native-uuid';
import { eventEmitter } from './Categories';


// sample date modal for a expense
// {
//     _id: '1',
//     amount: 100,
//     date: '2021-05-20',
//     category: {
//       _id: '1',
//       label: 'Food',
//       color: '#ff0000',
//     },
//
// }
//

const Add = () => {

    const [amount, setAmount] = useState(""); // amount state
    const [date, setDate] = useState(new Date()); // date state
    const [dateShow, setDateShow] = useState(false); // date show state
    const [selectedCategoryId, setSelectedCategoryId] = useState(''); // category state
    const [categories, setCategories] = useState([]); // category state



    useEffect(() => {
        const getCategories = async () => {
            try {
                const existingCategories = JSON.parse(await AsyncStorage.getItem('categories')) || [];
                setCategories(existingCategories);
                setSelectedCategoryId(existingCategories[0]._id);
            } catch (error) {
                console.error('Error retrieving categories:', error);
            }
        };
        getCategories();
    }, []);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const existingCategories = JSON.parse(await AsyncStorage.getItem('categories')) || [];
                setCategories(existingCategories);
                setSelectedCategoryId(existingCategories[0]._id);
            } catch (error) {
                console.error('Error retrieving categories:', error);
            }
        };
    
        eventEmitter.on('categoriesUpdated', getCategories);

        // Don't forget to unsubscribe when the component unmounts
        return () => {
          eventEmitter.off('categoriesUpdated', getCategories);
        };

    }, []);

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

            const selectedCategory = categories.find((category) => category._id === selectedCategoryId);


            const expenseData = {
              _id: uuid.v4(),
              amount: parseInt(amount),
              date: date.toLocaleDateString(), // Save date as a string
              category: selectedCategory,
            };
            // Retrieve existing data or initialize an empty array
            const existingData = JSON.parse(await AsyncStorage.getItem('expenses')) || [];
            // Add new expense data to the array
            existingData.push(expenseData);
            // Save the updated array back to local storage
            await AsyncStorage.setItem('expenses', JSON.stringify(existingData));
            console.log('Expense data saved:', expenseData);

            setAmount(''); // Clear the amount field
            setDate(new Date()); // Reset the date field
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
    
    
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView style={styles.container}>
            
                <View style={styles.inner}>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        <View>
                            <Text
                                style={{
                                    fontSize: 20,
                                    marginBottom: 5,
                                    color: theme.colors.text,
                                }}
                            >Amount:</Text>
                            <TextInput 
                                placeholder="Amount" 
                                style={{
                                    color: theme.colors.text,
                                    borderColor: theme.colors.border,
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    marginBottom: 12,
                                    padding: 10,
                                    width: 150,
                                    height: 50,
                                    fontSize: 16,
                                    backgroundColor: theme.colors.card,
                                }}
                                value={amount}
                                onChangeText={text => setAmount(text)} 
                                keyboardType="numeric"
                                placeholderTextColor={theme.colors.placeholder}
                            />
                        </View>
                        
                        <View style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}>

                        
                            <Text
                                style={{
                                    fontSize: 20,
                                    marginBottom: 5,
                                    color: theme.colors.text,
                                }}
                            >
                                Date:
                            </Text>

                            <View>
                            {Platform.OS === 'ios' ? (
                                <View
                                  style={{
                                    marginBottom: 12,
                                    padding: 10,
                                    width: 150,
                                    height: 50,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    display: 'flex',
                                    transform: [{ scaleX: 1.0 }, { scaleY: 1.0 }],
                                  }}
                                    
                                >
                                    <DateTimePicker
                                    value={date}
                                    mode="date"
                                    display="calendar"
                                    onChange={handleDateChange}
                                    />
                                </View>
                            ) : (
                                <>
                                    <TouchableOpacity
                                        onPress={showDatepicker}
                                        style={{
                                        borderColor: theme.colors.border,
                                        borderWidth: 1,
                                        borderRadius: 10,
                                        marginBottom: 12,
                                        padding: 10,
                                        width: 150,
                                        height: 50,
                                        backgroundColor: theme.colors.card,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        }}
                                    >
                                        <Text style={{ fontSize: 16, color: theme.colors.primary }}>
                                        {date.toDateString()}
                                        </Text>
                                    </TouchableOpacity>
                                    {dateShow && (
                                        <DateTimePicker
                                        value={date}
                                        mode="date"
                                        display="calendar"
                                        onChange={handleDateChange}
                                        />
                                    )}
                                </>
                            )}
                            </View>
                        </View>
                    </View>

                    <View 
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Text 
                            style={{
                                fontSize: 20,
                                marginBottom: 5,
                                color: theme.colors.text,
                            }}
                        >Category:</Text>

                        {
                            Platform.OS === 'ios' ? (
                        
                            <Picker
                                style={{    
                                    height: 150,
                                    width: '100%',
                                    backgroundColor: theme.colors.card,
                                    borderRadius: 10,
                                    borderColor: theme.colors.border,
                                    borderWidth: 1,
                                    marginBottom: 20,
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                                selectedValue={selectedCategoryId}
                                
                                itemStyle={{ 
                                    height: 150,
                                    color: theme.colors.text,
                                }}
                                onValueChange={
                                    (itemValue, itemIndex) => {
                                        console.log(itemValue);
                                        setSelectedCategoryId(itemValue)
                                    }
                                }
                                >
                                {categories.map((category) => (
                                    <Picker.Item 
                                        key={category._id}
                                        style={{
                                            fontSize: 16,
                                            color: theme.colors.text,
                                        }} 
                                        label={category.label} 
                                        value={category._id} 
                                    />
                                ))}   
                            </Picker>
                            ) : (
                                <View
                                  style={{
                                  }}
                                >
                                    <Picker
                                    style={{    
                                        height: 50,
                                        width: '100%',
                                        backgroundColor: theme.colors.card,
                                        marginBottom: 20,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        colorBackgroundFloating: theme.colors.card,
                                        minHeight: 30,   
                                    }}
                                    dropdownIconColor= {theme.colors.text}

                                    mode='dropdown'
                                    dropdownIconRippleColor= {theme.colors.modal}
                                    
                                    selectedValue={selectedCategoryId}
                                    itemStyle={{ 
                                        height: 50,
                                        color: theme.colors.text,
                                    }}
                                    onValueChange={
                                        (itemValue, itemIndex) => {
                                            console.log(itemValue);
                                            setSelectedCategoryId(itemValue)
                                        }
                                    }
                                    >
                                    {categories.map((category) => (
                                        <Picker.Item 
                                            key={category._id}
                                            style={{
                                                fontSize: 16,
                                                color: theme.colors.text,
                                                backgroundColor: theme.colors.card,
                                            }} 
                                            label={category.label} 
                                            value={category._id} 
                                        />
                                    ))}       
                                </Picker>
                            </View>
                            )
                        }
                    </View>

                    <TouchableOpacity 
                        style={{
                            marginBottom: 12,
                            marginTop: 20,
                            backgroundColor: theme.colors.primary,
                            borderRadius: 10,
                            height: 50,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',

                        }}
                        onPress={HandleButtonPress}
                    >
                        <Text 
                            style={{
                                fontSize: 16,
                                color: theme.colors.text,
                            }}
                            
                        >Add Expense </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity                         
                        style={{
                        marginBottom: 12,
                        backgroundColor: theme.colors.primary,
                        borderRadius: 10,
                        height: 50,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',}}
                        onPress={debugButtonPress}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                color: theme.colors.text,
                            }}
                           
                        >Debug</Text>
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
        color: 'white',
        backgroundColor: 'black',
    },
    textInput: {
      height: 40,
      borderColor: 'gray',
      borderBottomWidth: 1,
      marginBottom: 36,
    },

  });

  
export default Add;