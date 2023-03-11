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

const Signup_Username = ({navigation, route}) => {
  const {email} = route.params;
  // console.log(email);
  const [username, setUsername] = useState(null);
  const submitUsername = async () => {
    if (username === null) {
      Alert.alert(null, 'Enter username');
    } else {
      try {
        const res = await axios.post(`${API_URL}/username_available`, {
          username,
        });
        // console.log(res.data.msg);
        if (res.data.msg == 'username availabe') {
          navigation.navigate('Signup_Password', {email, username});
        }
      } catch (error) {
        // console.log(error.response.data);
        if (error.response.data.error == 'username exists') {
          Alert.alert(null, 'username already exist');
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
      <VStack space={5} w="85%" alignItems={'center'}>
        <LogoCommon />
        <Text style={header_text}>
          Pick username for your account. You can always change it later
        </Text>
        <TextInput
          style={[text_input]}
          placeholder="Enter username"
          placeholderTextColor={'gray'}
          value={username}
          onChangeText={text => {
            setUsername(text);
          }}
        />
        <TouchableOpacity style={login_button} onPress={() => submitUsername()}>
          <Text style={login_button_text}>Next</Text>
        </TouchableOpacity>
      </VStack>
    </View>
  );
};

export default Signup_Username;
