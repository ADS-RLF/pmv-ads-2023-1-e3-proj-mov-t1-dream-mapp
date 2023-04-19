import React from 'react';
import {StyleSheet, Image} from 'react-native';

const Logo = () =>{
  return <Image style={styles.image} source={require('../Assets/logoDream-Mapp-680.jpg')} />
};

const styles = StyleSheet.create({
 image:{
    width: 400,
    height: 160,
    borderRadius: 10
  },
});

export default Logo;