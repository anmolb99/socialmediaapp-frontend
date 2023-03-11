import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';

import {VStack, HStack} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  formContainer,
  login_button,
  login_button_text,
  login_text,
  text_input,
} from '../../../commonStyles/Forms';

import LogoCommon from '../../../components/loginsignup/LogoCommon';
import {
  goback_button,
  back_icon,
  back_text,
  header_text,
} from '../../../commonStyles/PagesStyle';
import axios from 'axios';
import {API_URL} from '../../../api/Api';

const ForgotPassword_EnterEmail = ({navigation}) => {
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(null);
  const submitEmail = async () => {
    setLoading(true);
    if (!email) {
      Alert.alert(null, 'Enter email');
    } else {
      try {
        const res = await axios.post(`${API_URL}/fp_verify_email`, {
          email: email,
        });

        if (res.data.msg === 'code sent') {
          setLoading(false);
          navigation.navigate('ForgotPassword_Code', {
            email: email,
            verificationCode: res.data.verificationCode,
          });
        }
      } catch (error) {
        console.log(error.response.data.error);
        if (error.response.data.error === 'Invalid credentials') {
          setLoading(false);
          Alert.alert(null, 'Invalid credentials');
        }
      }
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

      <VStack space={5} w="80%" alignItems={'center'}>
        <LogoCommon />
        <Text style={header_text}>Forget Password?</Text>
        <TextInput
          style={text_input}
          placeholder="Enter Email"
          placeholderTextColor={'gray'}
          value={email}
          onChangeText={txt => {
            setEmail(txt);
          }}
        />
        {loading ? (
          <ActivityIndicator color={'black'} size={40} />
        ) : (
          <TouchableOpacity
            style={login_button}
            onPress={() => {
              submitEmail();
            }}>
            <Text style={login_button_text}>Next</Text>
          </TouchableOpacity>
        )}
      </VStack>
    </View>
  );
};

export default ForgotPassword_EnterEmail;
