import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { TextInput, Button, Headline } from 'react-native-paper';
import Container from '../components/Container';
import Body from '../components/Body';
import Input from '../components/Input';
import Logo from '../components/Logo';

import { useNavigation } from '@react-navigation/native';

import { register } from '../services/auth.services';

const Register = () => {
  const navigation = useNavigation();
  
  const [name, setName] = useState('admin');
  const [email, setEmail] = useState('admin@pucminas.br');
  const [password, setPassword] = useState('admin');

  const handleRegister = () => {
    register({
      name: name,
      email: email,
      password: password,
    }).then((res) => {
      console.log(res);

      if (res) {
        Alert.alert('Atenção', 'Usuário Cadastrado com sucesso!', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        Alert.alert(
          'Atenção',
          'Usuário não cadastrado! Tente novamente mais tarde =D'
        );
      }
    });
  };

  return (
    <Container>
      <View style={styles.header}>
        <Logo />
      </View>

      <Headline style={styles.textHeader}>Cadastro de Usuários</Headline>

      <Body>
        <Input
          label="Nome"
          value={name}
          onChangeText={(text) => setName(text)}
          left={<TextInput.Icon name="account" />}
        />
        <Input
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          left={<TextInput.Icon name="email" />}
        />
        <Input
          label="Senha"
          value={password}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          left={<TextInput.Icon name="key" />}
        />
        <Button style={styles.button} mode="contained" onPress={handleRegister}>
          REGISTRAR
        </Button>
        <Button
          style={styles.button}
          mode="outlined"
          onPress={() => navigation.goBack()}>
          Cancelar
        </Button>
      </Body>
    </Container>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 8,
  },
  textHeader: {
    textAlign: 'center',
  },
  header: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 12,
  },
});

export default Register;
