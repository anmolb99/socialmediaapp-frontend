import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {HStack, VStack} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  formContainer,
  login_button,
  login_button_text,
  text_input,
} from '../../../commonStyles/Forms';
import {
  goback_button,
  back_icon,
  back_text,
  header_text,
} from '../../../commonStyles/PagesStyle';
import LogoCommon from '../../../components/loginsignup/LogoCommon';

const ForgotPassword_AccountRecovered = ({navigation}) => {
  const goToFeed = () => {
    navigation.navigate('Login');
  };
  return (
    <View style={formContainer}>
      <TouchableOpacity
        style={goback_button}
        onPress={() => navigation.goBack()}>
        <HStack>
          <Icon name="arrow-back-ios" style={back_icon} />
          <Text style={back_text}>Back</Text>
        </HStack>
      </TouchableOpacity>
      <VStack space={5} w="85%" alignItems={'center'}>
        <LogoCommon />
        <HStack space={1}>
          <Icon name="verified" style={styles.verified_icon} />
          <Text style={[header_text, {color: 'black'}]}>Account Recovered</Text>
        </HStack>

        <TouchableOpacity style={login_button} onPress={() => goToFeed()}>
          <Text style={login_button_text}>Let's Roll</Text>
        </TouchableOpacity>
      </VStack>
    </View>
  );
};

export default ForgotPassword_AccountRecovered;

const styles = StyleSheet.create({
  verified_icon: {
    alignSelf: 'center',
    fontSize: 20,
    color: 'green',
  },
});
