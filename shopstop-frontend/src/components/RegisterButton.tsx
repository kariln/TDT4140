import React from 'react';
import { TouchableOpacity } from 'react-native';
import {StyleSheet,Button, View, Text, Button, TextInput} from 'react-native';

const styles = StyleSheet.create({
  regContainer:{
    flex: 1,
    backgroundColor: '#CC0066',
    alignItems: 'center',
    paddingTop: '20%',
    height: 20,
    width: "80%"
  }
});

const RegisterUser = () => {
  return(
    <View style = {styles.regContainer}>
      <Button
      onPress={() =>{
        alert('Skal registrere bruker!');
      }}
      title= "Opprett bruker"
      color = "black"
      />
      </View>
  );
};


export default RegisterUser;
