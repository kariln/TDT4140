import React from 'react';
import { TouchableOpacity } from 'react-native';
import {StyleSheet,Button, View, Text, TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  regContainer:{
    flex: 1,
    backgroundColor: '#CC0066',
    alignItems: 'center',
    height: 20,
    width: "80%",
    paddingTop: "20%",
    paddingBottom: "20%"
  }
});

const RegisterUser = () => {
  const navigation = useNavigation();
  return(
    <View style = {styles.regContainer}>
      <Button
      onPress={() => navigation.navigate('Registrer bruker')
      }
      title= "Opprett bruker"
      color = "black"
      />
      </View>
  );
};


export default RegisterUser;
