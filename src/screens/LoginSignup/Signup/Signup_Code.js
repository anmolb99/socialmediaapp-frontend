import React, {useState} from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
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

const Signup_Code = ({navigation, route}) => {
  const {email} = route.params;
  const {verificationCode} = route.params;

  const [verifyCode, setVerifyCode] = useState(null);
  const submitCode = () => {
    if (verificationCode == verifyCode) {
      navigation.navigate('Signup_Username', {email});
    } else {
      Alert.alert(null, 'Wrong verification code');
    }
  };
  return (
    <View style={formContainer}>
      <TouchableOpacity
        style={goback_button}
        onPress={() => navigation.goBack()}>
        <HStack space={1}>
          <Icon name="arrow-back-ios" style={back_icon} />
          <Text style={back_text}>Back</Text>
        </HStack>
      </TouchableOpacity>
      <VStack space={5} w="85%" alignItems={'center'}>
        <LogoCommon />
        <Text style={header_text}>
          A verification code has been sent to your email
        </Text>
        <TextInput
          keyboardType="numeric"
          value={verifyCode}
          style={text_input}
          placeholder="Enter Verification Code"
          placeholderTextColor={'gray'}
          onChangeText={text => {
            setVerifyCode(text);
          }}
        />
        <TouchableOpacity style={login_button} onPress={() => submitCode()}>
          <Text style={login_button_text}>Next</Text>
        </TouchableOpacity>
      </VStack>
    </View>
  );
};

export default Signup_Code;
