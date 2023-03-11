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
} from '../../commonStyles/Forms';
import {
  goback_button,
  back_icon,
  back_text,
  header_text,
} from '../../commonStyles/PagesStyle';
import LogoCommon from '../../components/loginsignup/LogoCommon';
import axios from 'axios';
import {API_URL} from '../../api/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChangePassword = ({navigation}) => {
  const [oldpassword, setOldpassword] = useState(null);
  const [password, setPassword] = useState(null);
  const [cpassword, setCpassword] = useState(null);

  const submitPassword = async () => {
    if (!oldpassword || !password || !cpassword) {
      Alert.alert(null, 'Please fill all the feilds');
    } else if (password !== cpassword) {
      Alert.alert(null, "Passwords don't match");
    } else {
      try {
        const userdata = await AsyncStorage.getItem('user');
        console.log(userdata);
        const res = await axios.post(`${API_URL}/change_password`, {
          email: JSON.parse(userdata).user.email,
          newpassword: password,
          oldpassword: oldpassword,
        });
        if (res.data.msg === 'password changed') {
          Alert.alert(null, 'Password Changed');
          navigation.goBack();
        } else {
          Alert.alert(null, 'Something went wrong');
        }
      } catch (error) {
        console.log(error);
        console.log(error.response.data.error);
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
        <Text style={header_text}>Change password</Text>
        <TextInput
          style={text_input}
          placeholder="Old Password"
          placeholderTextColor={'gray'}
          value={oldpassword}
          secureTextEntry={true}
          onChangeText={text => {
            setOldpassword(text);
          }}
        />
        <TextInput
          style={text_input}
          placeholder="New Password"
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
          <Text style={login_button_text}>Change Password</Text>
        </TouchableOpacity>
      </VStack>
    </View>
  );
};

export default ChangePassword;
