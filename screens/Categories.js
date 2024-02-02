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



import ColorPicker from 'react-native-wheel-color-picker'
import { EventEmitter } from 'events';

export const eventEmitter = new EventEmitter();

import { CategoryContext } from '../context/CategoryContext';

const Categories = ({}) => {
    const [newCategoryLabel, setNewCategoryLabel] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [newCategoryColor, setNewCategoryColor] = useState('#000000');

    const { categories, setCategories, addCategory, deleteCategory } = useContext(CategoryContext);


    const toggleModal = () => {
        setNewCategoryLabel('');
        setModalVisible(!isModalVisible);
    };

    const handleAddCategory = async () => {
        await addCategory(newCategoryLabel, newCategoryColor);
        toggleModal();
    }

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
                                await deleteCategory(category._id);
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
                                    backgroundColor: theme.colors.activeText,
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
