import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import {
  RadioButton,
  Text,
  TextInput,
  Button,
  Appbar,
} from 'react-native-paper';
import moment from 'moment';

import DateTimePicker from '@react-native-community/datetimepicker';

import Header from '../components/Header';
import Container from '../components/Container';
import Body from '../components/Body';
import Input from '../components/Input';
import Logo from '../components/Logo';

import {
  insertGasto,
  updateGasto,
  deleteGasto,
} from '../services/GastosServicesDB';

import { useNavigation } from '@react-navigation/native';

const Abastecimento = ({ route }) => {
  const navigation = useNavigation();
  const { item } = route.params ? route.params : {};

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const [tipo, setTipo] = useState('Ativo');
  const [nome, setNome] = useState(null);
  const [sobrenome, setSobrenome] = useState(null);
  const [email, setEmail] = useState(null);
  const [telefone, setTelefone] = useState(null);
  const [data, setData] = useState(moment(new Date()).format('DD/MM/YYYY'));

  useEffect(() => {
    if (item) {
      setTipo(item.tipo == 0 ? 'Ativo' : 'Inativo');
      setData(item.data);
      setNome(item.nome);
      setSobrenome(item.sobrenome);
      setEmail(item.email);
      setTelefone(item.telefone);
    }
  }, [item]);

  const handleSalvar = () => {
    if (item) {
      updateGasto({
        tipo: tipo == 'Ativo' ? 0 : 1,
        data: data,
        nome: nome,
        sobrenome: sobrenome,
        email: email,
        telefone: telefone,
        id: item.id,
      }).then();
    } else {
      insertGasto({
        tipo: tipo == 'Inativo' ? 1 : 0,
        data: data,
        nome: nome,
        sobrenome: sobrenome,
        email: email,
        telefone: telefone,
      }).then();
    }

    navigation.goBack();
  };

  const handleExcluir = () => {
    deleteGasto(item.id).then();
    navigation.goBack();
  };

  return (
    <Container>
      <Header title={'CADASTRO DE CLIENTES'} goBack={() => navigation.goBack()}>
        <Appbar.Action icon="check" onPress={handleSalvar} />
        {item && <Appbar.Action icon="trash-can" onPress={handleExcluir} />}
      </Header>

      <Body>
        <View style={styles.containerRadio}>
          <View style={styles.containerRadioItem}>
            <RadioButton
              value="first"
              status={tipo === 'Ativo' ? 'checked' : 'unchecked'}
              color={'green'}
              onPress={() => setTipo('Ativo')}
            />
            <Text>Ativo</Text>
          </View>

          <View style={styles.containerRadioItem}>
            <RadioButton
              value="first"
              status={tipo === 'Inativo' ? 'checked' : 'unchecked'}
              color={'red'}
              onPress={() => setTipo('Inativo')}
            />
            <Text>Inativo</Text>
          </View>
        </View>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'date'}
            is24Hour={true}
            display="default"
            onTouchCancel={() => setShow(false)}
            onChange={(event, date) => {
              setShow(false);
              setData(moment(date).format('DD/MM/YYYY'));
            }}
          />
        )}

        <TouchableOpacity onPress={() => setShow(true)}>
          <Input
            label="Data"
            value={data}
            left={<TextInput.Icon name="calendar" />}
            editable={false}
          />
        </TouchableOpacity>

        <Input
          label="Nome"
          value={nome}
          onChangeText={(text) => setNome(text)}
          left={<TextInput.Icon name="account-arrow-right" />}
        />

        <Input
          label="Sobrenone"
          value={sobrenome}
          onChangeText={(text) => setSobrenome(text)}
          left={<TextInput.Icon name="account-arrow-left-outline" />}
        />

        <Input
          label="E-mail"
          value={email}
          onChangeText={(text) => setEmail(text)}
          left={<TextInput.Icon name="email" />}
        />

        <Input
          label="Telefone"
          value={telefone}
          onChangeText={(text) => setTelefone(text)}
          left={<TextInput.Icon name="cellphone" />}
        />

        <Button mode="contained" style={styles.button} onPress={handleSalvar}>
          Enviar
        </Button>

        {item && (
          <Button
            mode="contained"
            color={'red'}
            style={styles.button}
            onPress={handleExcluir}>
            Excluir
          </Button>
        )}
      </Body>
    </Container>
  );
};

const styles = StyleSheet.create({
  containerRadio: {
    flexDirection: 'row',
    margin: 8,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  containerRadioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  button: {
    marginBottom: 8,
  },
});

export default Abastecimento;
