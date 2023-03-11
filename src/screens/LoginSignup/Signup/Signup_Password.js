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

const Signup_Password = ({navigation, route}) => {
  const {email} = route.params;
  const {username} = route.params;

  const [password, setPassword] = useState(null);
  const [cpassword, setCpassword] = useState(null);

  const submitPassword = async () => {
    if (!password || !cpassword) {
      Alert.alert(null, 'please fill all the fields');
    } else if (password !== cpassword) {
      Alert.alert(null, 'passwords dont match');
    } else {
      try {
        const res = await axios.post(`${API_URL}/signup`, {
          email,
          username,
          password,
        });
        // console.log(res);
        if (res.data.msg == 'user registered') {
          navigation.navigate('Signup_AccountCreated');
        }
      } catch (error) {
        Alert.alert(null, error.response.data.error);
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
      <VStack space={5} w="85%" alignItems={'center'}>
        <LogoCommon />
        <Text style={header_text}>Choose a strong password</Text>
        <TextInput
          style={text_input}
          placeholder="Enter Password"
          placeholderTextColor={'gray'}
          onChangeText={text => {
            setPassword(text);
          }}
          value={password}
        />
        <TextInput
          style={text_input}
          placeholder="Confirm Password"
          placeholderTextColor={'gray'}
          onChangeText={text => {
            setCpassword(text);
          }}
          password={cpassword}
        />
        <TouchableOpacity style={login_button} onPress={() => submitPassword()}>
          <Text style={login_button_text}>Next</Text>
        </TouchableOpacity>
      </VStack>
    </View>
  );
};

export default Signup_Password;
