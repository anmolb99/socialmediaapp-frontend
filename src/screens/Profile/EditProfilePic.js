import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {VStack, HStack} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

import nopic from '../../assets/images/nopic.jpg';

import {
  formContainer,
  login_button,
  login_button_text,
  login_text,
  text_input,
} from '../../commonStyles/Forms';

import LogoCommon from '../../components/loginsignup/LogoCommon';
import {
  goback_button,
  back_icon,
  back_text,
  header_text,
} from '../../commonStyles/PagesStyle';
import axios from 'axios';
import {API_URL} from '../../api/Api';
import {useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';

const EditProfilePic = ({navigation}) => {
  const {reduxUserData} = useSelector(state => state.reduxUserData);
  // console.log(reduxUserData);
  const [selectedImage, setSelectedImage] = useState('');
  const [profileImage, setprofileImage] = useState({});
  const [loading, setLoading] = useState(null);
  const SaveProfilePic = async () => {
    setLoading(true);
    // console.log(profileImage.fileName);
    // console.log(reduxUserData);
    const data = new FormData();
    data.append('id', reduxUserData.id);
    data.append(
      'photo',
      profileImage.path
        ? {
            uri: profileImage.path,
            type: profileImage.mime,
            name: `${Date.now() * 59}.jpg`,
          }
        : '',
    );
    try {
      const res = await axios.post(`${API_URL}/change_dp`, data, {
        headers: {
          Accept: 'application/json',
          'content-Type': 'multipart/form-data',
        },
      });
      setLoading(false);
      // console.log(res.data);
      if (res.data.msg == 'profile pic changed') {
        Alert.alert(null, 'profile pic changed');
        navigation.navigate('MyProfile');
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const ChooseImage = async () => {
    const result = await ImagePicker.openPicker({
      height: 400,
      width: 400,
      cropping: true,
    });

    setSelectedImage(result.path);
    setprofileImage(result);
  };

  const RemoveImage = () => {
    setSelectedImage('');
    setprofileImage({});
  };

  useEffect(() => {
    const dbimage =
      reduxUserData.profilepic.length > 0
        ? `${API_URL}/${reduxUserData.profilepic}`
        : '';
    setSelectedImage(dbimage);
  }, []);

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
        <Text style={header_text}>Profile Picture</Text>

        {selectedImage.length > 0 ? (
          <Image
            source={{uri: selectedImage}}
            style={styles.profile_pic_style}
          />
        ) : (
          <Image source={nopic} style={styles.profile_pic_style} />
        )}

        <TouchableOpacity
          style={login_button}
          onPress={() => {
            ChooseImage();
          }}>
          <Text style={login_button_text}>Choose Profile Pic</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[login_button, {backgroundColor: 'orange'}]}
          onPress={() => {
            RemoveImage();
          }}>
          <Text style={login_button_text}>Remove Profile Pic</Text>
        </TouchableOpacity>

        {loading ? (
          <ActivityIndicator color={'black'} size={40} />
        ) : (
          <TouchableOpacity
            style={login_button}
            onPress={() => {
              SaveProfilePic();
            }}>
            <Text style={login_button_text}>Save</Text>
          </TouchableOpacity>
        )}
      </VStack>
    </View>
  );
};

export default EditProfilePic;

const styles = StyleSheet.create({
  profile_pic_style: {
    height: 150,
    width: 150,
    alignSelf: 'center',
    resizeMode: 'contain',
    borderRadius: 75,
    marginVertical: 20,
  },
});
