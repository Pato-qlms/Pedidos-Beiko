import React, { useState, useContext, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  Keyboard,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import colors from '../assets/colors';
import GeneralContext from '../contexts/GeneralContext';

const ConClientes = ({ navigation, route }) => {
  //___________________________________________________________________________________
  const { tablesLoaded, tablaClaves, tablaClientes } =
    useContext(GeneralContext);

  //___________________________________________________________________________________
  const { itemSelected } = route.params;

  //___________________________________________________________________________________
  const [editComprador, setEditComprador] = useState(false);
  const [editRazonSocial, setEditRazonSocial] = useState(false);
  const [editDomicilio, setEditDomicilio] = useState(false);
  const [handleFocus, setHandleFocus] = useState(false);
  const [codigoCliente, setCodigoCliente] = useState();
  const [comprador, setComprador] = useState();
  const [cuit, setCuit] = useState();
  const [domicilio, setDomicilio] = useState();
  const [email, setEmail] = useState();
  const [localidad, setLocalidad] = useState();
  const [provincia, setProvincia] = useState();
  const [razonSocial, setRazonSocial] = useState();
  const [responsable, setResponsable] = useState();
  const [telefono, setTelefono] = useState();
  const [selecting, setSelecting] = useState();

  //___________________________________________________________________________________
  const compradorRef = useRef();
  const razonSocialRef = useRef();
  const domicilioRef = useRef();

  //___________________________________________________________________________________
  useEffect(() => {
    if (handleFocus === true) {
      if (editComprador === true) {
        compradorRef.current.focus();
      } else if (editRazonSocial === true) {
        razonSocialRef.current.focus();
      } else if (editDomicilio === true) {
        domicilioRef.current.focus();
      }
      setHandleFocus(false);
    }
  }, [handleFocus]);

  useEffect(() => {
    if (
      editComprador === true ||
      editRazonSocial === true ||
      editDomicilio === true
    ) {
      setHandleFocus(true);
    }
  }, [editComprador, editRazonSocial, editDomicilio]);

  //___________________________________________________________________________________
  useEffect(() => {
    if (typeof selecting !== 'undefined') {
      if (
        selecting === 'comprador' ||
        selecting === 'razonSocial' ||
        selecting === 'domicilio' ||
        selecting === 'localidad'
      ) {
        const filter = (event) => {
          return event.IdCliente == itemSelected;
        };
        const data = tablaClientes.filter(filter);
        if (data.length !== 0) {
          const idCompradorString = JSON.stringify(data[0].IdComprador);
          setComprador(idCompradorString);
          const idCodClieString = JSON.stringify(data[0].IdCliente);
          setCodigoCliente(idCodClieString);
          setRazonSocial(data[0].RazonSocial);
          setDomicilio(data[0].Domicilio);
          const filterLocalidad = (event) => {
            return (
              event.IdClaves.toLowerCase() == data[0].IdLocalidad.toLowerCase()
            );
          };
          const dataLocal = tablaClaves.filter(filterLocalidad);
          if (dataLocal.length !== 0) {
            setLocalidad(dataLocal[0].Descripcion);
          }
          const filterProvincia = (event) => {
            return (
              event.IdClaves.toLowerCase() == data[0].IdProvincia.toLowerCase()
            );
          };
          const dataProvincia = tablaClaves.filter(filterProvincia);
          if (dataProvincia.length !== 0) {
            setProvincia(dataProvincia[0].Descripcion);
          }
          setResponsable(data[0].Responsable);
          setTelefono(data[0].Telefono);
          setCuit(data[0].Cuit);
          setEmail(data[0].Email);
        }
      }
      setSelecting();
      navigation.setParams({ itemSelected: 'null' });
    }
  }, [itemSelected]);

  //___________________________________________________________________________________
  const compradorHandler = (event) => {
    if (event !== 'undefined') {
      setComprador(event);
    }
  };

  const razonSocialHandler = (event) => {
    if (event !== 'undefined') {
      setRazonSocial(event);
    }
  };

  const domicilioHandler = (event) => {
    if (event !== 'undefined') {
      setDomicilio(event);
    }
  };

  //___________________________________________________________________________________
  const compradorTouched = () => {
    cleanUpAll();
    setSelecting('comprador');
    setEditComprador(true);
  };

  const razonSocialTouched = () => {
    cleanUpAll();
    setSelecting('razonSocial');
    setEditRazonSocial(true);
  };

  const domicilioTouched = () => {
    cleanUpAll();
    setSelecting('domicilio');
    setEditDomicilio(true);
  };

  const localidadTouched = () => {
    if (tablesLoaded === true) {
      cleanUpAll();
      setSelecting('localidad');
      const filter = (event) => {
        return event.IdClaves[0].includes('L') &&  event.IdClaves[1].includes('b');
      };
      const data = tablaClaves.filter(filter);
      if (data.length !== 0) {
        navigation.navigate('SearchResults', {
          result: data,
          callBy: 'conClientesLocal',
        });
      }
    }
  };

  //___________________________________________________________________________________

  const blurComprador = () => {
    if (typeof comprador !== 'undefined' && tablesLoaded === true) {
      const filter = (event) => {
        const compradorString = JSON.stringify(event.IdCliente);
        return compradorString.toLowerCase().includes(comprador.toLowerCase());
      };
      const data = tablaClientes.filter(filter);
      if (data.length !== 0) {
        navigation.navigate('SearchResults', {
          result: data,
          callBy: 'conClientesComp',
        });
      } else {
        Alert.alert('Alerta!', 'Comprador no encontrado!', [
          {
            text: 'Cerrar Alerta',
          },
        ]);
      }
    } else {
      Alert.alert('Alerta!', 'Complete Comprador!', [
        {
          text: 'Cerrar Alerta',
        },
      ]);
    }
    setEditComprador(false);
  };

  //___________________________________________________________________________________
  const blurRazonSocial = () => {
    if (typeof razonSocial !== 'undefined' && tablesLoaded === true) {
      const filter = (event) => {
        return event.RazonSocial.toLowerCase().includes(
          razonSocial.toLowerCase()
        );
      };
      const data = tablaClientes.filter(filter);
      if (data.length !== 0) {
        navigation.navigate('SearchResults', {
          result: data,
          callBy: 'conClientesRazo',
        });
      } else {
        Alert.alert('Alerta!', 'Razón Social no encontrada!', [
          {
            text: 'Cerrar Alerta',
          },
        ]);
      }
    } else {
      Alert.alert('Alerta!', 'Complete la Razón Social!', [
        {
          text: 'Cerrar Alerta',
        },
      ]);
    }
    setEditRazonSocial(false);
  };

  //___________________________________________________________________________________
  const blurDomicilio = () => {
    if (typeof domicilio !== 'undefined' && tablesLoaded === true) {
      const filter = (event) => {
        return event.Domicilio.toLowerCase().includes(domicilio.toLowerCase());
      };
      const data = tablaClientes.filter(filter);
      if (data.length !== 0) {
        navigation.navigate('SearchResults', {
          result: data,
          callBy: 'conClientesDom',
        });
      } else {
        Alert.alert('Alerta!', 'Domicilio no encontrado!', [
          {
            text: 'Cerrar Alerta',
          },
        ]);
      }
    } else {
      Alert.alert('Alerta!', 'Complete el Domicilio!', [
        {
          text: 'Cerrar Alerta',
        },
      ]);
    }
    setEditDomicilio(false);
  };

  //___________________________________________________________________________________
  // const blurLocalidad = () => {
  //   if (typeof localidad !== 'undefined' && tablesLoaded === true) {
  //     const filter = (event) => {
  //       return event.Localidad.toLowerCase().includes(localidad.toLowerCase());
  //     };
  //     const data = tablaClientes.filter(filter);
  //     if (data.length !== 0) {
  //       navigation.navigate('SearchResults', {
  //         result: data,
  //         callBy: 'conClientesLoc',
  //       });
  //     } else {
  //       Alert.alert('Alerta!', 'Domicilio no encontrado!', [
  //         {
  //           text: 'Cerrar Alerta',
  //         },
  //       ]);
  //     }
  //   } else {
  //     Alert.alert('Alerta!', 'Complete el Localidad!', [
  //       {
  //         text: 'Cerrar Alerta',
  //       },
  //     ]);
  //   }
  //   setEditLocalidad(false);
  // };
  //___________________________________________________________________________________

  //___________________________________________________________________________________
  const cleanUpAll = () => {
    setComprador();
    setCodigoCliente();
    setRazonSocial();
    setDomicilio();
    setLocalidad();
    setProvincia();
    setResponsable();
    setCuit();
    setTelefono();
    setEmail();
  };

  //___________________________________________________________________________________

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView>
        <ScrollView>
          {/* -----------------Form section------------------ */}
          <View style={styles.formContainer}>
            {/* --------------------------------------------- */}
            {/* ----------- 1 ----------- */}
            <View style={styles.row}>
              <View style={styles.selecLabelContainer}>
                <TouchableOpacity
                  onPress={() => {
                    compradorTouched();
                  }}
                >
                  <Text style={styles.selecLabel}>Comprador</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.boxContainer, { marginLeft: 10 }]}>
                <TextInput
                  editable={editComprador}
                  onBlur={() => blurComprador()}
                  onChangeText={compradorHandler}
                  placeholder={''}
                  ref={compradorRef}
                  style={[styles.box, { width: 75 }]}
                  underlineColorAndroid='transparent'
                  value={comprador || ''}
                />
              </View>
              <View style={styles.labelContainer}>
                <Text style={[styles.label, { alignSelf: 'flex-end' }]}>
                  Cliente
                </Text>
              </View>
              <View style={[styles.boxContainer, { marginLeft: 5 }]}>
                <TextInput
                  editable={false}
                  placeholder={''}
                  style={[styles.box, { width: 75 }]}
                  underlineColorAndroid='transparent'
                  value={codigoCliente || ''}
                />
              </View>
            </View>
            {/* ----------- 2 ----------- */}
            <View style={styles.row}>
              <View style={styles.selecLabelContainer}>
                <TouchableOpacity
                  onPress={() => {
                    razonSocialTouched();
                  }}
                >
                  <Text style={styles.selecLabel}>Raz. Soc.</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.boxContainer}>
                <TextInput
                  editable={editRazonSocial}
                  onBlur={() => blurRazonSocial()}
                  onChangeText={razonSocialHandler}
                  placeholder={''}
                  placeholderTextColor={colors.blue}
                  ref={razonSocialRef}
                  style={[styles.box, { width: 250 }]}
                  underlineColorAndroid='transparent'
                  value={razonSocial || ''}
                />
              </View>
            </View>
            {/* ----------- 3 ----------- */}
            <View style={styles.row}>
              <View style={styles.selecLabelContainer}>
                <TouchableOpacity
                  onPress={() => {
                    domicilioTouched();
                  }}
                >
                  <Text style={styles.selecLabel}>Domicilio</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.boxContainer}>
                <TextInput
                  editable={editDomicilio}
                  onBlur={() => blurDomicilio()}
                  onChangeText={domicilioHandler}
                  placeholder={''}
                  placeholderTextColor={colors.blue}
                  ref={domicilioRef}
                  style={[styles.box, { width: 250 }]}
                  underlineColorAndroid='transparent'
                  value={domicilio || ''}
                />
              </View>
            </View>
            {/* ----------- 4 ----------- */}
            <View style={styles.row}>
              <View style={styles.selecLabelContainer}>
                <TouchableOpacity
                  onPress={() => {
                    localidadTouched();
                  }}
                >
                  <Text style={styles.selecLabel}>Localidad</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.boxContainer}>
                <TextInput
                  editable={false}
                  onBlur={() => blurLocalidad()}
                  placeholder={''}
                  placeholderTextColor={colors.blue}
                  style={[styles.box, { width: 250 }]}
                  underlineColorAndroid='transparent'
                  value={localidad || ''}
                />
              </View>
            </View>
            {/* ----------- 5 ----------- */}
            <View style={styles.row}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Provincia</Text>
              </View>
              <View style={styles.boxContainer}>
                <TextInput
                  editable={false}
                  placeholder={''}
                  style={[styles.box, { width: 250 }]}
                  underlineColorAndroid='transparent'
                  value={provincia || ''}
                />
              </View>
            </View>
            {/* ----------- 6 ----------- */}
            <View style={styles.row}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Responsable</Text>
              </View>
              <View style={styles.boxContainer}>
                <TextInput
                  editable={false}
                  placeholder={''}
                  style={[styles.box, { width: 230 }]}
                  underlineColorAndroid='transparent'
                  value={responsable || ''}
                />
              </View>
            </View>
            {/* ----------- 7 ----------- */}
            <View style={styles.row}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>CUIT</Text>
              </View>
              <View style={styles.boxContainer}>
                <TextInput
                  editable={false}
                  placeholder={''}
                  style={[styles.box, { width: 290 }]}
                  underlineColorAndroid='transparent'
                  value={cuit || ''}
                />
              </View>
            </View>
            {/* ----------- 8 ----------- */}
            <View style={styles.row}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Tel.</Text>
              </View>
              <View style={styles.boxContainer}>
                <TextInput
                  editable={false}
                  placeholder={''}
                  style={[styles.box, { width: 290 }]}
                  underlineColorAndroid='transparent'
                  value={telefono || ''}
                />
              </View>
            </View>
            {/* ----------- 9 ----------- */}
            <View style={styles.row}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Email</Text>
              </View>
              <View style={styles.boxContainer}>
                <TextInput
                  editable={false}
                  placeholder={''}
                  style={[styles.box, { width: 290 }]}
                  underlineColorAndroid='transparent'
                  value={email || ''}
                />
              </View>
            </View>
            {/* --------------------------------------------- */}
          </View>
          {/* ----------------------------------------------- */}
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    paddingTop: 10,
    backgroundColor: colors.white,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 15,
    paddingBottom: 150,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 7,
  },
  selecLabelContainer: {
    alignSelf: 'center',
    backgroundColor: colors.greenBlue,
    borderRadius: 15,
  },
  selecLabel: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    marginRight: 10,
    marginVertical: 7,
    paddingHorizontal: 1,
  },
  labelContainer: {
    alignSelf: 'center',
    flex: 1,
  },
  label: {
    alignSelf: 'flex-start',
    color: colors.blue,
    fontSize: 19,
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  boxContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  box: {
    alignSelf: 'flex-end',
    backgroundColor: colors.white,
    borderColor: colors.greenBlue,
    borderRadius: 10,
    borderWidth: 3,
    color: colors.blue,
    fontSize: 18,
    fontWeight: 'bold',
    paddingRight: 10,
    paddingVertical: 3,
    textAlign: 'right',
  },
});

export default ConClientes;
