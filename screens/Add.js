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
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';

const Add = () => {
    const [amount, setAmount] = useState(''); // amount state
    const [date, setDate] = useState(new Date()); // date state
    const [dateShow, setDateShow] = useState(false); // date show state

    const [category, setCategory] = useState('undefined'); // category state

    // handle add expense button press
    const HandleButtonPress = () => {
        console.log('Button Pressed');
    }
    

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
                      onChange={e => setAmount(e.target.value)}
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

                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
      borderColor: '#000000',
      borderBottomWidth: 1,
      marginBottom: 36,
    },
    btnContainer: {
        backgroundColor: 'gray',
        Color: 'black',
        marginTop: 12,
    },
  });

  
export default Add;