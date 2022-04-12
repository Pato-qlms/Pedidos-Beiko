import React from 'react';

import { View, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import colors from '../assets/colors';
import Card from './Card';
import CardTwo from './CardTwo';
import CardProcIngresos from './CardProcIngresos';

const SearchResults = ({ navigation, route }) => {
  //____________________________________________________________________________________________
  const { result, callBy } = route.params;

  //____________________________________________________________________________________________
  const cardNavigation = navigation;
  const cardRoute = route;

  //____________________________________________________________________________________________
  const renderCard = ({ route, item }) => {
    return <Card navigation={cardNavigation} route={cardRoute} item={item} />;
  };

  const renderCardTwo = ({ route, item }) => {
    return <CardTwo navigation={cardNavigation} route={cardRoute} item={item} />;
  };

  const renderProcIngCard = ({ route, item }) => {
    return <CardProcIngresos navigation={cardNavigation} route={cardRoute} item={item} />;
  };

  //____________________________________________________________________________________________
  const renderFlatList = () => {
    //<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
    // Key: IdProducto
    if (callBy === 'pedidosProducto') {
      return (
        <View style={styles.container}>
          <FlatList
            style={{ width: '100%' }}
            data={result}
            keyExtractor={item => JSON.stringify(item.IdProducto)}
            renderItem={renderCardTwo}
          />
        </View>
      );
    }
    //<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
    // Key: producto
    if (callBy === 'pedidosCarrito') {
      return (
        <View style={styles.container}>
          <FlatList
            style={{ width: '100%' }}
            data={result}
            keyExtractor={item => JSON.stringify(item.producto)}
            renderItem={renderProcIngCard}
          />
        </View>
      );
    }
    // <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
    // Key: IdCliente
    if (
      callBy === 'pedidosCliente' ||
      callBy === 'archClientesClie' ||
      callBy === 'conClientesComp' ||
      callBy === 'conClientesRazo' ||
      callBy === 'conClientesDom' || 
      callBy === 'cardConClientesLocal'
    ) {
      return (
        <View style={styles.container}>
          <FlatList
            style={{ width: '100%' }}
            data={result}
            keyExtractor={item => JSON.stringify(item.IdCliente)}
            renderItem={renderCardTwo}
          />
        </View>
      );
    }

    //   //   <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>

    //   // Key: IdClaves
    if (callBy === 'archClavesCla' || callBy === 'conClientesLocal') {
      return (
        <View style={styles.container}>
          <FlatList
            style={{ width: '100%' }}
            data={result}
            keyExtractor={item => JSON.stringify(item.IdClaves)}
            renderItem={renderCard}
          />
        </View>
      );
    }
    //   //   <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>


    //   //   <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
    if (callBy === 'consClavesCla') {
      return (
        <View style={styles.container}>
          <FlatList style={{ width: '100%' }} data={result} keyExtractor={item => JSON.stringify(item.IdClaves)} renderItem={renderCard} />
        </View>
      );
    }
  };

  //____________________________________________________________________________________________
  const handleGoBack = () => {
    if (callBy === 'archClientesClie') {
      navigation.navigate('ArchClientes', { itemSelected: 'null' });
    } else if (callBy === 'archClavesCla') {
      navigation.navigate('ArchClaves', { itemSelected: 'null' });
    } else if (callBy === 'consClavesCla') {
      navigation.navigate('ConsClaves', { itemSelected: 'null' });
    } else if (
      callBy === 'conClientesRazo' ||
      callBy === 'conClientesDom' ||
      callBy === 'conClientesLocal' ||
      callBy === 'conClientesComp' ||
      callBy === 'cardConClientesLocal'
    ) {
      navigation.navigate('ConsClientes', { itemSelected: 'null' });
    } else if (callBy === 'pedidosCliente' || callBy === 'pedidosProducto' || callBy === 'pedidosCarrito') {
      navigation.navigate('PedidosScreen', { itemSelected: 'null' });
    }
  };
  //____________________________________________________________________________________________
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.safeArea}>{renderFlatList()}</View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            handleGoBack();
          }}
          style={styles.textContainer}
        >
          <Text style={styles.text}>Volver</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    backgroundColor: colors.white,
    flex: 1,
    marginTop: 20,
  },
  buttonContainer: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
  textContainer: {
    paddingHorizontal: 10,
    backgroundColor: colors.green,
    borderRadius: 15,
    marginBottom: 15,
    marginRight: 15,
    marginTop: 15,
  },
  text: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 7,
    paddingHorizontal: 5,
  },
});

export default SearchResults;

//____________________________________________________________________________________________
