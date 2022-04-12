import React, { useContext } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import GeneralContext from '../contexts/GeneralContext';
import DrawerContent from '../components/DrawerContent';
import Home from '../components/Home';
import PedidosScreen from './Pedidos';
import LoginScreen from '../components/LoginScreen';
import SearchResults from '../components/SearchResults';
import colors from '../assets/colors';
import ArchClaves from './ArchClaves';
import ArchClientes from './ArchClientes';
import ConsProductos from './ConsClaves';
import ConsClientes from './ConsClientes';
import ConsResumen from './ConsResumen';
import ConsDeuda from './ConsDeuda';
import ConsClaves from './ConsClaves';

//______________________________________________________________________________________
const Drawer = createDrawerNavigator();
const MaterialTopTabs = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const ProcesosStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="StackProcesos" children={ProcesosTabs} />
      <Stack.Screen name="SearchResults" component={SearchResults} />
    </Stack.Navigator>
  );
};

//______________________________________________________________________________________
const ProcesosTabs = () => {
  return (
    <MaterialTopTabs.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: colors.blue, height: 0 },
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        },
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.metallicGrey,
        tabBarScrollEnabled: true,
        tabBarItemStyle: {
          flex: 1,
          width: 'auto',
          marginLeft: 10,
          marginRight: 10,
        },
        tabBarIndicatorStyle: {
          backgroundColor: colors.white,
          height: 3,
        },
        swipeEnabled: false,
        animationEnabled: false,
        lazy: false,
      }}
    >
      <MaterialTopTabs.Screen
        name="PedidosScreen"
        component={PedidosScreen}
        options={{ title: 'Pedidos' }}
        initialParams={{ itemSelected: 'undefined' }}
      />
    </MaterialTopTabs.Navigator>
  );
};
//______________________________________________________________________________________
const ArchivosStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="StackArchivos" children={ArchivosTabs} />
      <Stack.Screen name="SearchResults" component={SearchResults} />
    </Stack.Navigator>
  );
};
//______________________________________________________________________________________

const ArchivosTabs = () => {
  return (
    <MaterialTopTabs.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: colors.blue },
        tabBarLabelStyle: {         
          fontSize: 16,
          fontWeight: 'bold',
        },
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.metallicGrey,
        tabBarScrollEnabled: true,
        tabBarItemStyle: {
          flex: 1,
          width: 'auto',
          marginLeft: 10,
          marginRight: 10,
        },
        tabBarIndicatorStyle: {
          backgroundColor: colors.white,
          height: 3,
        },
        swipeEnabled: false,
        animationEnabled: false,
        lazy: false,
      }}
    >
      <MaterialTopTabs.Screen
        name="ArchClaves"
        component={ArchClaves}
        options={{ title: 'Claves' }}
        initialParams={{ itemSelected: 'undefined' }}
      />
      <MaterialTopTabs.Screen
        name="ArchClientes"
        component={ArchClientes}
        options={{ title: 'Clientes' }}
        initialParams={{ itemSelected: 'undefined' }}
      />
    </MaterialTopTabs.Navigator>
  );
};

//______________________________________________________________________________________
const ConsultasStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="StackConsultas" children={ConsultasTabs} />
      <Stack.Screen name="SearchResults" component={SearchResults} />
    </Stack.Navigator>
  );
};
//______________________________________________________________________________________

const ConsultasTabs = () => {
  return (
    <MaterialTopTabs.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: colors.blue },
        tabBarLabelStyle: {
         
          fontSize: 16,
          fontWeight: 'bold',
        },
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.metallicGrey,
        tabBarScrollEnabled: true,
        tabBarItemStyle: {
          flex: 1,
          width: 'auto',
          marginLeft: 10,
          marginRight: 10,
        },
        tabBarIndicatorStyle: {
          backgroundColor: colors.white,
          height: 3,
        },
        swipeEnabled: false,
        animationEnabled: false,
        lazy: false,
      }}
    >
      <MaterialTopTabs.Screen
        name="ConsClaves"
        component={ConsClaves}
        options={{ title: 'Claves' }}
        initialParams={{ itemSelected: 'undefined' }}
      />
      <MaterialTopTabs.Screen
        name="ConsClientes"
        component={ConsClientes}
        options={{ title: 'Clientes' }}
        initialParams={{ itemSelected: 'undefined' }}
      />
      <MaterialTopTabs.Screen
        name="ConsResumen"
        component={ConsResumen}
        options={{ title: 'Resumen' }}
        initialParams={{ itemSelected: 'undefined' }}
      />
      <MaterialTopTabs.Screen
        name="ConsDeuda"
        component={ConsDeuda}
        options={{ title: 'Deuda' }}
        initialParams={{ itemSelected: 'undefined' }}
      />
    </MaterialTopTabs.Navigator>
  );
};

//______________________________________________________________________________________
const App = () => {
  //______________________________________________________________________________________
  const { loggedStatus } = useContext(GeneralContext);

  //______________________________________________________________________________________
  const renderLogin = () => {
    return (
      <View style={styles.container}>
        <LoginScreen />
      </View>
    );
  };

  //______________________________________________________________________________________
  const renderNavigContainer = () => {
    return (
      <View style={styles.container}>
        <NavigationContainer>
          <Drawer.Navigator
            drawerContent={props => <DrawerContent {...props} />}
            screenOptions={{
              drawerStyle: {
                backgroundColor: colors.blue,
              },
              headerStyle: { backgroundColor: colors.blue },
              headerTitleStyle: {
                color: colors.white,
                fontSize: 25,
                fontWeight: 'bold',
                paddingBottom: 5,
                textShadowColor: colors.black,
                textShadowRadius: 1,
                textShadowOffset: { width: -1, height: 1 },
              },
              headerTintColor: colors.white,
              swipeEnabled: false,
              gestureEnabled: false,
              animationEnabled: false,
              lazy: false,
            }}
          >
            <Drawer.Screen name="Home" component={Home} options={{ title: 'Beiko' }} />
            <Drawer.Screen name="Pedidos" children={ProcesosStack} />

            <Drawer.Screen name="Archivos" children={ArchivosStack} />

            <Drawer.Screen name="Consultas" children={ConsultasStack} />
          </Drawer.Navigator>
        </NavigationContainer>
      </View>
    );
  };

  //____________________________________________________________________________________________
  //____________________________________________________________________________________________
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>{!loggedStatus.isLogged ? renderLogin() : renderNavigContainer()}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});

export default App;
