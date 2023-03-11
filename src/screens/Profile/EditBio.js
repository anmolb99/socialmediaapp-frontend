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

import {VStack, HStack, TextArea} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  formContainer,
  login_button,
  login_button_text,
  login_text,
  text_input,
} from '../../commonStyles/Forms';

import {
  goback_button,
  back_icon,
  back_text,
  header_text,
} from '../../commonStyles/PagesStyle';
import axios from 'axios';
import {API_URL} from '../../api/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';

const EditBio = ({navigation}) => {
  const {reduxUserData} = useSelector(state => state.reduxUserData);
  const [bio, setBio] = useState(reduxUserData.bio);
  const [loading, setLoading] = useState(false);
  const submitBio = async () => {
    setLoading(true);
    try {
      const userData = await AsyncStorage.getItem('user');
      const res = await axios.post(`${API_URL}/add_bio`, {
        id: JSON.parse(userData).user.id,
        bio: bio,
      });

      if (res.data.msg === 'New bio added') {
        setLoading(false);
        Alert.alert(null, 'Bio Updated');
        navigation.navigate('MyProfile');
      }
    } catch (error) {
      setLoading(false);
      Alert.alert(null, error.response.data.error);
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
        <Text style={header_text}>Enter New Bio</Text>
        <TextArea
          style={[text_input, {borderWidth: 0}]}
          placeholder="Enter bio"
          placeholderTextColor={'gray'}
          value={bio}
          onChangeText={txt => {
            setBio(txt);
          }}
        />
        {loading ? (
          <ActivityIndicator color={'black'} size={40} />
        ) : (
          <TouchableOpacity
            style={login_button}
            onPress={() => {
              submitBio();
            }}>
            <Text style={login_button_text}>Save</Text>
          </TouchableOpacity>
        )}
      </VStack>
    </View>
  );
};

export default EditBio;
