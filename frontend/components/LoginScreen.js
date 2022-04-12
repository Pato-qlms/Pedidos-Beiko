import React, { useState, useEffect, useContext, useRef } from 'react';
import {
  Alert,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import colors from '../assets/colors';
import GeneralContext from '../contexts/GeneralContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const initialUserData = {
  username: '',
  password: '',
};

const PedidosSceen = () => {
  //______________________________________________________________________________________
  const { ipBackend, ipRequestDone, handleIsLogged, handleUpdateTables } =
    useContext(GeneralContext);

  //______________________________________________________________________________________
  const [user, setUser] = useState();
  const [pass, setPass] = useState();
  const [userData, setUserData] = useState(initialUserData);
  const [usersList, setUsersList] = useState([]);
  const [loginCheck, setLoginCheck] = useState(false);

  //______________________________________________________________________________________
  const usuarioRef = useRef();

  //______________________________________________________________________________________
  const userHandler = (user) => {
    if (typeof user !== 'undefined') {
      setUser(user);
      const changedName = {
        ...userData,
        username: user,
      };
      setUserData(changedName);
    }
  };

  const passHandler = (pass) => {
    if (typeof pass !== 'undefined') {
      setPass(pass);
      const changedPass = {
        ...userData,
        password: pass,
      };
      setUserData(changedPass);
    }
  };

  //______________________________________________________________________________________
  useEffect(() => {
    if (ipRequestDone === true) {
      let source = Axios.CancelToken.source();
      const getUsers = async () => {
        const urlAxiosRequest = 'http://' + ipBackend + ':3001/usersList';
        try {
          await Axios.get(urlAxiosRequest, {
            cancelToken: source.token,
          }).then((response) => {
            setUsersList(response.data);
          });
        } catch (error) {
          if (Axios.isCancel(error)) {
          } else {
            console.log('lol x Bad! :/');
            throw error;
          }
        }
      };
      getUsers();
      return () => {
        source.cancel();
      };
    }
  }, [ipRequestDone]);

  const loginHandler = () => {
    setLoginCheck(true);
  };

  //______________________________________________________________________________________
  useEffect(() => {
    if (usersList.length !== 0 && loginCheck === true) {
      let source = Axios.CancelToken.source();
      const saveUserInfo = async () => {
        const userInfo = {
          username: userData.username,
          isLogged: true,
        };
        try {
          await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        } catch (error) {
          console.log(error);
        }
        setLoginCheck(false);
        handleIsLogged(userInfo);
        handleUpdateTables();
      };

      const handleNotRegister = () => {
        setUser();
        setPass();
        setLoginCheck(false);
        setUserData(initialUserData);
        usuarioRef.current.focus();
      };

      const isRegistered = usersList.some(function (user) {
        return (
          user.Usuario.toLowerCase() === userData.username.toLowerCase() &&
          user.Pwd === userData.password
        );
      });
      if (isRegistered) {
        saveUserInfo();
      } else {
        Alert.alert('Alerta!', 'Usuario y/o Contraseña Incorrecta', [
          { text: 'Cerrar', onPress: () => handleNotRegister() },
        ]);
      }
      return () => {
        source.cancel();
      };
    }
  }, [usersList, loginCheck]);

  //______________________________________________________________________________________
  //______________________________________________________________________________________
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image
            style={[{ height: 175, width: 175 }]}
            source={require('../assets/adaptive-icon.png')}
          />
        </View>
        <View style={styles.main}>
          <View style={styles.rowContainer}>
            <TextInput
              onChangeText={userHandler}
              placeholder={'Usuario'}
              ref={usuarioRef}
              style={[styles.box, { width: '80%' }]}
              underlineColorAndroid='transparent'
              value={user || ''}
            />
          </View>
          <View style={styles.rowContainer}>
            <TextInput
              onChangeText={passHandler}
              placeholder={'Contraseña'}
              secureTextEntry={true}
              style={[styles.box, { width: '80%' }]}
              underlineColorAndroid='transparent'
              value={pass || ''}
            />
          </View>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              style={styles.loginTouchable}
              onPress={loginHandler}
            >
              <View style={styles.loginBtn}>
                <Text style={styles.loginBtnText}>Log In</Text>
              </View>
              <View style={styles.iconContainer}>
                <Icon name='login' color={colors.white} size={35} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bannerContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>powered by</Text>
          </View>
          <View style={styles.bannerImage}>
            <Image source={require('../assets/banner_75percent.png')} />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.greenLogo,
    height: '100%',
    width: '100%',
  },
  logo: {
    alignSelf: 'center',
    marginTop: 60,
  },
  main: {
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  box: {
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: colors.greenBlue,
    color: colors.blue,
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  loginTouchable: {
    alignSelf: 'center',
    borderRadius: 15,
    backgroundColor: colors.blue,
    flexDirection: 'row',
    marginTop: 20,
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginBottom: 50,
  },
  loginBtn: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  loginBtnText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: colors.white,
  },
  iconContainer: {
    alignItems: 'flex-end',
    marginLeft: 25,
  },
  bannerContainer: {
    alignSelf: 'flex-end',
    backgroundColor: colors.white,
    width: '100%',
    justifyContent: 'flex-end',
    paddingRight: 30,
    paddingTop: 15,
  },
  textContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  text: {
    alignItems: 'flex-end',
    color: colors.metallicGrey,
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
    justifyContent: 'center',
    paddingBottom: 2,
    paddingRight: 5,
  },
  bannerImage: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});

export default PedidosSceen;
