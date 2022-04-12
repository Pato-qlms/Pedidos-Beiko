import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { call } from 'react-native-reanimated';
import colors from '../assets/colors';

const CardTwo = ({ navigation, route, item }) => {
  //____________________________________________________________________________________________
  const { callBy } = route.params;

  //____________________________________________________________________________________________
  const handleSelection = () => {
    // <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
    // Key: IdCliente
    if (typeof item.IdCliente != 'undefined') {
      if (callBy == 'pedidosCliente') {
        navigation.navigate('PedidosSceen', { itemSelected: item.IdCliente });
      }else if (callBy == 'archClientesClie') {
        navigation.navigate('ArchClientes', { itemSelected: item.IdCliente });
    }else if (callBy == 'conClientesComp' || callBy == 'conClientesRazo' || callBy === 'conClientesDom' || callBy === 'cardConClientesLocal') {
      navigation.navigate('ConsClientes', { itemSelected: item.IdCliente });
    }
    }
    // <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
    // Key: IdProducto
    if (typeof item.IdProducto != 'undefined') {
      if (callBy == 'pedidosProducto') {
        navigation.navigate('PedidosSceen', { itemSelected: item.IdProducto });
      }
    }
     // <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
    // Key: IdClaves
    if (typeof item.IdClaves != 'undefined') {
      if (callBy == 'archivosClaves') {
        navigation.navigate('ArchClaves', { itemSelected: item.IdClaves });
      
    }
    }

    // <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
    

  };


  //____________________________________________________________________________________________

  //____________________________________________________________________________________________
  //____________________________________________________________________________________________
  return (
    <View>
      {item.IdCliente ? (
        <TouchableOpacity onPress={() => handleSelection()}>
          <View style={styles.itemContainer}>
            <View style={styles.row}>
              <View style={{ flexDirection: 'row' }}>
                <View style={[styles.textContainer, {}]}>
                  <Text
                    style={[
                      styles.textTop,
                      { width: 100, alignSelf: 'flex-start' },
                    ]}
                  >
                    Cliente:
                  </Text>
                </View>
                <View style={[styles.textContainer, {}]}>
                  <Text style={[styles.textTop, { alignSelf: 'flex-start' }]}>
                    {item.IdCliente}
                  </Text>
                </View>
              </View>
              <View style={[styles.textContainer, { paddingTop: 5 }]}>
                <Text style={styles.textBottom}>{item.RazonSocial}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => handleSelection()}>
          <View style={styles.itemContainer}>
            <View style={styles.row}>
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.textContainer}>
                  <Text
                    style={[
                      styles.textTop,
                      { width: 120, alignSelf: 'flex-start' },
                    ]}
                  >
                    Producto:
                  </Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={[styles.textTop, { alignSelf: 'flex-start' }]}>
                    {item.IdProducto}
                  </Text>
                </View>
              </View>
              <View style={[styles.textContainer, { paddingTop: 5 }]}>
                <Text style={styles.textBottom}>{item.Descripcion}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: colors.green,
    borderRadius: 15,
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 6,
    paddingVertical: 2,
  },
  row: {
    flex: 1,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
  },
  textTop: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 6,
    paddingHorizontal: 5,
  },
  textBottom: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 6,
    paddingHorizontal: 5,
  },
});

export default CardTwo;
