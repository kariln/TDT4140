import React from 'react';
import { StyleSheet, View, FlatList, Text, Button, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: '20%'
    },
    regContainer: {
        flex: 1,
        backgroundColor: '#CC0066',
        alignItems: 'center',
        paddingTop: '20%',
        height: 20,
        width: "80%"
    },
    textInputContainer: {
      flex: 1,
      height: 20,
      borderColor: 'gray',
      borderWidth: 1,
      width: "80%",
      paddingTop: '20%',
      paddingBottom: '20%'
    }
});

const RegUser = () => {
  const [value, onChangeText] = React.useState('Brukernavn:');
    return (
      <View style={styles.listContainer}>
      <TextInput
        style={styles.textInputContainer}
        onChangeText={text => onChangeText(text)}
        value={value}
        />
        <View style = {styles.regContainer}>
          <Button
          onPress={() => {
            alert('Bruker opprettet!');
          }}
          title="Opprett bruker"
          color = "white"
          />
        </View>

      </View>


    );
  }

  export default RegUser;
