import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import nopic from '../../assets/images/nopic.jpg';
import {API_URL} from '../../api/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Followers = ({navigation, route}) => {
  const {followers, isMyProfile} = route.params;
  // console.log(followers);

  const [followData, setfollowData] = useState(followers);

  let asyncUser = [];
  AsyncStorage.getItem('user')
    .then(usr => {
      asyncUser = JSON.parse(usr).user;
    })
    .catch(err => {
      console.log('err asyncstorage', err);
    });

  const rmvFollower = async uid => {
    // console.log(asyncUser.id, userid);
    try {
      const res = await axios.post(`${API_URL}/remove_follower`, {
        follid: uid,
        userid: asyncUser.id,
      });
      if (res.data.msg == 'unfollowed') {
        const newFollowData = followData.filter(elem => {
          return elem.follid != uid;
        });
        setfollowData(newFollowData);
      }
    } catch (error) {
      console.log(error.response.data.error);
    }
  };
  return (
    <View style={styles.container}>
      {followers.length > 0 ? (
        <FlatList
          data={followData}
          keyExtractor={item => {
            return item.follid;
          }}
          renderItem={({item}) => {
            //   console.log(item);
            return (
              <TouchableOpacity
                style={styles.profile_button}
                accessible={false}
                onPress={() =>
                  navigation.navigate('UserProfileAgain', {userid: item.follid})
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
                  <TouchableOpacity
                    style={styles.rmv_btn}
                    onPress={() => {
                      rmvFollower(item.follid);
                    }}>
                    <Text>Remove</Text>
                  </TouchableOpacity>
                ) : null}
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <Text style={{alignSelf: 'center', position: 'absolute', top: '45%'}}>
          No followers
        </Text>
      )}
    </View>
  );
};

export default Followers;

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
  rmv_btn: {
    position: 'absolute',
    right: 0,
    marginRight: 20,
    borderRadius: 5,
    backgroundColor: 'red',
    height: 25,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
