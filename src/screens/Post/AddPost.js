import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextBase,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {back_text} from '../../commonStyles/PagesStyle';
import {
  login_button,
  login_button_text,
  text_input,
} from '../../commonStyles/Forms';
import nopic from '../../assets/images/nopic.jpg';
import {ScrollView} from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import {API_URL} from '../../api/Api';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddPost = ({navigation}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');

  const chooseImage = async () => {
    try {
      const result = await ImagePicker.openPicker({
        width: 600,
        height: 600,
        cropping: true,
      });
      // console.log(result.path);
      setSelectedImage(result);
    } catch (error) {
      console.log(error);
    }
  };

  const addPost = async () => {
    const userData = await AsyncStorage.getItem('user');
    // console.log(JSON.parse(userData).user.id);

    // console.log(selectedImage);

    if (selectedImage) {
      const postData = new FormData();
      postData.append('id', JSON.parse(userData).user.id);
      postData.append('caption', caption);
      postData.append('location', location);
      postData.append('postimg', {
        uri: selectedImage.path,
        type: selectedImage.mime,
        name: `${Date.now() * 59}.jpg`,
      });
      try {
        const res = await axios.post(`${API_URL}/upload_post`, postData, {
          headers: {
            Accept: 'application/json',
            'content-Type': 'multipart/form-data',
          },
        });
        if (res.data.msg === 'post added') {
          setSelectedImage(null);
          setCaption('');
          setLocation('');
          Alert.alert(null, 'New Post Added');
          navigation.navigate('MyProfile');
        } else {
          Alert.alert(null, 'something went wrong');
        }
      } catch (error) {
        // console.log(error.response.error);
        // Alert.alert(null, error.response.error);
      }
    } else {
      Alert.alert(null, 'Please Select Picture');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.addpost_text}>Add Post</Text>
        <TouchableOpacity
          style={styles.post_button}
          onPress={() => {
            addPost();
          }}>
          <Text style={[back_text, {fontSize: 17}]}>Post</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.main_view}>
        {selectedImage ? (
          <Image source={{uri: selectedImage.path}} style={styles.pic_style} />
        ) : (
          <Image source={nopic} style={styles.pic_style} />
        )}

        <TouchableOpacity
          style={login_button}
          onPress={() => {
            chooseImage();
          }}>
          <Text style={login_button_text}>Choose Picture</Text>
        </TouchableOpacity>
        <View style={styles.inputs_style}></View>
        <TextInput
          editable
          multiline
          numberOfLines={4}
          placeholder="Caption"
          style={styles.caption_style}
          onChangeText={text => {
            setCaption(text);
          }}
        />
        <TextInput
          placeholder="Location"
          style={text_input}
          onChangeText={text => {
            setLocation(text);
          }}
        />
      </ScrollView>
    </View>
  );
};

export default AddPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  addpost_text: {
    fontSize: 20,
    fontWeight: '600',
    paddingHorizontal: 20,
    color: 'black',
  },
  post_button: {
    position: 'absolute',
    right: 0,
    marginRight: 20,
    fontSize: 25,
  },
  main_view: {
    paddingHorizontal: 20,
    // alignItems: 'center',
  },
  pic_style: {
    aspectRatio: 1,
    height: 250,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: 25,
    borderRadius: 10,
  },
  inputs_style: {
    textAlign: 'left',
  },
  caption_style: {
    borderWidth: 0.5,
    paddingHorizontal: 15,
    marginVertical: 20,
    borderRadius: 5,
  },
});
