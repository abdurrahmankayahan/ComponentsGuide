import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useTheme } from '../theme/ThemeContext';



const Button = () => {
   const theme=useTheme(); 
  return (
    <TouchableOpacity style={{backgroundColor:theme.theme.background}}>
      <Text style={{color:theme.theme.textPrimary}}>Button</Text>
    </TouchableOpacity>
  );
};
const styles=StyleSheet.create({
    container:{
        borderWidth:1,
        borderColor:"#000"
    }
})
export default Button;
