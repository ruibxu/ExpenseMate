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
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(new Date());

    const [category, setCategory] = useState('');

    const HandleButtonPress = () => {
        console.log('Button Pressed');
    }

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        console.log(currentDate);
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
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="calendar"
                        onChange={handleDateChange}
                    />
                    </View>


                    <View style={styles.category}>
                        <Text style={styles.label}>Category:</Text>
                        <Picker
                            selectedValue={category}
                            style={{ height: 120, width: 200 }}
                            itemStyle={{ height: 120 }}
                            onValueChange={handleCategoryChange}
                            >
                            <Picker.Item label="undefined" value="undefined" />
                            <Picker.Item label="Category 1" value="Category 1" />
                            <Picker.Item label="Category 2" value="Category 2" />
                            <Picker.Item label="Category 3" value="Category 3" />
                            <Picker.Item label="Category 4" value="Category 4" />
                            <Picker.Item label="Category 5" value="Category 5" />
                            <Picker.Item label="Category 6" value="Category 6" />
                            <Picker.Item label="Category 7" value="Category 7" />
                            <Picker.Item label="Category 8" value="Category 8" />
                        </Picker>
                    </View>


                    <View style={styles.btnContainer}>
                        <Button title="Add Expense" color="black" onPress={HandleButtonPress}/>
                    </View>

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
    category: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
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