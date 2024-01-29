import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { theme } from '../theme';
import { useRef, useState } from 'react';

const ListItem = ({ label, onPress, detail, swipeToDelete , onDelete, isDestructive,subtitle,percentage}) => {

  const [isDeletePressed, setIsDeletePressed] = useState(false)

  const swipeableRef = useRef(null);

  const item = () => {
    return (
      <TouchableOpacity 
        onPress={onPress} 
        disabled={!onPress} 
        style={[
          styles.container,
          {
            justifyContent: detail ? 'space-between' : 'flex-start',
          },
        ]}
      >
        <Text style={[styles.label, { color: isDestructive ? theme.colors.error : theme.colors.text }]}>
          {label}
        </Text>
        <Text style={[styles.label, { color: isDestructive ? theme.colors.error : theme.colors.text }]}>{subtitle}</Text>
        <Text style={[styles.label, { color: isDestructive ? theme.colors.error : theme.colors.text }]}>{percentage}</Text>

        {detail}
      </TouchableOpacity>
    );
  };
  
  if (swipeToDelete) {
    return (
        <Swipeable
          ref={swipeableRef}
          onSwipeableClose={() => {
            // Delete the item
            if (isDeletePressed) {
              onDelete();
              setIsDeletePressed(false);
            }
          }}
          renderRightActions={() => (
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 100,
                backgroundColor: theme.colors.error,
              }}
              onPress={() => {
                // Close the right side
                setIsDeletePressed(true);
                swipeableRef.current.close();
              }}

            >
              <Text style={{ color: 'white' }}>Delete</Text>
            </TouchableOpacity>
          )}
        >
          {item()}
        </Swipeable>
    );
  }
  return item();

};


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: theme.colors.card,
  },
  label: {
    fontSize: 16,
  }
});
  
export default ListItem;