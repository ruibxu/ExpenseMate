import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ListItem = ({  title, onPress, titleStyle }) => {
    
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={[styles.title, titleStyle]}>{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
    container: {
      display: 'flex',
      justifyContent: 'flex-start',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
    }
  });
  
  export default ListItem;