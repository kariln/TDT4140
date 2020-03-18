import React from 'react';
import { StyleSheet, Image, View, FlatList, Text, Button, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import getEnvVars from '../../environment';


const styles = StyleSheet.create({
  container: {
      alignItems: 'center',
      backgroundColor: 'white',
      flex: 1,
      paddingTop: '18%'
  },
    image: {
        height: '30%',
        marginBottom: 20,
        resizeMode: 'stretch',
        width: '50%'
    },
    input: {
        backgroundColor: '#fafafa',
        borderColor: 'gray',
        borderRadius: 4,
        borderWidth: 0.1,
        height: 40,
        marginTop: 10,
        paddingLeft: 10,
        width: '80%'
    },
    registerError: {
        padding: 10
    },
});

const RegUser = () => {
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();
  const [password2,checkPassword] = React.useState();
  const [registerError,setRegisterError] = React.useState('');

  const register = () => {
      fetch(`${getEnvVars.apiUrl}users/`,
        {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          data: {username: username, password: password}
        })
        .then(response => console.log(response.status))
        .catch(e => console.log(e));
  }

    return (
      <View style={styles.container}>
      <Image
          source={require('../../assets/Shopstop.png')}
          style={styles.image}
      />
      <TextInput
        style={styles.input}
        onChangeText={text => setUsername(text)}
        placeholder="username"
        value={username}
        />
        <TextInput
          style={styles.input}
          onChangeText={text => setPassword(text)}
          placeholder="password"
          value={password}
          secureTextEntry
          />
          <TextInput
            style={styles.input}
            onChangeText={text => checkPassword(text)}
            placeholder="password2"
            value={password2}
            secureTextEntry
            />
            <View style={styles.registerError}>
                <Text style={{ color: 'red' }}>{registerError}</Text>
            </View>
          <Button
          onPress={register}
          title="Opprett bruker"
          disabled={username === '' || password === '' || password != password2 || password2 === ''}
          buttonStyle={{
              padding: 10,
              paddingLeft: '35%',
              paddingRight: '35%'
          }}
          />
        </View>

    );
  }

  export default RegUser;
