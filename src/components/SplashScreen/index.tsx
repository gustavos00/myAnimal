import React from "react";
import { View, StyleSheet, Text } from "react-native";

import Lottie from 'lottie-react-native';
import dog from '../../assets/animations/dog.json'

const SplashScreen = () => {
  return (
    <>
      <View style={styles.container}>
        <Lottie style={styles.animation} source={dog} autoPlay loop/>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 10,

    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#FFE1D0'
  },

  animation: {
    width: 300,
  }

})

export default SplashScreen