import React, {useEffect, useState} from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { List, Text, FAB, Button } from 'react-native-paper';

import Header from '../components/Header';
import Container from '../components/Container';
import Body from '../components/Body';

import {getGastos} from '../services/GastosServicesDB';

import {useNavigation} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';

const Gastos = () => {

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [gastos, setGastos] = useState([]);

  useEffect(() => {
    getGastos().then((dados)=>{
      setGastos(dados);
    });
  },[isFocused]);

  const renderItem = ({ item }) => (
    <List.Item
      title={
        '' + item.nome + ' ' + item.sobrenome + ''
      }
      description={  '' + item.email}
      left={(props) => (
        <List.Icon
          {...props}
          color={item.tipo == 0 ? 'green' : 'red'}
          icon="account"
        />
      )}
      right={(props) => (
        <Text {...props} style={{ alignSelf: 'center' }}>
          {' '}
          {item.data}{' '}
        </Text>
      )}
      onPress={() => navigation.navigate('Abastecimento', {item})}
    />
  );

  return (
    <Container>
      <Header title={'LISTA DE CLIENTES'} />
      <Body>
        <FlatList
          data={gastos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <FAB
          style={styles.fab}
          small
          icon="plus"
          onPress={() => navigation.navigate('Abastecimento')}
        />
      </Body>
        <Button
          style={styles.button}
          mode="contained"
          color="red"
          onPress={() => navigation.goBack('Home')}>
          Sair
        </Button>
    </Container>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default Gastos;
