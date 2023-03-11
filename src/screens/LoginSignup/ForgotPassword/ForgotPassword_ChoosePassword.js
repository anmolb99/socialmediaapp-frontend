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
import axios from 'axios';
import {API_URL} from '../../../api/Api';

const ForgotPassword_ChoosePassword = ({navigation, route}) => {
  const {email} = route.params;

  const [password, setPassword] = useState(null);
  const [cpassword, setCpassword] = useState(null);

  const submitPassword = async () => {
    if (!password || !cpassword) {
      Alert.alert(null, 'Please fill all the feilds');
    } else if (password !== cpassword) {
      Alert.alert(null, "Passwords don't match");
    } else {
      try {
        const res = await axios.post(`${API_URL}/reset_password`, {
          email,
          password,
        });
        console.log(res.data.msg);
      } catch (error) {
        console.log(error.response.data.error);
        Alert.alert(null, error.response.data.error);
      }
    }
    navigation.navigate('ForgotPassword_AccountRecovered');
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
        <Text style={header_text}>Choose a strong password</Text>
        <TextInput
          style={text_input}
          placeholder="Enter New Password"
          placeholderTextColor={'gray'}
          value={password}
          secureTextEntry={true}
          onChangeText={text => {
            setPassword(text);
          }}
        />
        <TextInput
          style={text_input}
          placeholder="Confirm New Password"
          placeholderTextColor={'gray'}
          value={cpassword}
          secureTextEntry={true}
          onChangeText={text => {
            setCpassword(text);
          }}
        />
        <TouchableOpacity style={login_button} onPress={() => submitPassword()}>
          <Text style={login_button_text}>Next</Text>
        </TouchableOpacity>
      </VStack>
    </View>
  );
};

export default ForgotPassword_ChoosePassword;

const styles = StyleSheet.create({});
