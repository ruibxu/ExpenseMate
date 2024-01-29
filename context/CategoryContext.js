import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { Alert } from 'react-native';



export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);


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


    useEffect(() => {
        const getCategories = async () => {
            try {
                const categoriesFromStorage = await AsyncStorage.getItem('categories');
                if (!categoriesFromStorage || JSON.parse(categoriesFromStorage).length === 0) {
                    // If no categories are found, use the default categories
                    await AsyncStorage.setItem('categories', JSON.stringify(defaultCategories));
                    setCategories(defaultCategories);
                    return;
                }
                setCategories(JSON.parse(categoriesFromStorage));
            } catch (e) {
                console.log(e);
            }
        }
        getCategories();
    }, []);

    const addCategory = async (categoryLabel,categoryColor) => {
        try {
            // Retrieve existing categories or initialize an empty array
            const existingCategories = JSON.parse(await AsyncStorage.getItem('categories')) || [];
  
            if (!categoryLabel) {
                // Show an alert if the category is empty
                Alert.alert('Alert', 'Please enter a category');
                return; // Exit the function without saving data
            }
            // Add new category to the array
            const newCategory = {  
              _id: uuid.v4(),
              label: categoryLabel,
              color: categoryColor,
            };
  
            existingCategories.push(newCategory);
            // Save the updated array back to local storage
            await AsyncStorage.setItem('categories', JSON.stringify(existingCategories));
            console.log('Category saved:', newCategory);
            setCategories(existingCategories);
            
          } catch (error) {
            console.error('Error saving category:', error);
          }
    }

    const deleteCategory = async (id) => {
        try {
            // Retrieve existing categories or initialize an empty array
            console.log('Deleting category with id:', id);
            const existingCategories = JSON.parse(await AsyncStorage.getItem('categories')) || [];
            // Remove the category from the array
            const updatedCategories = existingCategories.filter((item) => item._id !== id);
            // Save the updated array back to local storage
            if (updatedCategories.length === 0) {
                // Refill with default categories
                await AsyncStorage.setItem('categories', JSON.stringify(defaultCategories));
                setCategories(defaultCategories);
                console.log('All categories were deleted. Refilled with default categories.');
            } else {
                // Save the updated array back to local storage
                await AsyncStorage.setItem('categories', JSON.stringify(updatedCategories));
                setCategories(updatedCategories);
            }
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    }

    return (
        <CategoryContext.Provider value={{categories, setCategories,addCategory,deleteCategory}}>
            {children}
        </CategoryContext.Provider>
    )

}
