import React, { useState, useEffect, useContext, useRef } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import colors from '../assets/colors';
import GeneralContext from '../contexts/GeneralContext';
import { MaterialIcons } from '@expo/vector-icons';

//_____________________________________________________________________________________
const Pedidos = ({ navigation, route }) => {
  //___________________________________________________________________________________
  const { itemSelected } = route.params;

  //___________________________________________________________________________________
  const {
    connectionStatus,
    connectivityCheck,
    connectivityCheckDone,
    handleConnectivityCheckDone,
    ipBackend,
    ipRequestDone,
    produToEdit,
    changeNumeroPedido,
    fecha,
    getNumPedDone,
    numeroPedido,
    tablaClientes,
    tablaProductos,
    tablesLoaded,
  } = useContext(GeneralContext);

  //___________________________________________________________________________________
  const [cleanUpAll, setCleanUpAll] = useState(false);
  const [editCantidad, setEditCantidad] = useState(false);
  const [editCliente, setEditCliente] = useState(false);
  const [editDescuento, setEditDescuento] = useState(false);
  const [editLista, setEditLista] = useState(false);
  const [editPrecio, setEditPrecio] = useState(false);
  const [editProducto, setEditProducto] = useState(false);
  const [enviarPedido, setEnviarPedido] = useState(false);
  const [modifElim, setModifElim] = useState(false);
  const [performPedidoCheck, setPerformPedidoCheck] = useState(false);
  const [removeItemsLS, setRemoveItemsLS] = useState(false);
  const [savePedCola, setSavePedCola] = useState(false);
  const [someQueryQueue, setSomeQueryQueue] = useState(false);
  //___________________________________________________________________________________
  const [cantidad, setCantidad] = useState();
  const [carrito, setCarrito] = useState([]);
  const [cliente, setCliente] = useState();
  const [description, setDescription] = useState();
  const [descuento, setDescuento] = useState();
  const [importe, setImporte] = useState();
  const [itemsPedidos, setItemsPedidos] = useState([]);
  const [itemsPedBeingSent, setItemsPedBeingSent] = useState([]);
  const [itemToSend, setItemToSend] = useState([]);
  const [lista, setLista] = useState();
  const [numPedBeingSent, setNumPedBeingSent] = useState([]);
  const [precio, setPrecio] = useState();
  const [producto, setProducto] = useState();
  const [queryBeingSent, setQueryBeingSent] = useState([]);
  const [queryEnCola, setQueryEnCola] = useState([]);
  const [queryEnviado, setQueryEnviado] = useState([]);
  const [querySaliente, setQuerySaliente] = useState([]);
  const [queryToSend, setQueryToSend] = useState([]);
  const [razonSocial, setRazonSocial] = useState();
  const [selectedCliente, setSelectedCliente] = useState([]);
  const [selecting, setSelecting] = useState();
  const [total, setTotal] = useState();

  //___________________________________________________________________________________
  const clienteRef = useRef();
  const listaRef = useRef();
  const descuentoRef = useRef();
  const productoRef = useRef();
  const precioRef = useRef();
  const cantidadRef = useRef();

  //___________________________________________________________________________________
  useEffect(() => {
    if (tablesLoaded === true) {
      setEditCliente(true);
      setEditProducto(true);
      setEditLista(true);
      setEditCantidad(true);
      setEditDescuento(true);
      setEditPrecio(true);
    }
  }, [tablesLoaded]);

  //___________________________________________________________________________________
  useEffect(() => {
    if (typeof selecting !== 'undefined') {
      if (itemSelected === 'volver') {
        return;
      } else {
        if (selecting === 'cliente') {
          const filter = (event) => {
            return event.IdCliente == itemSelected;
          };
          const data = tablaClientes.filter(filter);
          if (data.length !== 0) {
            const stringCliente = JSON.stringify(data[0].IdCliente);
            setCliente(stringCliente);
            setRazonSocial(data[0].RazonSocial);
            const stringLista = JSON.stringify(data[0].ListaPrecios);
            setLista(stringLista);
            const stringDescuento = JSON.stringify(data[0].Descuento);
            setDescuento(stringDescuento);
            const newClient = [
              {
                IdCliente: parseFloat(data[0].IdCliente),
                RazonSocial: data[0].RazonSocial,
                ListaPrecios: parseFloat(data[0].ListaPrecios),
                Descuento: parseFloat(data[0].Descuento),
              },
            ];
            setSelectedCliente(newClient);
          }
        } else if (selecting === 'producto') {
          const filter = (event) => {
            return event.IdProducto == itemSelected;
          };
          const data = tablaProductos.filter(filter);
          if (data.length !== 0) {
            const stringProducto = JSON.stringify(data[0].IdProducto);
            setProducto(stringProducto);
            setDescription(data[0].Descripcion);
            // las igualdades referentes a lista deben ser no estrictas
            if (data.length !== 0) {
              if (lista == 1) {
                if (parseFloat(data[0].Precio1) !== 0) {
                  setPrecio(JSON.stringify(data[0].Precio1));
                } else {
                  handlePrecioCero();
                }
              } else if (lista == 2) {
                if (parseFloat(data[0].Precio2) !== 0) {
                  setPrecio(JSON.stringify(data[0].Precio2));
                } else {
                  handlePrecioCero();
                }
              } else if (lista == 3) {
                if (parseFloat(data[0].Precio3) !== 0) {
                  setPrecio(JSON.stringify(data[0].Precio3));
                } else {
                  handlePrecioCero();
                }
              } else if (lista == 4) {
                if (parseFloat(data[0].Precio4) !== 0) {
                  setPrecio(JSON.stringify(data[0].Precio4));
                } else {
                  handlePrecioCero();
                }
              } else if (lista == 5) {
                if (parseFloat(data[0].Precio5) !== 0) {
                  setPrecio(JSON.stringify(data[0].Precio5));
                } else {
                  handlePrecioCero();
                }
              } else if (lista == 6) {
                if (parseFloat(data[0].Precio6) !== 0) {
                  setPrecio(JSON.stringify(data[0].Precio6));
                } else {
                  handlePrecioCero();
                }
              } else if (lista == 7) {
                if (parseFloat(data[0].Precio7) !== 0) {
                  setPrecio(JSON.stringify(data[0].Precio7));
                } else {
                  handlePrecioCero();
                }
              }
            }
          }
        } else if (selecting === 'carrito') {
          const filter = (event) => {
            return event.producto == itemSelected;
          };
          const data = carrito.filter(filter);
          setProducto(data[0].producto);
          setDescription(data[0].descripcion);
          setCantidad(data[0].cantidad);
          setPrecio(data[0].precio);
          setImporte(data[0].importe);
          setModifElim(true);
        }
      }
      setSelecting();
      navigation.setParams({ itemSelected: 'null' });
    }
  }, [itemSelected]);

  //___________________________________________________________________________________
  const areSomeQueryQueue = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('hayQueryEnCola');
      if (jsonValue != null) {
        setSomeQueryQueue(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //_______________
  useEffect(() => {
    areSomeQueryQueue();
  }, []);

  //___________________________________________________________________________________
  const clienteHandler = (cliente) => {
    if (typeof cliente !== 'undefined') {
      setDescription();
      setLista();
      setCliente(cliente);
    }
  };

  //___________________________________________________________________________________
  const productoHandler = (producto) => {
    if (typeof producto !== 'undefined') {
      setProducto(producto);
    }
  };

  //___________________________________________________________________________________
  const cantidadHandler = (cantidad) => {
    setCantidad();
    if (cantidad !== 0 && typeof cantidad !== 'undefined') {
      const newCantidad = cantidad.replace(/[^0-9]/g, '');
      if (newCantidad !== '') {
        setCantidad(newCantidad);
      }
    }
  };

  //___________________________________________________________________________________
  const listaHandler = (lista) => {
    setLista();
    if (typeof lista !== 'undefined') {
      const newLista = lista.replace(/[^0-7]/g, '');
      if (newLista !== '') {
        setLista(newLista);
        const newSelectedCliente = [
          {
            ...selectedCliente[0],
            ListaPrecios: lista,
          },
        ];
        setSelectedCliente(newSelectedCliente);
      }
    }

    //_________________________
    const filter = (event) => {
      return event.IdProducto == producto;
    };
    const data = tablaProductos.filter(filter);
    // las igualdades referentes a lista deben ser no estrictas
    if (data.length !== 0) {
      if (lista == 1) {
        if (parseFloat(data[0].Precio1) !== 0) {
          setPrecio(JSON.stringify(data[0].Precio1));
        } else {
          handlePrecioCero();
        }
      } else if (lista == 2) {
        if (parseFloat(data[0].Precio2) !== 0) {
          setPrecio(JSON.stringify(data[0].Precio2));
        } else {
          handlePrecioCero();
        }
      } else if (lista == 3) {
        if (parseFloat(data[0].Precio3) !== 0) {
          setPrecio(JSON.stringify(data[0].Precio3));
        } else {
          handlePrecioCero();
        }
      } else if (lista == 4) {
        if (parseFloat(data[0].Precio4) !== 0) {
          setPrecio(JSON.stringify(data[0].Precio4));
        } else {
          handlePrecioCero();
        }
      } else if (lista == 5) {
        if (parseFloat(data[0].Precio5) !== 0) {
          setPrecio(JSON.stringify(data[0].Precio5));
        } else {
          handlePrecioCero();
        }
      } else if (lista == 6) {
        if (parseFloat(data[0].Precio6) !== 0) {
          setPrecio(JSON.stringify(data[0].Precio6));
        } else {
          handlePrecioCero();
        }
      } else if (lista == 7) {
        if (parseFloat(data[0].Precio7) !== 0) {
          setPrecio(JSON.stringify(data[0].Precio7));
        } else {
          handlePrecioCero();
        }
      }
    }
  };

  //___________________________________________________________________________________
  const descuentoHandler = (descuento) => {
    setDescuento();
    if (typeof descuento !== 'undefined') {
      const newDescuento = descuento.replace(/[^0-9.]/g, '');
      if (newDescuento !== '') {
        setDescuento(newDescuento);
      }
    }
  };

  //___________________________________________________________________________________
  const precioHandler = (precio) => {
    setPrecio();
    setImporte();
    if (typeof precio !== 'undefined') {
      const newPrecio = precio.replace(/[^0-9.]/g, '');
      if (newPrecio !== '') {
        setPrecio(newPrecio);
      }
    }
  };

  //___________________________________________________________________________________
  const handleModifProducto = () => {
    setProducto();
    productoRef.current.focus();
  };

  const handleModifLista = () => {
    setLista();
    listaRef.current.focus();
  };

  const handleModifPrecio = () => {
    precioRef.current.focus();
  };

  const handlePrecioCero = () => {
    Alert.alert(
      'Alerta!',
      'Producto con precio cero. Modifique una de las siguientes opciones',
      [
        {
          text: 'Producto',
          onPress: () => handleModifProducto(),
        },
        { text: 'Lista', onPress: () => handleModifLista() },
        { text: 'Precio', onPress: () => handleModifPrecio() },
      ]
    );
  };

  //___________________________________________________________________________________
  const blurCliente = () => {
    if (
      typeof cliente !== 'undefined' &&
      cliente !== 999 &&
      tablesLoaded === true
    ) {
      const filter = (event) => {
        if (!isNaN(+cliente)) {
          return event.IdCliente == cliente;
        } else {
          return event.RazonSocial.toLowerCase().includes(
            cliente.toLowerCase()
          );
        }
      };
      const data = tablaClientes.filter(filter);
      if (data.length !== 0) {
        if (data.length === 1) {
          const newClient = [
            {
              IdCliente: parseFloat(data[0].IdCliente),
              ListaPrecios: parseFloat(data[0].ListaPrecios),
              RazonSocial: data[0].RazonSocial,
              Descuento: parseFloat(data[0].Descuento),
            },
          ];
          setSelectedCliente(newClient);
          setCliente(JSON.stringify(data[0].IdCliente));
          setRazonSocial(data[0].RazonSocial);
          setLista(JSON.stringify(data[0].ListaPrecios));
          setDescuento(JSON.stringify(data[0].Descuento));
        } else if (data.length > 1) {
          setSelecting('cliente');
          navigation.navigate('SearchResults', {
            result: data,
            callBy: 'pedidosCliente',
          });
        }
      } else {
        setCliente();
        Alert.alert('Alerta!', 'Cliente no encontrado', [
          { text: 'Cerrar Alerta', onPress: () => clienteRef.current.focus() },
        ]);
      }
    } else if (cliente == 999) {
      setRazonSocial('Sin Cliente');
      setLista('1');
      setDescuento('0');
      const clienteNN = [
        {
          IdCliente: 999,
          ListaPrecios: 1,
          RazonSocial: 'Sin Cliente',
          Descuento: 0,
        },
      ];
      setSelectedCliente(clienteNN);
    }
  };

  //___________________________________________________________________________________
  const blurProducto = () => {
    if (typeof producto !== 'undefined' && tablesLoaded === true) {
      const findProduct = (event) => {
        if (!isNaN(+producto)) {
          return event.producto == producto;
        }
      };
      const productFound = carrito.filter(findProduct);
      if (typeof produToEdit === 'undefined' && productFound.length != 0) {
        Alert.alert(
          'Alerta!',
          'Producto ya ingresado. ¿Desea Eliminar / Modificar?',
          [
            { text: 'Si', onPress: () => handleSi() },
            { text: 'No', onPress: () => handleNo() },
          ]
        );
        const handleSi = () => {
          setProducto(productFound[0].producto);
          setDescription(productFound[0].descripcion.toLowerCase());
          setPrecio(productFound[0].precio);
          setCantidad(productFound[0].cantidad);
          setImporte(productFound[0].importe);
          setModifElim(true);
          cantidadRef.current.focus();
        };
        const handleNo = () => {
          setProducto();
          setCantidad();
          setPrecio();
          setImporte();
          productoRef.current.focus();
        };
      } else {
        const filter = (event) => {
          if (!isNaN(+producto)) {
            return event.IdProducto == producto;
          } else {
            return event.Descripcion.toLowerCase().includes(
              producto.toLowerCase()
            );
          }
        };
        const data = tablaProductos.filter(filter);
        if (data.length !== 0) {
          if (data.length === 1) {
            setProducto(JSON.stringify(data[0].IdProducto));
            setDescription(data[0].Descripcion.toLowerCase());
            if (
              selectedCliente[0].IdCliente == 999 &&
              typeof cliente !== 'undefined' &&
              typeof producto !== 'undefined'
            ) {
              if (parseFloat(data[0].Precio1) !== 0) {
                const newPrecio =
                  parseFloat(data[0].Precio1) *
                  (1 - parseFloat(descuento) / 100);
                setPrecio(newPrecio.toFixed(2));
              } else {
                handlePrecioCero();
                setPrecio();
              }
            } else if (
              selectedCliente[0].IdCliente != 999 &&
              typeof cliente !== 'undefined' &&
              typeof producto !== 'undefined' &&
              lista == selectedCliente[0].ListaPrecios
            ) {
              const lista = selectedCliente[0].ListaPrecios;
              if (lista == 1) {
                if (parseFloat(data[0].Precio1) !== 0) {
                  const newPrecio =
                    parseFloat(data[0].Precio1) *
                    (1 - parseFloat(descuento) / 100);
                  setPrecio(newPrecio.toFixed(2));
                } else {
                  handlePrecioCero();
                }
              } else if (lista == 2) {
                if (parseFloat(data[0].Precio2) !== 0) {
                  const newPrecio =
                    parseFloat(data[0].Precio2) *
                    (1 - parseFloat(descuento) / 100);
                  setPrecio(newPrecio.toFixed(2));
                } else {
                  handlePrecioCero();
                }
              } else if (lista == 3) {
                if (parseFloat(data[0].Precio3) !== 0) {
                  const newPrecio =
                    parseFloat(data[0].Precio3) *
                    (1 - parseFloat(descuento) / 100);
                  setPrecio(newPrecio.toFixed(2));
                } else {
                  handlePrecioCero();
                }
              } else if (lista == 4) {
                if (parseFloat(data[0].Precio4) !== 0) {
                  const newPrecio =
                    parseFloat(data[0].Precio4) *
                    (1 - parseFloat(descuento) / 100);
                  setPrecio(newPrecio.toFixed(2));
                } else {
                  handlePrecioCero();
                }
              } else if (lista == 5) {
                if (parseFloat(data[0].Precio5) !== 0) {
                  const newPrecio =
                    parseFloat(data[0].Precio5) *
                    (1 - parseFloat(descuento) / 100);
                  setPrecio(newPrecio.toFixed(2));
                } else {
                  handlePrecioCero();
                }
              } else if (lista == 6) {
                if (parseFloat(data[0].Precio6) !== 0) {
                  const newPrecio =
                    parseFloat(data[0].Precio6) *
                    (1 - parseFloat(descuento) / 100);
                  setPrecio(newPrecio.toFixed(2));
                } else {
                  handlePrecioCero();
                }
              } else if (lista == 7) {
                if (parseFloat(data[0].Precio7) !== 0) {
                  const newPrecio =
                    parseFloat(data[0].Precio7) *
                    (1 - parseFloat(descuento) / 100);
                  setPrecio(newPrecio.toFixed(2));
                } else {
                  handlePrecioCero();
                }
              }
            }
          } else if (data.length > 1) {
            setSelecting('producto');
            navigation.navigate('SearchResults', {
              result: data,
              callBy: 'pedidosProducto',
            });
          }
        } else {
          setProducto();
          Alert.alert('Alerta!', 'Producto no encontrado', [
            {
              text: 'Cerrar Alerta',
              onPress: () => productoRef.current.focus(),
            },
          ]);
        }
      }
      setEditCliente(false);
      // setEditLista(false);
      // setEditDescuento(false);
    }
  };

  //___________________________________________________________________________________
  const calcuImporte = () => {
    if (cantidad != 0 && precio != 0) {
      const importe = parseFloat(cantidad) * parseFloat(precio);
      setImporte(importe.toFixed(2));
    }
  };

  //_______________
  useEffect(() => {
    if (typeof cantidad !== 'undefined' && typeof precio !== 'undefined') {
      calcuImporte();
    }
  }, [cantidad]);

  //___________________________________________________________________________________
  const calcuTotal = () => {
    if (typeof carrito === 'undefined' || carrito == '') {
      if (cantidad !== 0 && precio !== 0) {
        setTotal(importe.toFixed(2));
      }
    } else {
      if (cantidad != 0 && precio != 0) {
        const sum = carrito.reduce((result, item) => {
          return result + parseFloat(item.importe);
        }, 0);
        setTotal(sum.toFixed(2));
      }
    }
  };

  //_______________
  useEffect(() => {
    if (carrito.length !== 0) {
      calcuTotal();
    }
  }, [carrito]);

  //___________________________________________________________________________________
  useEffect(() => {
    if (modifElim === true && cantidad == 0) {
      setPrecio('0');
      setImporte('0');
    }
  }, [cantidad]);

  //___________________________________________________________________________________
  const agregarItem = () => {
    if (typeof cliente === 'undefined') {
      Alert.alert('Error!', 'Complete el Cliente', [
        { text: 'Cerrar Alerta', onPress: () => clienteRef.current.focus() },
      ]);
    } else if (typeof producto === 'undefined') {
      Alert.alert('Error!', 'Complete el Producto', [
        { text: 'Cerrar Alerta', onPress: () => productoRef.current.focus() },
      ]);
    } else if (typeof cantidad === 'undefined') {
      Alert.alert('Error!', 'Complete la Cantidad', [
        { text: 'Cerrar Alerta', onPress: () => cantidadRef.current.focus() },
      ]);
    } else if (typeof lista === 'undefined') {
      Alert.alert('Error!', 'Complete la Lista', [
        { text: 'Cerrar Alerta', onPress: () => listaRef.current.focus() },
      ]);
    } else if (typeof precio === 'undefined') {
      Alert.alert('Error!', 'Complete el Precio', [
        { text: 'Cerrar Alerta', onPress: () => precioRef.current.focus() },
      ]);
    } else if (typeof descuento === 'undefined') {
      Alert.alert('Error!', 'Complete el Descuento', [
        { text: 'Cerrar Alerta', onPress: () => descuentoRef.current.focus() },
      ]);
    } else if (
      typeof cliente !== 'undefined' &&
      typeof producto !== 'undefined' &&
      typeof cantidad !== 'undefined' &&
      typeof lista !== 'undefined' &&
      typeof precio !== 'undefined' &&
      typeof descuento !== 'undefined' &&
      modifElim === true
    ) {
      if (cantidad == 0) {
        const newCarrito = carrito.filter((item) => {
          return item.producto != producto;
        });
        setCarrito(newCarrito);
      } else if (precio != 0 && cantidad != 0) {
        setCarrito(
          carrito.map((val) => {
            return val.producto == producto
              ? {
                  cliente: cliente,
                  razonSocial: razonSocial,
                  producto: producto,
                  cantidad: cantidad,
                  descripcion: description,
                  lista: lista,
                  precio: precio,
                  importe: importe,
                  descuento: descuento,
                }
              : val;
          })
        );
      }
      setProducto();
      setCantidad();
      setDescription();
      setPrecio();
      setImporte();
      setModifElim(false);
      productoRef.current.focus();
    } else if (
      typeof cliente !== 'undefined' &&
      typeof producto !== 'undefined' &&
      typeof cantidad !== 'undefined' &&
      typeof precio !== 'undefined' &&
      typeof descuento !== 'undefined' &&
      cantidad != 0 &&
      precio != 0 &&
      modifElim === false
    ) {
      const newCarrito = [
        ...carrito,
        {
          cliente: cliente,
          razonSocial: razonSocial,
          producto: producto,
          cantidad: cantidad,
          descripcion: description,
          lista: lista,
          precio: precio,
          importe: importe,
          descuento: descuento,
        },
      ];
      setCarrito(newCarrito);
      setProducto();
      setCantidad();
      setDescription();
      setPrecio();
      setImporte();
      productoRef.current.focus();
    }
  };

  //___________________________________________________________________________________
  const enviarItemsPedidos = async (event) => {
    if (connectionStatus === true) {
      for (let i = 0; i < event.length; i++) {
        const item = {
          IdPedido: event[i].IdPedido,
          IdCliente: event[i].IdCliente,
          IdProducto: event[i].IdProducto,
          CantPedido: event[i].CantPedido,
          CantPendiente: event[i].CantPendiente,
          Precio: event[i].Precio,
          Importe: event[i].Importe,
          FechaCpte: event[i].FechaCpte,
          Observaciones: event[i].Observaciones,
          FechaEntrega: event[i].FechaEntrega,
          IdForPago: event[i].IdForPago,
          Descuento: event[i].Descuento,
          IdVendedor: event[i].IdVendedor,
          Porcboni: event[i].Porcboni,
          Bonificacion: event[i].Bonificacion,
          Generado: event[i].Generado,
        };
        let source = Axios.CancelToken.source();
        const urlAxiosRequest = 'http://' + ipBackend + ':3001/pedido';
        try {
          await Axios.post(urlAxiosRequest, item, {
            cancelToken: source.token,
          });
        } catch (error) {
          if (Axios.isCancel(error)) {
          } else {
            throw error;
          }
        } finally {
          const itemTag = {
            idPedido: event[i].IdPedido,
            idProducto: event[i].IdProducto,
          };
          queryEnviado.push(itemTag);
        }
      }
    }
    setPerformPedidoCheck(true);
  };

  //_______________
  useEffect(() => {
    if (connectivityCheckDone === true) {
      enviarItemsPedidos(itemsPedBeingSent);
    }
  }, [connectivityCheckDone]);

  //___________________________________________________________________________________
  const generarPedido = () => {
    setEnviarPedido(false);
    if (carrito.length !== 0) {
      for (let i = 0; i < carrito.length; i++) {
        const item = {
          IdPedido: numeroPedido,
          IdCliente: cliente,
          IdProducto: carrito[i].producto,
          CantPedido: carrito[i].cantidad,
          CantPendiente: carrito[i].cantidad,
          Precio: carrito[i].precio,
          Importe: carrito[i].importe,
          FechaCpte: fecha,
          Observaciones: '-',
          FechaEntrega: fecha,
          IdForPago: 'FP01',
          Descuento: 0,
          IdVendedor: 1,
          Porcboni: 0,
          Bonificacion: 0,
          Generado: 1,
        };
        itemsPedidos.push(item);
      }
    }
    for (let i = 0; i < itemsPedidos.length; i++) {
      const itemTag = {
        idPedido: itemsPedidos[i].IdPedido,
        idProducto: itemsPedidos[i].IdProducto,
      };
      querySaliente.push(itemTag);
    }
    setItemsPedBeingSent(itemsPedidos);
    connectivityCheck();
  };

  //_______________
  useEffect(() => {
    if (carrito.length !== 0) {
      if (enviarPedido === true) {
        if (ipRequestDone === true) {
          if (typeof producto !== 'undefined') {
            Alert.alert(
              'Alerta!! - Hay un producto ingresado.',
              '¿Desea Descartar y Enviar / O Continuar con la Carga?',
              [
                { text: 'Descartar y Enviar', onPress: () => generarPedido() },
                {
                  text: 'Continuar',
                  onPress: () => cantidadRef.current.focus(),
                },
              ]
            );
          } else {
            generarPedido();
          }
        }
      }
    }
  }, [enviarPedido]);

  //___________________________________________________________________________________
  const checkPedidoSent = async () => {
    if (querySaliente.length === queryEnviado.length) {
      setEditCliente(true);
      setEditLista(true);
      setEditDescuento(true);
      setCleanUpAll(true);
    } else if (querySaliente.length !== queryEnviado.length) {
      if (queryEnviado.length === 0) {
        setQueryEnviado([]);
      }
      for (let i = 0; i < querySaliente.length; i++) {
        const tagItemSal = {
          idPedido: querySaliente[i].idPedido,
          idProducto: querySaliente[i].idProducto,
        };
        const checkQuerySent = queryEnviado.some((item) => {
          return (
            item.idPedido == tagItemSal.idPedido &&
            item.idProducto == tagItemSal.idProducto
          );
        });
        if (checkQuerySent === false) {
          queryEnCola.push(tagItemSal);
        }
      }
    }
    setSavePedCola(true);
    setPerformPedidoCheck(false);
  };

  //_______________
  useEffect(() => {
    if (performPedidoCheck === true) {
      checkPedidoSent();
    }
  }, [performPedidoCheck]);

  //___________________________________________________________________________________
  const savePedidosEnCola = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('hayQueryEnCola');
      if (jsonValue != null) {
        const newQueryToSend = JSON.parse(jsonValue);
        queryToSend.push(...newQueryToSend);
      }
    } catch (error) {
      console.log(error);
    }
    const newQueryToSend = [...queryToSend, ...queryEnCola];
    try {
      await AsyncStorage.setItem(
        'hayQueryEnCola',
        JSON.stringify(newQueryToSend)
      );
    } catch (error) {
      console.log(error);
    }
    for (let i = 0; i < queryEnCola.length; i++) {
      const tagItemSal = {
        idPedido: queryEnCola[i].idPedido,
        idProducto: queryEnCola[i].idProducto,
      };
      const item = {
        IdPedido: itemsPedidos[i].IdPedido,
        IdCliente: itemsPedidos[i].IdCliente,
        IdProducto: itemsPedidos[i].IdProducto,
        CantPedido: itemsPedidos[i].CantPedido,
        CantPendiente: itemsPedidos[i].CantPendiente,
        Precio: itemsPedidos[i].Precio,
        Importe: itemsPedidos[i].Importe,
        FechaCpte: itemsPedidos[i].FechaCpte,
        Observaciones: itemsPedidos[i].Observaciones,
        FechaEntrega: itemsPedidos[i].FechaEntrega,
        IdForPago: itemsPedidos[i].IdForPago,
        Descuento: itemsPedidos[i].Descuento,
        IdVendedor: itemsPedidos[i].IdVendedor,
        Porcboni: itemsPedidos[i].Porcboni,
        Bonificacion: itemsPedidos[i].Bonificacion,
        Generado: itemsPedidos[i].Generado,
      };
      try {
        await AsyncStorage.setItem(
          JSON.stringify(tagItemSal),
          JSON.stringify(item)
        );
      } catch (error) {
        console.log(error);
      }
    }
    setEditCliente(true);
    setEditLista(true);
    setEditDescuento(true);
    setCleanUpAll(true);
    setSavePedCola(false);
    setSomeQueryQueue(true);
    changeNumeroPedido(numeroPedido + 1);
    handleConnectivityCheckDone(false);
  };

  //_______________
  useEffect(() => {
    if (savePedCola === true) {
      savePedidosEnCola();
    }
  }, [savePedCola]);

  //___________________________________________________________________________________
  const sendQueryEnCola = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('hayQueryEnCola');
      if (jsonValue != null) {
        const queryWaiting = JSON.parse(jsonValue);
        queryBeingSent.push(...queryWaiting);
      }
    } catch (error) {
      console.log(error);
    }
    if (queryBeingSent.length !== 0) {
      for (let i = 0; i < queryBeingSent.length; i++) {
        const tagItemToSend = {
          idPedido: queryBeingSent[i].idPedido,
          idProducto: queryBeingSent[i].idProducto,
        };
        try {
          const jsonValue = await AsyncStorage.getItem(
            JSON.stringify(tagItemToSend)
          );
          if (jsonValue != null) {
            const newItemToSend = JSON.parse(jsonValue);
            itemToSend.push(newItemToSend);
          }
        } catch (error) {
          console.log(error);
        }
      }
      const enviarItemsEnCola = async (itemToSend) => {
        for (let i = 0; i < itemToSend.length; i++) {
          const idPed = itemToSend[i].IdPedido;
          if (i === 0) {
            const newNumeroPedido = numeroPedido;
            numPedBeingSent.push(newNumeroPedido);
          } else if (i > 0) {
            const previousIdPed = itemToSend[i - 1].IdPedido;
            if (idPed == previousIdPed) {
              const newNumeroPedido = numPedBeingSent[i - 1];
              numPedBeingSent.push(newNumeroPedido);
            } else {
              const newNumeroPedido = numPedBeingSent[i - 1] + 1;
              numPedBeingSent.push(newNumeroPedido);
            }
          }
        }
        for (let i = 0; i < itemToSend.length; i++) {
          const item = {
            IdPedido: numPedBeingSent[i],
            IdCliente: itemToSend[i].IdCliente,
            IdProducto: itemToSend[i].IdProducto,
            CantPedido: itemToSend[i].CantPedido,
            CantPendiente: itemToSend[i].CantPendiente,
            Precio: itemToSend[i].Precio,
            Importe: itemToSend[i].Importe,
            FechaCpte: itemToSend[i].FechaCpte,
            Observaciones: itemToSend[i].Observaciones,
            FechaEntrega: itemToSend[i].FechaEntrega,
            IdForPago: itemToSend[i].IdForPago,
            Descuento: itemToSend[i].Descuento,
            IdVendedor: itemToSend[i].IdVendedor,
            Porcboni: itemToSend[i].Porcboni,
            Bonificacion: itemToSend[i].Bonificacion,
            Generado: itemToSend[i].Generado,
          };
          let source = Axios.CancelToken.source();
          const urlAxiosRequest = 'http://' + ipBackend + ':3001/pedido';
          try {
            await Axios.post(urlAxiosRequest, item, {
              cancelToken: source.token,
            });
          } catch (error) {
            if (Axios.isCancel(error)) {
            } else {
              throw error;
            }
          } finally {
            const itemTag = {
              idPedido: itemToSend[i].IdPedido,
              idProducto: itemToSend[i].IdProducto,
            };
            queryEnviado.push(itemTag);
          }
        }
        setRemoveItemsLS(true);
        setSomeQueryQueue(false);
      };
      enviarItemsEnCola(itemToSend);
      changeNumeroPedido(numPedBeingSent[numPedBeingSent.length - 1] + 1);
    }
  };

  //_______________
  useEffect(() => {
    if (someQueryQueue === true) {
      if (
        connectionStatus === true &&
        getNumPedDone === true &&
        ipRequestDone === true
      ) {
        sendQueryEnCola();
      }
    }
  }, [connectionStatus, getNumPedDone, ipRequestDone, someQueryQueue]);

  //___________________________________________________________________________________
  const removeItemsStoraged = async () => {
    for (let i = 0; i < queryBeingSent.length; i++) {
      const tagItemSal = {
        idPedido: queryBeingSent[i].idPedido,
        idProducto: queryBeingSent[i].idProducto,
      };
      const checkQuerySent = queryEnviado.some((item) => {
        return (
          item.idPedido == tagItemSal.idPedido &&
          item.idProducto == tagItemSal.idProducto
        );
      });
      console.log(checkQuerySent);
      if (checkQuerySent === true) {
        try {
          await AsyncStorage.removeItem(JSON.stringify(tagItemSal));
        } catch (error) {
          console.log(error);
        }
      }
    }
    try {
      await AsyncStorage.removeItem('hayQueryEnCola');
    } catch (error) {
      console.log(error);
    }
    setRemoveItemsLS(false);
    setEditCliente(true);
    setEditLista(true);
    setEditDescuento(true);
    setCleanUpAll(true);
  };

  //_______________
  useEffect(() => {
    if (removeItemsLS === true) {
      removeItemsStoraged();
    }
  }, [removeItemsLS]);

  //___________________________________________________________________________________
  const cleanUp = () => {
    setCantidad();
    setCarrito([]);
    setCliente();
    setDescription();
    setDescuento();
    setImporte();
    setItemsPedidos([]);
    setItemToSend([]);
    // dev --> chequear impactando en la base si hay que descomentar la proxima linea
    // setItemsPedBeingSent([]);
    setLista();
    setPrecio();
    setProducto();
    setNumPedBeingSent([]);
    setQueryBeingSent([]);
    setQueryEnCola([]);
    setQueryEnviado([]);
    setQuerySaliente([]);
    setQueryToSend([]);
    setRazonSocial();
    setSelectedCliente([]);
    setTotal();
    clienteRef.current.focus();
    setCleanUpAll(false);
  };

  //_______________
  useEffect(() => {
    if (cleanUpAll === true) {
      cleanUp();
    }
  }, [cleanUpAll]);

  //___________________________________________________________________________________
  const handleActualPed = () => {
    productoRef.current.focus();
  };

  //_______________________________
  const handleDescartarlo = () => {
    setEditCliente(true);
    setEditLista(true);
    setEditDescuento(true);
    setCleanUpAll(true);
  };

  //____________________________
  const handleEnviarlo = () => {
    if (carrito.length !== 0) {
      if (ipRequestDone === true) {
        setEnviarPedido(true);
      }
    } else {
      setEditCliente(true);
      setEditLista(true);
      setEditDescuento(true);
      setCleanUpAll(true);
    }
  };

  //________________________________
  const nuevoPedidoTouched = () => {
    if (
      typeof cliente !== 'undefined' ||
      typeof producto !== 'undefined' ||
      carrito.length !== 0
    ) {
      Alert.alert(
        'Alerta! - Hay un pedido cargado.',
        '¿Desea Continuar con el Actual?  ¿Descartarlo?  ¿Enviarlo?',
        [
          { text: 'Continuar', onPress: () => handleActualPed() },
          { text: 'Descartar', onPress: () => handleDescartarlo() },
          { text: 'Enviar', onPress: () => handleEnviarlo() },
        ]
      );
    }
  };

  //___________________________________________________________________________________
  const carritoTouched = () => {
    if (carrito.length !== 0) {
      setSelecting('carrito');
      navigation.navigate('SearchResults', {
        result: carrito,
        callBy: 'pedidosCarrito',
      });
    }
  };

  //___________________________________________________________________________________
  const enviarPedidoTouched = () => {
    setEnviarPedido(true);
  };

  //___________________________________________________________________________________

  //___________________________________________________________________________________
  //___________________________________________________________________________________
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          {/* Row 1 */}
          {/* <View style={styles.tittleSection}>
            {!razonSocial ? (
              <View
                style={[styles.tittleWrapper, { justifyContent: 'center' }]}
              >
                <Text style={styles.tittle}>Pedidos</Text>
              </View>
            ) : (
              <View style={styles.tittleWrapper}>
                <Text style={styles.subTittle}>{razonSocial}</Text>
              </View>
            )}
          </View> */}
          {/* Row 2 */}
          <View style={styles.rowWrapper}>
            <View style={styles.labelWrapper}>
              <Text style={styles.label}>Cliente</Text>
            </View>
            <View style={styles.boxWrapper}>
              <TextInput
                editable={editCliente}
                onBlur={() => blurCliente()}
                onChangeText={clienteHandler}
                placeholder={''}
                ref={clienteRef}
                style={[styles.box, { width: 200 }]}
                underlineColorAndroid='transparent'
                value={cliente || ''}
              />
            </View>
          </View>
          {/* Row 3 */}
          <View style={styles.rowWrapper}>
            <View style={styles.labelWrapper}>
              <Text style={styles.label}>Lista</Text>
            </View>
            <View style={[styles.boxWrapper, {}]}>
              <TextInput
                editable={editLista}
                keyboardType='numeric'
                ref={listaRef}
                maxLength={1}
                onChangeText={listaHandler}
                placeholder={''}
                style={[
                  styles.box,
                  { width: 75, alignSelf: 'flex-start', marginLeft: 15 },
                ]}
                underlineColorAndroid='transparent'
                value={lista || ''}
              />
            </View>
            {/* </View> */}
            {/* Row 4 */}
            {/* <View style={styles.rowWrapper}> */}
            <View style={[styles.labelWrapper, {}]}>
              <Text style={[styles.label, {}]}>Descuento</Text>
            </View>
            <View style={styles.boxWrapper}>
              <TextInput
                editable={editDescuento}
                keyboardType='numeric'
                ref={descuentoRef}
                onChangeText={descuentoHandler}
                placeholder={''}
                style={[styles.box, { width: 75 }]}
                underlineColorAndroid='transparent'
                value={descuento || ''}
              />
            </View>
          </View>
          {/* Row 5 */}
          <View style={styles.rowWrapper}>
            <View style={styles.labelWrapper}>
              <Text style={styles.label}>Producto</Text>
            </View>
            <View style={styles.boxWrapper}>
              <TextInput
                editable={editProducto}
                onBlur={() => blurProducto()}
                onChangeText={productoHandler}
                placeholder={''}
                ref={productoRef}
                style={[styles.box, { width: 200 }]}
                underlineColorAndroid='transparent'
                value={producto || ''}
              />
            </View>
          </View>
          {/* Row 6 */}
          {/* <View style={styles.descriptionWrapper}>
            <Text style={styles.description}>{description}</Text>
          </View> */}
          {/* Row 7 */}
          <View style={styles.rowWrapper}>
            <View style={styles.labelWrapper}>
              <Text style={styles.label}>Cantidad</Text>
            </View>
            <View style={styles.boxWrapper}>
              <TextInput
                editable={editCantidad}
                keyboardType='numeric'
                onChangeText={cantidadHandler}
                placeholder={''}
                ref={cantidadRef}
                style={[styles.box, { width: 200 }]}
                underlineColorAndroid='transparent'
                value={cantidad || ''}
              />
            </View>
          </View>
          {/* Row 8 */}
          <View style={styles.rowWrapper}>
            <View style={styles.labelWrapper}>
              <Text style={styles.label}>Precio</Text>
            </View>
            <View style={styles.boxWrapper}>
              <TextInput
                editable={editPrecio}
                keyboardType='numeric'
                ref={precioRef}
                onChangeText={precioHandler}
                placeholder={''}
                style={[styles.box, { width: 200 }]}
                underlineColorAndroid='transparent'
                value={precio || ''}
              />
            </View>
          </View>
          {/* Row 9 */}
          <View style={styles.rowWrapper}>
            <View style={styles.labelWrapper}>
              <Text style={styles.label}>Importe</Text>
            </View>
            <View style={styles.boxWrapper}>
              <TextInput
                editable={false}
                style={[styles.box, { width: 200 }]}
                placeholder={''}
                value={importe || ''}
                underlineColorAndroid='transparent'
              />
            </View>
          </View>
          {/* Row 10 */}
          <View style={[styles.rowWrapper, { marginLeft: 75 }]}>
            <View style={[styles.labelWrapper, {}]}>
              <Text style={[styles.label, {}]}>Agregar Item</Text>
            </View>
            <View style={[styles.btnWrapper, { marginLeft: 20 }]}>
              <TouchableOpacity
                style={[
                  styles.btnPlace,
                  {
                    backgroundColor: colors.greenBlue,
                    borderColor: colors.greenBlue,
                  },
                ]}
                onPress={() => agregarItem()}
              >
                <MaterialIcons
                  name='file-download-done'
                  size={30}
                  color={colors.white}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* Row 11 */}
          <View style={styles.totalCompraSection}>
            <View style={styles.totalCompraWrapper}>
              <Text style={styles.totalCompra}>Total</Text>
            </View>
            <View style={[styles.boxWrapper, { alignSelf: 'center' }]}>
              <TextInput
                editable={false}
                style={[
                  styles.box,
                  {
                    borderWidth: 0,
                    alignSelf: 'center',
                    fontSize: 19,
                  },
                ]}
                placeholder={''}
                value={total || ''}
                underlineColorAndroid='transparent'
              />
            </View>
          </View>
        </View>
        {/* Footer */}
        <View style={styles.footerContainer}>
          <View style={styles.btnWrapper}>
            <TouchableOpacity
              style={[styles.footerTouchable, { alignSelf: 'center' }]}
              onPress={() => {
                nuevoPedidoTouched();
              }}
            >
              <MaterialIcons name='post-add' size={30} style={styles.button} />
            </TouchableOpacity>
          </View>
          <View style={styles.btnWrapper}>
            <TouchableOpacity
              style={[styles.footerTouchable, { alignSelf: 'center' }]}
              onPress={() => {
                carritoTouched();
              }}
            >
              <MaterialIcons
                name='shopping-cart'
                size={30}
                style={styles.button}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.btnWrapper}>
            <TouchableOpacity
              style={[styles.footerTouchable, { alignSelf: 'center' }]}
              onPress={() => {
                enviarPedidoTouched();
              }}
            >
              <MaterialIcons name='send' size={30} style={styles.button} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
   // backgroundColor: colors.greenLogo,
    flex: 1,
    paddingBottom: 10,
    paddingTop: 5,
    paddingHorizontal: 10,
  },
  tittleSection: {
    backgroundColor: colors.greenBlue,
    borderRadius: 10,
    borderColor: colors.greenBlue,
    borderWidth: 3,
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 10,
    padding: 5,
  },
  tittleWrapper: {
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tittle: {
    alignSelf: 'center',
    backgroundColor: colors.white,
    borderWidth: 3,
    borderColor: colors.greenBlue,
    borderRadius: 20,
    color: colors.greenBlue,
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 4,
    paddingTop: 7,
    paddingHorizontal: 25,
    textAlign: 'center',
    marginTop: 1,
  },
  subTittle: {
    color: colors.white,
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    justifyContent: 'center',
    marginLeft: 10,
    marginVertical: 3,
    paddingBottom: 2,
    paddingHorizontal: 10,
    paddingTop: 2,
  },
  descriptionWrapper: {
    alignContent: 'flex-start',
    borderRadius: 15,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    justifyContent: 'space-around',
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 10,
    padding: 10,
    borderColor: colors.greenBlue,
    marginHorizontal: 10,
  },
  description: {
    flex: 1,
    color: colors.blue,
    fontSize: 19,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  rowWrapper: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  labelWrapper: {
    alignSelf: 'center',
  },
  label: {
    alignSelf: 'flex-start',
    color: colors.blue,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
  },
  boxWrapper: {
    alignSelf: 'flex-end',
    borderRadius: 10,
    flex: 1,
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
    paddingEnd: 10,
    paddingLeft: 10,
    textAlign: 'right',
  },
  btnWrapper: {
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  btnPlace: {
    backgroundColor: colors.blue,
    borderColor: colors.blue,
    borderRadius: 60,
    borderWidth: 3,
    justifyContent: 'center',
    height: 45,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 15,
    padding: 10,
    width: 55,
  },
  button: {
    alignSelf: 'center',
    color: colors.white,
  },
  totalCompraSection: {
    backgroundColor: colors.white,
    borderColor: colors.greenBlue,
    borderRadius: 10,
    borderWidth: 3,
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 20,
    paddingLeft: 10,
    paddingVertical: 5,
  },
  totalCompraWrapper: {
    alignContent: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  totalCompra: {
    borderRadius: 10,
    color: colors.blue,
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    padding: 5,
    paddingLeft: 35,
  },
  footerContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    //backgroundColor: colors.greenLogo,
    backgroundColor: colors.white,
    paddingBottom: 200,
  },
  footerTouchable: {
    backgroundColor: colors.blue,
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});

export default Pedidos;
