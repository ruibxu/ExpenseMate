import { StyleSheet, Text, View, TextInput, FlatList, Button, Modal, TouchableOpacity} from 'react-native';
import ListItem from '../components/ListItem';
import { theme } from '../theme';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
  } from 'react-native-safe-area-context';

const Categories = ({}) => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);

    const defaultCategories = [
        "Food",
        "Housing",
        "Health",
        "Transportation",
        "Shopping",
        "Entertainment",
        "Education",
        "Other"
    ];

    const insets = useSafeAreaInsets();

    const toggleModal = () => {
        setNewCategory('');
        setModalVisible(!isModalVisible);
    };

    const handleAddCategory = async () => {
        try {
          // Retrieve existing categories or initialize an empty array
          const existingCategories = JSON.parse(await AsyncStorage.getItem('categories')) || [];
          // Add new category to the array
          existingCategories.push(newCategory);
          // Save the updated array back to local storage
          await AsyncStorage.setItem('categories', JSON.stringify(existingCategories));
          console.log('Category saved:', newCategory);
          setCategories(existingCategories);
          toggleModal();
        } catch (error) {
          console.error('Error saving category:', error);
        }
      }

    useEffect(() => {
        const getCategoriesFromStorage = async () => {
          try {
            // Retrieve categories from local storage
            const categoriesFromStorage = await AsyncStorage.getItem('categories');;
            console.log('Categories from storage:', categoriesFromStorage);
            if (!categoriesFromStorage || JSON.parse(categoriesFromStorage).length === 0) {
                // If no categories are found, use the default categories
                await AsyncStorage.setItem('categories', JSON.stringify(defaultCategories));
                setCategories(defaultCategories);
                return;
            }
            setCategories(JSON.parse(categoriesFromStorage));
          } catch (error) {
            console.error('Error retrieving categories:', error);
          }
        };
        getCategoriesFromStorage();
      }, []);

    return (
        <View>
            <View
            style={{
                flexDirection: 'column',
                margin: 16,
                borderRadius: 20,
                overflow: 'hidden',
                justifyContent: 'space-between',
                height: '100%',
            }}>
                <View style={{ flex: 1, borderRadius: 20, overflow: 'hidden' }}>
                    <FlatList
                    data={categories}
                    renderItem={({ item }) => (
                        <ListItem
                        label={item}
                        swipeToDelete={true}
                        onDelete={async () => {
                            try {
                                // Retrieve existing categories or initialize an empty array
                                const existingCategories = JSON.parse(await AsyncStorage.getItem('categories')) || [];
                                // Remove the category from the array
                                const updatedCategories = existingCategories.filter((category) => category !== item);
                                // Save the updated array back to local storage
                                await AsyncStorage.setItem('categories', JSON.stringify(updatedCategories));
                                console.log('Category deleted:', item);
                                setCategories(updatedCategories);
                            } catch (error) {
                                console.error('Error deleting category:', error);
                            }
                        }}
                        />
                    )}
                    style={{ flex: 1, overflow: 'visible' }}
                    />
                </View>

                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        bottom: 60 + insets.bottom,
                        left:0,   
                        right: 0,
                        backgroundColor: theme.colors.primary,
                        padding: 15,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onPress={toggleModal}
                >
                    <Text style={{ color: 'white' }}>Add Category</Text>
                </TouchableOpacity>
            </View>
            <Modal visible={isModalVisible} transparent={true} onRequestClose={toggleModal}>
                <TouchableOpacity 
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                    onPress={toggleModal}
                    activeOpacity={1}
                >
                    <View style={{ backgroundColor: theme.colors.modal, padding: 20, borderRadius: 10 }}>
                        <Text style={{color: "white"}}>Enter new category:</Text>
                        <TextInput
                            value={newCategory}
                            placeholder='Category'
                            onChangeText={(text) => setNewCategory(text)}
                            style={{ 
                                backgroundColor: theme.colors.card, 
                                padding: 10, 
                                borderRadius: 5, 
                                marginVertical: 10 ,
                                color: "white",
                            }}
                        />
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                            <Button title="Cancel" onPress={toggleModal} /> 
                            <Button title="Add" onPress={handleAddCategory} />
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
        
    );
}

export default Categories;
