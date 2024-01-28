import { 
    StyleSheet, 
    Text, 
    View, 
    TextInput, 
    FlatList, 
    Button, 
    Modal, 
    TouchableOpacity, 
    Alert, 
    KeyboardAvoidingView,
    ScrollView,
    ActivityIndicator,
    Keyboard,
} from 'react-native';
import ListItem from '../components/ListItem';
import { theme } from '../theme';
import { useState, useEffect,useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


import uuid from 'react-native-uuid';
import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
  } from 'react-native-safe-area-context';

import ColorPicker from 'react-native-wheel-color-picker'
import { EventEmitter } from 'events';

export const eventEmitter = new EventEmitter();

const Categories = ({}) => {
    const [categories, setCategories] = useState([]);
    const [newCategoryLabel, setNewCategoryLabel] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [newCategoryColor, setNewCategoryColor] = useState('#000000');

    

    const defaultCategories = [
        {
            _id: uuid.v4(),
            label: "Food",
            color: "#e04dab",
        },
        {
            _id: uuid.v4(),
            label: "Housing",
            color: "#f74b47",
        },
        {
            _id: uuid.v4(),
            label: "Health",
            color: "#08fb9a",
        },
        {
            _id: uuid.v4(),
            label: "Transportation",
            color: "#8657de",
        },
        {
            _id: uuid.v4(),
            label: "Shopping",
            color: "#19daf8",
        },
        {
            _id: uuid.v4(),
            label: "Entertainment",
            color: "#2254b6",
        },
        {
            _id: uuid.v4(),
            label: "Other",
            color: "#ffde5d",
        },
        
    ];

    const toggleModal = () => {
        setNewCategoryLabel('');
        setModalVisible(!isModalVisible);
    };

    const handleAddCategory = async () => {
        try {
          // Retrieve existing categories or initialize an empty array
          const existingCategories = JSON.parse(await AsyncStorage.getItem('categories')) || [];

            if (!newCategoryLabel) {
                // Show an alert if the category is empty
                Alert.alert('Alert', 'Please enter a category');
                return; // Exit the function without saving data
            }
          // Add new category to the array
          const newCategory = {  
            _id: uuid.v4(),
            label: newCategoryLabel,
            color: newCategoryColor,
          };

          existingCategories.push(newCategory);
          // Save the updated array back to local storage
          await AsyncStorage.setItem('categories', JSON.stringify(existingCategories));
          console.log('Category saved:', newCategory);
          setCategories(existingCategories);
          eventEmitter.emit('categoriesUpdated');
          toggleModal();
        } catch (error) {
          console.error('Error saving category:', error);
        }
      }

    useEffect(() => {
        const getCategoriesFromStorage = async () => {
          try {
            // Retrieve categories from local storage
            const categoriesFromStorage = await AsyncStorage.getItem('categories');
            console.log('Categories from storage:', categoriesFromStorage);
            if (!categoriesFromStorage || JSON.parse(categoriesFromStorage).length === 0) {
                // If no categories are found, use the default categories
                await AsyncStorage.setItem('categories', JSON.stringify(defaultCategories));
                setCategories(defaultCategories);
                eventEmitter.emit('categoriesUpdated');
                return;
            }
            setCategories(JSON.parse(categoriesFromStorage));
            eventEmitter.emit('categoriesUpdated');
          } catch (error) {
            console.error('Error retrieving categories:', error);
          }
        };
        getCategoriesFromStorage();
      }, []);

    return (
        <>
            <KeyboardAvoidingView
            behavior='padding'
            style={{
                margin: 16,
                flex: 1,
                justifyContent: 'space-between',
            }}>
                <ScrollView style={{ flex: 1}}>
                    <View style={{borderRadius: 20, overflow: 'hidden'}}>
                        {categories.map((category) => (
                            <ListItem
                            key={category._id}
                            label={category.label}
                            detail={
                                <View style={{ 
                                    width: 12,
                                    height: 12,
                                    borderRadius: 6,
                                    marginRight: 10,
                                    backgroundColor: category.color 
                                }} />
                            }
                            swipeToDelete={true}
                            onDelete={async () => {
                                try {
                                    // Retrieve existing categories or initialize an empty array
                                    const existingCategories = JSON.parse(await AsyncStorage.getItem('categories')) || [];
                                    // Remove the category from the array
                                    const updatedCategories = existingCategories.filter((item) => item._id !== category._id);
                                    // Save the updated array back to local storage
                                    await AsyncStorage.setItem('categories', JSON.stringify(updatedCategories));
                                    console.log('Category deleted:', category);
                                    setCategories(updatedCategories);
                                    eventEmitter.emit('categoriesUpdated');
                                } catch (error) {
                                    console.error('Error deleting category:', error);
                                }
                            }}
                            />
                        ))
                    }
                    </View>
                </ScrollView>
                <TouchableOpacity
                    style={{
                        backgroundColor: theme.colors.primary,
                        padding: 15,
                        borderRadius: 10,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}
                    onPress={toggleModal}
                >
                    <Text style={{ color: 'white' }}>Add Category</Text>
                </TouchableOpacity>

            </KeyboardAvoidingView>

            
            <Modal visible={isModalVisible} >
                <TouchableOpacity
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: theme.colors.modal,
                    }}
                    activeOpacity={1} 
                    onPress = {Keyboard.dismiss}
                >
                    <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        display: 'flex',
                        flex: 1,

                    }}
                    >
                        <Text style={{color: "white"}}>Enter new category:</Text>

                        <TextInput
                            value={newCategoryLabel}
                            placeholder='Category'
                            onChangeText={(text) => setNewCategoryLabel(text)}
                            style={{ 
                                backgroundColor: theme.colors.card, 
                                padding: 10, 
                                borderRadius: 5, 
                                marginVertical: 10 ,
                                color: "white",
                                borderColor: "white",
                                borderWidth: 1,
                                width: 330,
                            }}
                            placeholderTextColor={theme.colors.placeholder}
                        />

                        <View style={{
                            paddingHorizontal:50,
                            paddingVertical: 10,
                            height: 300,
                            width: 400,
                        }}>
                            <ColorPicker
                                style={{ }}
                                onColorChange={color => {
                                    // Handle color change here
                                    console.log(color);
                                    setNewCategoryColor(color);
                                }}
                            />
                        </View>

                        <View 
                        style={{
                            display: 'flex',
                            flexDirection: 'row', 
                            justifyContent: 'space-between', 
                            padding: 20,
                        }}
                        >
                            <TouchableOpacity
                                style={{
                                    backgroundColor: theme.colors.error,
                                    padding: 15,
                                    borderRadius: 10,
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    marginRight: 10,
                                }}
                                onPress={toggleModal}
                            >
                                <Text style={{ color: theme.colors.text }}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    backgroundColor: theme.colors.primary,
                                    padding: 15,
                                    borderRadius: 10,
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                    marginLeft: 10,
                                }}
                                onPress={handleAddCategory}
                            >
                                <Text style={{ color: theme.colors.text  }}>Add Category</Text>
                            </TouchableOpacity>


                        </View>

                    </View>
                </TouchableOpacity>

            </Modal>
        </>
        
    );
}

export default Categories;
