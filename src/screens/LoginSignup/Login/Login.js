import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  Touchable,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import LogoCommon from '../../../components/loginsignup/LogoCommon';
import {Button, Input, VStack, Link, HStack} from 'native-base';
import {API_URL} from '../../../api/Api';

//components
import {
  formContainer,
  text_input,
  login_button,
  login_button_text,
} from '../../../commonStyles/Forms';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // console.log(email, password);
    setLoading(true);
    if (!email || !password) {
      setLoading(false);
      Alert.alert(null, 'please fill all the feilds');
    } else {
      try {
        const res = await axios.post(`${API_URL}/signin`, {
          email: email,
          password: password,
        });

        if (res.data.msg === 'signed in successfully') {
          console.log('logged in');
          await AsyncStorage.setItem('user', JSON.stringify(res.data));
          setLoading(false);

          navigation.navigate('MainPage');
        }
      } catch (error) {
        console.log(error);
        if (error.response.data.error === 'Invalid credentials') {
          setLoading(false);
          Alert.alert(null, 'Invalid credentials');
        } else {
          Alert.alert(null, 'something went wrong');
        }
      }
    }
  };
  return (
    <View style={formContainer}>
      <VStack space={5} w="80%" alignItems={'center'}>
        <LogoCommon />
        <Text style={styles.login_text}>Login</Text>

        <TextInput
          style={text_input}
          placeholder="Enter Email"
          placeholderTextColor={'gray'}
          value={email}
          onChangeText={text => {
            setEmail(text);
          }}
        />

        <View style={{width: '100%'}}>
          <TextInput
            style={text_input}
            placeholder="Enter Password"
            placeholderTextColor={'gray'}
            secureTextEntry={true}
            value={password}
            onChangeText={text => {
              setPassword(text);
            }}
          />
          <Text
            style={[styles.link_text, {alignSelf: 'flex-end', marginTop: 5}]}
            onPress={() => {
              navigation.navigate('ForgotPassword_EnterEmail');
            }}>
            Forget Password?
          </Text>
        </View>
        {loading ? (
          <ActivityIndicator color={'black'} size={40} />
        ) : (
          <TouchableOpacity
            style={login_button}
            onPress={() => {
              handleLogin();
            }}>
            <Text style={login_button_text}>Login</Text>
          </TouchableOpacity>
        )}
        <HStack space={1}>
          <Text>I'm a new user.</Text>
          <Text
            style={styles.link_text}
            onPress={() => {
              navigation.navigate('Signup_Email');
            }}>
            Sign Up
          </Text>
        </HStack>
      </VStack>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  login_text: {
    fontSize: 25,
    fontWeight: '500',
  },
  link_text: {
    color: '#097de2',
    textDecorationLine: 'underline',
  },
});
