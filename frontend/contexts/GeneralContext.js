import React, { createContext, useState, useEffect } from 'react';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { Alert } from 'react-native';

const initialLoggedStatus = {
  isLogged: false,
  username: '',
  idVendedores: '',
};

const GeneralContext = createContext();

const GeneralProvider = ({ children }) => {
  //______________________________________________________________________________________
  const [ipRequestDone, setIpRequestDone] = useState(false);
  const [connected, setConnected] = useState();
  const [connecChecked, setConnecChecked] = useState(false);
  const [tablesLoaded, setTablesLoaded] = useState(false);
  const [idVendedores, setIdVendedores] = useState()
  //--------------------------------------------------------------------------------------
  const [loggedStatus, setLoggedStatus] = useState(initialLoggedStatus);
  const [ipBackend, setIpBackend] = useState();
  const [tablaTransporte, setTablaTransportes] = useState([]);

  const [tablaClaves, setTablaClaves] = useState([]);
  const [tablaClientes, setTablaClientes] = useState([]);
  const [tablaDatosComptes, setTablaDatosComptes] = useState([]);
  
  const [tablaDeuda, setTablaDeuda] = useState([]);
  const [tablaOperaMes, setTablaOperaMes] = useState([]);
  const [tablaOperaItems, setTablaOperaItems] = useState([]);
  const [tablaProductos, setTablaProductos] = useState([]);
  const [tablaParametros, setTablaParametros] = useState([]);
  const [tablaVendedores, setTablaVendedores] = useState([]);
  const [fechaContext, setFechaContext] = useState('');
  const [hora, setHora] = useState('');
  const [netInfoFetch, setNetInfoFetch] = useState(false)
  //______________________________________________________________________________________

  const [clavesUpdated, setClavesUpdated] = useState(false);
  const [clientesUpdated, setClientesUpdated] = useState(false);
  const [datosComptesUpdated, setDatosComptesUpdated] = useState(false);
  const [deudaUpdated, setDeudaUpdated] = useState(false);
  const [operaItemsUpdated, setOperaItemsUpdated] = useState(false);
  const [operaMesUpdated, setOperaMesUpdated] = useState(false);
  const [parametrosUpdated, setParametrosUpdated] = useState(false);
  const [productosUpdated, setProductosUpdated] = useState(false);
  const [transportesUpdated, setTransportesUpdated] = useState(false);
  const [vendedoresUpdated, setVendedoresUpdated] = useState(false);
 
  //______________________________________________________________________________________

  const [getClavesDone, setGetClavesDone] = useState(false);
  const [getClientesDone, setGetClientesDone] = useState(false);
  const [getDatosComptesDone, setGetDatosComptesDone] = useState(false);
  const [getParametrosDone, setGetParametrosDone] = useState(false);
  const [getOperaItemsDone, setGetOperaItemsDone] = useState(false);
  const [getOperaMesDone, setGetOperaMesDone] = useState(false);
  const [getTransportesDone, setGetTransportesDone] = useState(false);
  const [getProductosDone, setGetProductosDone] = useState(false);
  const [getVendedoresDone, setGetVendedoresDone] = useState(false);
  const [getDeudaDone, setGetDeudaDone] = useState(false);



  const [updateTables, setUpdateTables] = useState(3);
  //______________________________________________________________________________________
  // temp Check Logged Status
  useEffect(() => {
    const tempLoggedStatus = {
      isLogged: true,
      username: 'Mariano Cruz Romero',
      idVendedores: 2,
    };
    
    setLoggedStatus(tempLoggedStatus);
  }, []);

  //______________________________________________________________________________________
  const getFecha = () => {
    const hoy = new Date();
    const dd = String(hoy.getDate()).padStart(2, '0');
    const mm = String(hoy.getMonth() + 1).padStart(2, '0');
    const aa = String(hoy.getFullYear());
    const fecha = `${aa}/${mm}/${dd}`;
    setFechaContext(fecha);
  };

  const getHora = () => {
    const hoy = new Date();
    const hours = String(hoy.getHours() - 3).padStart(2, '0');
    const min = String(hoy.getMinutes()).padStart(2, '0');
    const sec = String(hoy.getSeconds()).padStart(2, '0');
    const hora = `${hours}/${min}/${sec}`;
    setHora(hora);
  };

  useEffect(() => {
    getFecha();
    getHora();
  }, []);

  //______________________________________________________________________________________
  // dev --> backend in Marcos's PC --> uncomment next four lines when working with emulator
  useEffect(() => {
   // setIpBackend('192.168.1.55');
   
    setIpBackend('192.168.0.111');//IP Marc
    setIpRequestDone(true);
    
  }, []);


 //_____________________________
 useEffect(() => {
  if (loggedStatus.isLogged === true) {
    setIdVendedores(loggedStatus.idVendedores);
  }
}, [loggedStatus]);

  const checkActualizar = () => {
    const actualizar = async () => {
      // const item = { IdDatosComptes: idVendedores };
      let source = Axios.CancelToken.source();
      const urlAxiosRequest = 'http://' + ipBackend + ':3001/updateCheck';
      try {
        // await Axios.get(urlAxiosRequest, item, {
        await Axios.get(urlAxiosRequest, {
          cancelToken: source.token,
        }).then((response) => {
          setUpdateTables(response.data[0].Actualizar);
        });
      } catch (error) {
        setUpdateTables(2);
        if (Axios.isCancel(error)) {
          console.log(error);
        } else {
          throw error;
        }
      }
    };
    actualizar();
    return () => {
      source.cancel();
    };
  };
  useEffect(() => {
    if (ipRequestDone === true) {
      checkActualizar();
    }
  }, [ipRequestDone]);

  //______________________________________________________________________________________
  useEffect(() => {
    if (updateTables !== 3) {
      if (loggedStatus.isLogged === true && updateTables === 1) {
         getClaves();
         getClientes();
         getDatosComptes();      
         getDeuda();
         getOperaItems();
         getOperaMes();
        getParametros();
         getProductos();
         getTransportes();
        getVendedores();
      } else if (loggedStatus.isLogged === true && updateTables === 0) {
        loadTablaClaves();
        loadTablaClientes();
        loadTablaDatosComptes();       
        loadTablaDeuda();
        loadTablaParametros();
        loadTablaOperaItems();
        loadTablaOperaMes();
        loadTablaTransportes();
        loadTablaProductos();
        loadTablaVendedores();
      } else if (loggedStatus.isLogged === true && updateTables === 2) {
        loadTablaClaves();
        loadTablaClientes();
        loadTablaDatosComptes();        
        loadTablaDeuda();
        loadTablaParametros();
        loadTablaOperaItems();
        loadTablaOperaMes();
        loadTablaTransportes();
        loadTablaProductos();
        loadTablaVendedores();
        Alert.alert(
          'Sin conexión a Internet',
          'Trabajando con tablas no actualizadas',
          [{ text: 'Cerrar Alerta' }]
        );
      }
    }
  }, [updateTables]);

 
  useEffect(() => {

    if (
      getClavesDone === true &&
      getClientesDone === true &&
      getDatosComptesDone === true &&     
      getDeudaDone === true &&
      getParametrosDone === true &&
      getOperaItemsDone === true &&
      getOperaMesDone === true &&
      getTransportesDone === true &&
      getProductosDone === true &&
      getVendedoresDone === true
    ) {
      console.log('hola mundo')
      setTablesLoaded(true);
    }
  }, [
    getClavesDone,
    getClientesDone,
    getDatosComptesDone,
    getDeudaDone,
    getParametrosDone,
    getOperaItemsDone,
    getOperaMesDone,
    getTransportesDone,
    getProductosDone,
    getVendedoresDone,
  ]);

  // ______________________________________________________________________________________;
  const tablesUpdateDone = async (idVendedores) => {
    const item = { IdDatosComptes: idVendedores };
    let source = Axios.CancelToken.source();
    const urlAxiosRequest = 'http://' + ipBackend + ':3001/tablesUpdateDone';
    try {
      await Axios.put(urlAxiosRequest, item, {
        cancelToken: source.token,
      });
    } catch (error) {
      if (Axios.isCancel(error)) {
      } else {
        console.log(error);
      }
    }
  };

 
  useEffect(() => {
    if (
      typeof idVendedores !== 'undefined' &&
      clavesUpdated === true &&
      clientesUpdated === true &&     
      datosComptesUpdated === true &&
      deudaUpdated === true &&
      parametrosUpdated === true &&
      operaItemsUpdated === true &&
      operaMesUpdated === true &&
      transportesUpdated === true &&
      productosUpdated === true &&
      vendedoresUpdated === true
    ) {
      console.log('hola mundo 2')
      // setTimerStop(true);  // usar para una rueda de carga, poner rueda de carga en el home
      tablesUpdateDone(idVendedores);
    }
  }, [
    idVendedores,
    clavesUpdated,
    clientesUpdated, 
    datosComptesUpdated,
    deudaUpdated,
    parametrosUpdated,
    operaItemsUpdated,
    operaMesUpdated,
    transportesUpdated,
    productosUpdated,
    vendedoresUpdated,
  ]);


  
  
  //______________________________________________________________________________________
  const loadTablaClaves = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('tablaClaves');
      if (jsonValue != null) {
        const tablaClavesParsed = JSON.parse(jsonValue);
        setTablaClaves(tablaClavesParsed);
        
      }
   
    } catch (error) {
      console.log(error);
    }finally {
      setGetClavesDone(true);
    }
  };

  //_____________________________________
  const loadTablaClientes = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('tablaClientes');
      if (jsonValue != null) {
        const tablaClientesParsed = JSON.parse(jsonValue);
        setTablaClientes(tablaClientesParsed);
      }
    } catch (error) {
      console.log(error);
    }finally {
      setGetClientesDone(true);
    }
  };

  //________________________________________
  const loadTablaDatosComptes = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('tablaDatosComptes');
      if (jsonValue != null) {
        const tablaDatosComptesParsed = JSON.parse(jsonValue);
        setTablaDatosComptes(tablaDatosComptesParsed);
      }
    } catch (error) {
      console.log(error);
    }finally {
      setGetDatosComptesDone(true);
    }
  };

  // //_________________________________________
 
  
  //______________________________________
  const loadTablaOperaItems = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('tablaOperaItems');
      if (jsonValue != null) {
        const tablaOperaItemsParsed = JSON.parse(jsonValue);
        setTablaOperaItems(tablaOperaItemsParsed);
      }
    } catch (error) {
      console.log(error);
    }finally {
      setGetOperaItemsDone(true);
    }
  };

  // //_____________________________________
  const loadTablaOperaMes = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('tablaOperaMes');
      if (jsonValue != null) {
        const tablaOperaMesParsed = JSON.parse(jsonValue);
        setTablaOperaMes(tablaOperaMesParsed);
      }
    } catch (error) {
      console.log(error);
    }finally {
      setGetOperaMesDone(true);
    }
  };

  // //_____________________________________
  const loadTablaParametros = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('tablaParametros');
      if (jsonValue != null) {
        const tablaParametrosParsed = JSON.parse(jsonValue);
        setTablaParametros(tablaParametrosParsed);
      }
    } catch (error) {
      console.log(error);
    }finally {
      setGetParametrosDone(true);
    }
  };
  //______________________________________
  const loadTablaProductos = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('tablaProductos');
      if (jsonValue != null) {
        const tablaProductosParsed = JSON.parse(jsonValue);
        setTablaProductos(tablaProductosParsed);
      }
    } catch (error) {
      console.log(error);
    }finally {
      setGetProductosDone(true);
    }
  };
    //______________________________________
    const loadTablaTransportes = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('tablaTransportes');
        if (jsonValue != null) {
          const tablaTransportesParsed = JSON.parse(jsonValue);
          setTablaTransportes(tablaTransportesParsed);
        }
      } catch (error) {
        console.log(error);
      }finally {
        setGetTransportesDone(true);
      }
    };
  //______________________________________
    const loadTablaVendedores = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('tablaVendedores');
        if (jsonValue != null) {
          const tablaVendedoresParsed = JSON.parse(jsonValue);
          setTablaVendedores(tablaVendedoresParsed);
        }
      } catch (error) {
        console.log(error);
      }finally {
        setGetVendedoresDone(true);
      }
    };
  //______________________________________

    const loadTablaDeuda = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('tablaVendedores');
        if (jsonValue != null) {
          const tablaVendedoresParsed = JSON.parse(jsonValue);
          setTablaDeuda(tablaVendedoresParsed);
        }
      } catch (error) {
        console.log(error);
      }finally {
        setGetDeudaDone(true);
      }
    };
  //______________________________________________________________________________________
  const getClaves = () => {
    removeTablaClaves();
    let source = Axios.CancelToken.source();
    const claves = async () => {
      const urlAxiosRequest = 'http://' + ipBackend + ':3001/tablaClaves';
      // dev
       console.log(urlAxiosRequest);
      try {
         console.log('lol x 2');
        await Axios.get(urlAxiosRequest, {
          cancelToken: source.token,
        }).then((response) => {
          AsyncStorage.setItem('tablaClaves', JSON.stringify(response.data));
          setTablaClaves(response.data);
          setClavesUpdated(true);
          //
          // dev
        });
      } catch (error) {
        if (Axios.isCancel(error)) {
          console.log(error);
        } else {
          // console.log('lol x 3');
          throw error;
        }
        
      }finally {
        setGetClavesDone(true);
      }
    };
    claves();
    return () => {
      source.cancel();
    };
  };

  //______________________________________________________________________________________
  const getClientes = () => {
    removeTablaClientes();
    let source = Axios.CancelToken.source();
    const clientes = async () => {
      const urlAxiosRequest = 'http://' + ipBackend + ':3001/tablaClientes';
      try {
        console.log(clientes)
        await Axios.get(urlAxiosRequest, {
          cancelToken: source.token,
        }).then((response) => {
          AsyncStorage.setItem('tablaClientes', JSON.stringify(response.data));
          setTablaClientes(response.data);
          setClientesUpdated(true);
        });
      } catch (error) {
        if (Axios.isCancel(error)) {
          console.log(error);
        } else {
          ;
          throw error;
        }
      }finally {
        setGetClientesDone(true);
      }
    };
    clientes();
    return () => {
      source.cancel();
    };
  };

  // //______________________________________________________________________________________
  const getDatosComptes = () => {
    removeTablaDatosComptes();
    let source = Axios.CancelToken.source();
    const datosComptes = async () => {
      const urlAxiosRequest = 'http://' + ipBackend + ':3001/tablaDatosComptes';
      try {
        await Axios.get(urlAxiosRequest, {
          cancelToken: source.token,
        }).then((response) => {
          AsyncStorage.setItem(
            'tablaDatosComptes',
            JSON.stringify(response.data)
          );
          setTablaDatosComptes(response.data);
          setDatosComptesUpdated(true);
        });
      } catch (error) {
        if (Axios.isCancel(error)) {
          console.log(error);
        } else {
          throw error;
        }
      }finally {
        setGetDatosComptesDone(true);
      }
    };
    datosComptes();
    return () => {
      source.cancel();
    };
  };

  // //______________________________________________________________________________________
  const getDeuda = () => {
    removeTablaDeuda();
    let source = Axios.CancelToken.source();
    const deuda = async () => {
      const urlAxiosRequest = 'http://' + ipBackend + ':3001/tablaDeuda';
      try {
        await Axios.get(urlAxiosRequest, {
          cancelToken: source.token,
        }).then((response) => {
          AsyncStorage.setItem(
            'tablaDeuda',
            JSON.stringify(response.data)
          );
          setTablaDeuda(response.data);
          setDeudaUpdated(true);
        });
      } catch (error) {
        if (Axios.isCancel(error)) {
          console.log(error);
        } else {
          throw error;
        }
      }finally {
        setGetDeudaDone(true);
      }
    };
    deuda();
    return () => {
      source.cancel();
    };
  };


  // //______________________________________________________________________________________
  
  const getOperaItems = () => {
    removeTablaOperaItems();
    let source = Axios.CancelToken.source();
    const operaItems = async () => {
      const urlAxiosRequest = 'http://' + ipBackend + ':3001/tablaOperaItems';
      try {
        await Axios.get(urlAxiosRequest, {
          cancelToken: source.token,
        }).then((response) => {
          AsyncStorage.setItem(
            'tablaOperaItems',
            JSON.stringify(response.data)
          );
          setTablaOperaItems(response.data);
          setOperaItemsUpdated(true);
        });
      } catch (error) {
        if (Axios.isCancel(error)) {
          console.log(error);
        } else {
          throw error;
        }
      }finally {
        setGetOperaItemsDone(true);
      }
    };
    operaItems();
    return () => {
      source.cancel();
    };
  };

  // //______________________________________________________________________________________
  const getOperaMes = () => {
    removeTablaOperaMes();
    let source = Axios.CancelToken.source();
    const operaMes = async () => {
      const urlAxiosRequest = 'http://' + ipBackend + ':3001/tablaOperaMes';
      try {
        await Axios.get(urlAxiosRequest, {
          cancelToken: source.token,
        }).then((response) => {
          AsyncStorage.setItem('tablaOperaMes', JSON.stringify(response.data));
          setTablaOperaMes(response.data);
          setOperaMesUpdated(true);
        });
      } catch (error) {
        if (Axios.isCancel(error)) {
          console.log(error);
        } else {
          throw error;
        }
      }finally {
        setGetOperaMesDone(true);
      }
    };
    operaMes();
    return () => {
      source.cancel();
    };
  };

  // //______________________________________________________________________________________
  const getParametros = () => {
    removeTablaParametros();
    let source = Axios.CancelToken.source();
    const parametros = async () => {
      const urlAxiosRequest = 'http://' + ipBackend + ':3001/tablaParametros';
      try {
        await Axios.get(urlAxiosRequest, {
          cancelToken: source.token,
        }).then((response) => {
          AsyncStorage.setItem('tablaParametros', JSON.stringify(response.data));
          setTablaParametros(response.data);
          setParametrosUpdated(true);
        });
      } catch (error) {
        if (Axios.isCancel(error)) {
          console.log(error);
        } else {
          throw error;
        }
      }finally {
        setGetParametrosDone(true);
      }
    };
    parametros();
    return () => {
      source.cancel();
    };
  };

  //______________________________________________________________________________________
  const getProductos = () => {
    removeTablaProductos();
    let source = Axios.CancelToken.source();
    const productos = async () => {
      const urlAxiosRequest = 'http://' + ipBackend + ':3001/tablaProductos';
      try {
        await Axios.get(urlAxiosRequest, {
          cancelToken: source.token,
        }).then((response) => {
          AsyncStorage.setItem('tablaProductos', JSON.stringify(response.data));
          setTablaProductos(response.data);
          setProductosUpdated(true);
          
        });
      } catch (error) {
        if (Axios.isCancel(error)) {
          console.log(error);
        } else {
          throw error;
        }
      }finally {
        setGetProductosDone(true);
      }
    };
    productos();
    return () => {
      source.cancel();
    };
  };
  // //______________________________________________________________________________________
  const getTransportes = () => {
    removeTablaTransporte();
    let source = Axios.CancelToken.source();
    const transporte = async () => {
      const urlAxiosRequest = 'http://' + ipBackend + ':3001/tablaTransporte';
          // dev
      //console.log(urlAxiosRequest);
      try {
        await Axios.get(urlAxiosRequest, {
        
          cancelToken: source.token,
        }).then((response) => {
          AsyncStorage.setItem('tablaTransporte', JSON.stringify(response.data));
          setTablaTransportes(response.data);
          setTransportesUpdated(true);
        });
      } catch (error) {
        if (Axios.isCancel(error)) {
          console.log(error);
        } else {
          throw error;
        }
      }finally {
        setGetTransportesDone(true);
      }
    };
    transporte();
    return () => {
      source.cancel();
    };
  };

  // //___________________________________________________________________________________
  const getVendedores = () => {
    removeTablaVendedores();
    let source = Axios.CancelToken.source();
    const vendedores = async () => {
      const urlAxiosRequest = 'http://' + ipBackend + ':3001/tablaVendedores';
      try {
        await Axios.get(urlAxiosRequest, {
          cancelToken: source.token,
        }).then((response) => {
          AsyncStorage.setItem('tablaVendedores', JSON.stringify(response.data));
          setTablaVendedores(response.data);
          setVendedoresUpdated(true);
        });
      } catch (error) {
        if (Axios.isCancel(error)) {
          console.log(error);
        } else {
          throw error;
        }
      }finally {
        setGetVendedoresDone(true);
      }
    };
    vendedores();
    return () => {
      source.cancel();
    };
  };

  // //______________________________________________________________________________________

  //______________________________________________________________________________________
  const removeTablaClaves = async () => {
    try {
      await AsyncStorage.removeItem('tablaClaves');
    } catch (error) {
      console.log(error);
    }
  };
  
  // //_______________________________________
  const removeTablaClientes = async () => {
    try {
      await AsyncStorage.removeItem('tablaClientes');
    } catch (error) {
      console.log(error);
    }
  };

  // //__________________________________________
  const removeTablaDatosComptes = async () => {
    try {
      await AsyncStorage.removeItem('tablaDatosComptes');
    } catch (error) {
      console.log(error);
    }
  };

  // //___________________________________________
  const removeTablaDeuda = async () => {
    try {
      await AsyncStorage.removeItem('tablaDeuda');
    } catch (error) {
      console.log(error);
    }
  };


  // //_________________________________________
  const removeTablaVendedores = async () => {
    try {
      await AsyncStorage.removeItem('tablaVendedores');
    } catch (error) {
      console.log(error);
    }
  };

  // //_________________________________________
  const removeTablaOperaItems = async () => {
    try {
      await AsyncStorage.removeItem('tablaOperaItems');
    } catch (error) {
      console.log(error);
    }
  };

  //_______________________________________
  const removeTablaOperaMes = async () => {
    try {
      await AsyncStorage.removeItem('tablaOperaMes');
    } catch (error) {
      console.log(error);
    }
  };

  // //______________________________________
  const removeTablaParametros = async () => {
    try {
      await AsyncStorage.removeItem('tablaParametros');
    } catch (error) {
      console.log(error);
    }
  };

  //________________________________________
  const removeTablaProductos = async () => {
    try {
      await AsyncStorage.removeItem('tablaProductos');
    } catch (error) {
      console.log(error);
    }
  };
 //________________________________________
 const removeTablaTransporte = async () => {
  try {
    await AsyncStorage.removeItem('tablaTransporte');
  } catch (error) {
    console.log(error);
  }
};
  //___________________________________________________________________________________
 useEffect(() => {
  connectivityCheck();
}, []);

const connectivityCheck = () => {
  setConnected();
  setConnecChecked(false);
  setNetInfoFetch(true);
};

useEffect(() => {
  if (typeof connected !== 'undefined' && connected !== '') {
    // if (connected === false) {
    //   Alert.alert('Alerta!', 'Trabajando sin conexión a Internet', [
    //     { text: 'Cerrar' },
    //   ]);
    // }
    setConnecChecked(true);
  }
}, [connected]);

useEffect(() => {
  if (netInfoFetch === true) {
    const checkConnection = async () => {
      try {
        await NetInfo.fetch().then((res) => {
          setConnected(res.isConnected);
          
        });
      } catch (error) {
        console.log(error);
      } finally {
        // setConnecChecked(true);
        setNetInfoFetch(false);
      }
    };
    checkConnection();
  }
}, [netInfoFetch]);
 
  

  //___________________________________________________________________________________

  //______________________________________________________________________________________
  // data: states & functions exported by the provider
  const data = {
    connecChecked,
    connected,
    connectivityCheck,
    fechaContext,
    //getClientes,
    getHora,
    hora,
    ipBackend,
    ipRequestDone,
    loggedStatus,
    tablaClaves,
    tablaTransporte,
    tablaClientes,
    tablaDatosComptes,
    tablaDeuda,
    tablaDeuda,
    tablaVendedores,
    tablaOperaItems,
    tablaOperaMes,
    tablaParametros,
    tablaProductos,
    tablesLoaded,
  };

  return (
    <GeneralContext.Provider value={data}>{children}</GeneralContext.Provider>
  );
};

export { GeneralProvider };
export default GeneralContext;
