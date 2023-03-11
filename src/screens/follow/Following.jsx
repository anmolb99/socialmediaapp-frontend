import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import nopic from '../../assets/images/nopic.jpg';
import {API_URL} from '../../api/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Following = ({navigation, route}) => {
  const {following, isMyProfile} = route.params;
  const [followData, setFollowData] = useState(following);
  console.log(following);

  let asyncUser = [];
  AsyncStorage.getItem('user')
    .then(usr => {
      asyncUser = JSON.parse(usr).user;
    })
    .catch(err => {
      console.log('err asyncstorage', err);
    });

  const rmvFollower = async uid => {
    // setFollowLoad(true);
    try {
      const res = await axios.post(`${API_URL}/remove_follower`, {
        follid: asyncUser.id,
        userid: uid,
      });
      if (res.data.msg == 'unfollowed') {
        const newFollowData = followData.filter(elem => {
          return elem.userid != uid;
        });
        setFollowData(newFollowData);
      }
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  const addFollow = async uid => {
    // setFollowLoad(true);
    try {
      const res = await axios.post(`${API_URL}/add_follower`, {
        follid: asyncUser.id,
        userid: uid,
        profilepic: asyncUser.profilepic,
        username: asyncUser.username,
      });
      if (res.data.msg == 'followed') {
        // setFollowLoad(false);
        setIsFollowed(true);
      }
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  return (
    <View style={styles.container}>
      {following.length > 0 ? (
        <FlatList
          data={followData}
          keyExtractor={item => {
            return item.userid;
          }}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={styles.profile_button}
                accessible={false}
                onPress={() =>
                  navigation.navigate('UserProfileAgain', {userid: item.userid})
                }>
                {item.profilepic.length > 0 ? (
                  <Image
                    source={{uri: `${API_URL}/${item.profilepic}`}}
                    style={styles.profile_img}
                  />
                ) : (
                  <Image source={nopic} style={styles.profile_img} />
                )}
                <Text style={styles.username_style}>{item.username}</Text>
                {isMyProfile ? (
                  <View
                    style={{position: 'absolute', right: 0, marginRight: 20}}>
                    <TouchableOpacity
                      style={styles.btn_following}
                      onPress={() => rmvFollower(item.userid)}>
                      <Text style={styles.following_style}>Following</Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <Text style={{alignSelf: 'center', position: 'absolute', top: '45%'}}>
          No following
        </Text>
      )}
    </View>
  );
};

export default Following;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile_button: {
    height: 60,
    backgroundColor: '#ebebeb',
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 5,
  },
  profile_img: {
    aspectRatio: 1,
    height: 50,
    width: 50,
    resizeMode: 'contain',
    borderRadius: 25,
  },
  username_style: {
    paddingHorizontal: 15,
    fontSize: 17,
  },
  btn_following: {
    borderWidth: 0.5,
    borderColor: '#54c6f0',
    paddingVertical: 4,
    borderRadius: 8,
    width: 100,
    alignItems: 'center',
  },
  following_style: {
    fontSize: 17,
    fontWeight: '500',
    color: '#54c6f0',
  },
});
