import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';

import {VStack, HStack} from 'native-base';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import axios from 'axios';

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
import {Alert} from 'react-native';
import {API_URL} from '../../../api/Api';

const Signup_Email = ({navigation}) => {
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitEmail = async () => {
    setLoading(true);
    if (!email) {
      Alert.alert('please enter email');
    } else {
      try {
        const res = await axios.post(`${API_URL}/signup_verify_email`, {
          email: email,
        });
        // console.log(res);

        setLoading(false);
        navigation.navigate('Signup_Code', {
          verificationCode: res.data.verificationCode,
          email: res.data.email,
        });
      } catch (error) {
        // console.log(error.response.data);
        if (error.response.data.error === 'Email already exist') {
          setLoading(false);
          Alert.alert(null, 'Email already exist');
        } else {
          Alert.alert(error.response.data.error);
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
        <Text style={header_text}>Create a new Account</Text>
        <TextInput
          keyboardType="email-address"
          style={text_input}
          placeholder="Enter Email"
          placeholderTextColor={'gray'}
          onChangeText={text => {
            setEmail(text);
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

export default Signup_Email;
