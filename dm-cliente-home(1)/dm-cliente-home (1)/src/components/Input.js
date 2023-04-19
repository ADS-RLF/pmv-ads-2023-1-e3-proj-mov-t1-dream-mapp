import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

const Header = (props) => {
  return (
      <TextInput 
        style={styles.input} 
        keyboardType='email-address'
        {...props}      
      />)
    ;
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#AED',
    marginBottom: 8,
  },
});

export default Header;
