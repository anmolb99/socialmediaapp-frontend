import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '../../api/Api';
import nopic from '../../assets/images/nopic.jpg';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {addUserData} from '../../redux/reducers/UserReducer';

const MyProfile = ({navigation}) => {
  const [userData, setUserData] = useState(null);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const getMyProfile = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      // console.log(JSON.parse(user));
      if (user) {
        // console.log(userData);
        const token = JSON.parse(user).token;
        const res = await axios.get(`${API_URL}/my_profile`, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });
        // console.log(res.data.user);

        if (res.data.msg === 'logged in successfully') {
          setUserData(res.data.user);
          const {_id, email, bio, profilepic} = res.data.user;
          dispatch(addUserData({id: _id, email, bio, profilepic}));
        }
      } else {
        navigation.navigate('Login');
      }
    } catch (error) {
      console.log(error);
      navigation.navigate('Login');
    }
  };

  useEffect(() => {
    getMyProfile();
  }, [isFocused]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.profile_header}>
          <Text style={styles.profile_text}>My Profile</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('ProfileSetting')}
            style={styles.settings_icon}>
            <Icon name="settings" size={25} />
          </TouchableOpacity>
        </View>

        {userData ? (
          <FlatList
            contentContainerStyle={{paddingHorizontal: 10}}
            numColumns={3}
            data={userData.posts}
            keyExtractor={item => {
              return item.postimage;
            }}
            ListHeaderComponent={
              <View>
                {userData.profilepic.length > 0 ? (
                  <Image
                    source={{
                      uri: `${API_URL}/${userData.profilepic}`,
                    }}
                    style={styles.profile_pic_style}
                  />
                ) : (
                  <Image source={nopic} style={styles.profile_pic_style} />
                )}

                <Text style={styles.username_style}>@{userData.username}</Text>
                <View style={styles.userdata_style}>
                  <TouchableOpacity
                    style={styles.particular_view}
                    onPress={() => {
                      navigation.navigate('Followers', {
                        followers: userData.followers,
                        isMyProfile: true,
                      });
                    }}>
                    <Text style={styles.foll_style}>Followers</Text>
                    <Text style={styles.foll_count_style}>
                      {userData.followers.length}
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.v_line}></View>
                  <TouchableOpacity
                    style={styles.particular_view}
                    onPress={() => {
                      navigation.navigate('Following', {
                        following: userData.following,
                        isMyProfile: true,
                      });
                    }}>
                    <Text style={styles.foll_style}>Following</Text>
                    <Text style={styles.foll_count_style}>
                      {userData.following.length}
                    </Text>
                  </TouchableOpacity>
                </View>
                {userData.bio.length > 0 ? (
                  <Text style={styles.bio_style}>{userData.bio}</Text>
                ) : null}

                {userData.posts.length > 0 ? (
                  <Text style={styles.post_text}>My Posts</Text>
                ) : (
                  <Text style={styles.nopost_text}>No Posts yet</Text>
                )}
              </View>
            }
            renderItem={({item}) => {
              // console.log(item);
              return (
                <TouchableOpacity>
                  <Image
                    source={{uri: `${API_URL}/${item.postimage}`}}
                    style={styles.post_small_card}
                  />
                </TouchableOpacity>
              );
            }}
          />
        ) : (
          <ActivityIndicator
            style={{flex: 1, alignItems: 'center'}}
            size={50}
            color={'#242424'}
          />
        )}
      </View>
    </>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile_header: {
    height: 50,
    backgroundColor: '#fff',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  settings_icon: {
    position: 'absolute',
    right: 0,
    marginRight: 20,
    fontSize: 25,
  },
  profile_text: {
    fontSize: 20,
    fontWeight: '600',
    paddingHorizontal: 20,
    color: 'black',
  },
  profile_pic_style: {
    height: 150,
    width: 150,
    alignSelf: 'center',
    resizeMode: 'contain',
    borderRadius: 75,
    marginVertical: 20,
  },
  username_style: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '600',
    backgroundColor: '#d4d2d2',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  userdata_style: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 20,
  },
  particular_view: {
    alignItems: 'center',
  },
  foll_style: {
    fontSize: 17,
    fontWeight: '500',
  },
  foll_count_style: {
    fontWeight: '500',
  },
  v_line: {
    height: 45,
    width: 1,
    backgroundColor: 'gray',
  },

  post_text: {
    alignSelf: 'center',
    fontSize: 25,
    paddingVertical: 20,
  },
  bio_style: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    textAlign: 'center',
    backgroundColor: '#d4d2d2',
    borderRadius: 10,
    // borderWidth: 1,
  },
  post_small_card: {
    height: 110,
    width: 110,
    margin: 2,
  },
  nopost_text: {
    alignSelf: 'center',
    marginTop: 50,
  },
});
