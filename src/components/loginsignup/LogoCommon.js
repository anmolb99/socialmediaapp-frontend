import {View, Image} from 'react-native';
import React from 'react';
import {logo1} from '../../commonStyles/Forms';
import logo from '../.././assets/images/logo.jpg';

const LogoCommon = () => {
  return (
    <View>
      <Image source={logo} style={logo1} />
    </View>
  );
};

export default LogoCommon;
