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
import Api, {API_URL} from '../../api/Api';
import nopic from '../../assets/images/nopic.jpg';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {addUserData} from '../../redux/reducers/UserReducer';
import {back_text, back_icon} from '../../commonStyles/PagesStyle';
import {HStack} from 'native-base';

const UserProfile = ({navigation, route}) => {
  const {userid} = route.params;
  const [userData, setUserData] = useState(null);
  const [isFollowed, setIsFollowed] = useState(false);
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [reload, setReload] = useState(false);
  const [followLoad, setFollowLoad] = useState(false);
  const isFocused = useIsFocused();

  let asyncUser = [];

  AsyncStorage.getItem('user')
    .then(usr => (asyncUser = JSON.parse(usr).user))
    .catch(err => console.log(err));

  const getUserProfile = async () => {
    try {
      const res = await axios.post(`${API_URL}/user_profile`, {
        id: userid,
      });
      // console.log(res.data.user);

      if (res.data.msg === 'user fetched') {
        const fol = res.data.user.followers.find(({follid}) => {
          return follid == asyncUser.id;
        });
        if (fol) {
          setIsFollowed(true);
          setFollowLoad(false);
        } else {
          setIsFollowed(false);
          setFollowLoad(false);
        }
        if (res.data.user._id === asyncUser.id) {
          setIsMyProfile(true);
        }
        setUserData(res.data.user);
      }
    } catch (error) {
      console.log(error);
      //   navigation.navigate('Login');
    }
  };

  const addFollow = async () => {
    setFollowLoad(true);
    // const asyncUser = await AsyncStorage.getItem('user');
    // const {id, profilepic, username} = JSON.parse(asyncUser).user;
    // console.log(userData._id);
    // console.log(id, profilepic, username);
    try {
      const res = await axios.post(`${API_URL}/add_follower`, {
        userid: userData._id,
        follid: asyncUser.id,
        profilepic: asyncUser.profilepic,
        username: asyncUser.username,
      });
      if (res.data.msg == 'followed') {
        setReload(!reload);
      }
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  const removeFollow = async () => {
    setFollowLoad(true);
    try {
      const res = await axios.post(`${API_URL}/remove_follower`, {
        follid: asyncUser.id,
        userid: userData._id,
      });
      if (res.data.msg == 'unfollowed') {
        setReload(!reload);
      }
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  const openChat = async () => {
    navigation.navigate('PersonalChat', {
      userid: userData._id,
      uname: userData.username,
      userpic: userData.profilepic,
    });
  };

  useEffect(() => {
    getUserProfile();
  }, [isFocused, reload]);

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <HStack space={1} style={{paddingTop: 20, paddingLeft: 20}}>
            <Icon name="arrow-back-ios" style={back_icon} />
            <Text style={back_text}>Back</Text>
          </HStack>
        </TouchableOpacity>
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
                        isMyProfile: isMyProfile,
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
                        isMyProfile: isMyProfile,
                      });
                    }}>
                    <Text style={styles.foll_style}>Following</Text>
                    <Text style={styles.foll_count_style}>
                      {userData.following.length}
                    </Text>
                  </TouchableOpacity>
                </View>
                {!isMyProfile ? (
                  <View style={[styles.userdata_style, {paddingTop: 0}]}>
                    {followLoad ? (
                      <ActivityIndicator
                        style={{width: 130}}
                        color={'#54c6f0'}
                      />
                    ) : (
                      <>
                        {isFollowed ? (
                          <TouchableOpacity
                            style={styles.btn_following}
                            onPress={() => removeFollow()}>
                            <Text style={styles.following_style}>
                              Following
                            </Text>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            style={styles.btn_follow}
                            onPress={() => {
                              addFollow();
                            }}>
                            <Text style={[styles.foll_style, {color: '#fff'}]}>
                              Follow
                            </Text>
                          </TouchableOpacity>
                        )}
                      </>
                    )}

                    <TouchableOpacity
                      style={styles.btn_msg}
                      onPress={() => openChat()}>
                      <Text style={styles.foll_style}>Message</Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
                {userData.bio.length > 0 ? (
                  <Text style={styles.bio_style}>{userData.bio}</Text>
                ) : null}

                {userData.posts.length > 0 ? (
                  <Text style={styles.post_text}>Posts</Text>
                ) : (
                  <Text style={styles.nopost_text}>No Posts yet</Text>
                )}
              </View>
            }
            renderItem={({item}) => {
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

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile_header: {
    height: 56,
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
  btn_msg: {
    backgroundColor: '#d4d2d2',
    paddingHorizontal: 30,
    paddingVertical: 7,
    borderRadius: 8,
  },
  btn_follow: {
    width: 130,
    backgroundColor: '#54c6f0',
    paddingHorizontal: 30,
    paddingVertical: 7,
    borderRadius: 8,
    alignItems: 'center',
  },
  btn_following: {
    borderWidth: 0.5,
    borderColor: '#54c6f0',
    paddingHorizontal: 30,
    paddingVertical: 7,
    borderRadius: 8,
    width: 130,
    alignItems: 'center',
  },
  following_style: {
    fontSize: 17,
    fontWeight: '500',
    color: '#54c6f0',
  },
});
