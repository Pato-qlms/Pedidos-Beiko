import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import colors from '../assets/colors';

const Home = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image
          style={[{ height: 300, width: 300 }]}
          source={require('../assets/adaptive-icon.png')}
        />
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  logo: {
    flex: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerContainer: {
    flex: 1,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: 20,
    marginRight: 20,
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

export default Home;
