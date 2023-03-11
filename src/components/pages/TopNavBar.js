import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LogoCommon from '../loginsignup/LogoCommon';

import logo from '../.././assets/images/logo.jpg';

const TopNavBar = ({navigation}) => {
  const goToChatbox = () => {
    navigation.navigate('ChatBox');
  };
  return (
    <View style={styles.top_container}>
      <Image source={logo} style={styles.logo_app} />

      <TouchableOpacity
        style={styles.message_icon}
        onPress={() => {
          goToChatbox();
        }}>
        <Icon name="chat" size={25} />
      </TouchableOpacity>
    </View>
  );
};

export default TopNavBar;

const styles = StyleSheet.create({
  top_container: {
    zIndex: 10,
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
    paddingHorizontal: 15,
  },
  message_icon: {
    position: 'absolute',
    right: 0,

    paddingHorizontal: 15,
  },
  logo_app: {
    height: 27,
    width: 100,
    resizeMode: 'contain',
  },
});
