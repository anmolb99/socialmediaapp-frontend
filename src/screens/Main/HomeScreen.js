import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import TopNavBar from '../../components/pages/TopNavBar';
import {FlatList} from 'native-base';
import PostBigcard from '../../components/posts/PostBigcard';
import axios from 'axios';
import {API_URL} from '../../api/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({navigation}) => {
  const [allPosts, setAllPosts] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const data = [
    {
      id: '1',
      username: 'avantika_123',
      profile_pic:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuQEOS-b83YWOSeYdBzWWsEeENYrajb8sROQ&usqp=CAU',
      post_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuQEOS-b83YWOSeYdBzWWsEeENYrajb8sROQ&usqp=CAU',
      comments: [
        {
          id: 1,
          username: 'aarav_44',
          msg: 'nice pic hottey',
        },
        {
          id: 2,
          username: 'sudha_01',
          msg: 'looking good',
        },
      ],
      likes: [
        {id: 1, username: 'aarav_44'},
        {
          id: 2,
          username: 'sudha_01',
        },
      ],
    },
    {
      id: '2',
      username: 'aarav_44',
      profile_pic:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDj_181UeVmuUwFz0PWUGc1bRTfcHfoFNmog&usqp=CAU',
      post_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDj_181UeVmuUwFz0PWUGc1bRTfcHfoFNmog&usqp=CAU',
      comments: [
        {
          id: 1,
          username: 'avantika_123',
          msg: 'nice pic hottey',
        },
        {
          id: 2,
          username: 'sudha_01',
          msg: 'looking good',
        },
      ],
      likes: [
        {id: 1, username: 'avantika_44'},
        {
          id: 2,
          username: 'sudha_01',
        },
      ],
    },
    {
      id: '3',
      username: 'sudha_01',
      profile_pic:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHgaAQ6p_qNb64ut8Uus795ODmVlLbjk0krg&usqp=CAU',
      post_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHgaAQ6p_qNb64ut8Uus795ODmVlLbjk0krg&usqp=CAU',
      comments: [
        {
          id: 1,
          username: 'aarav_44',
          msg: 'nice pic hottey',
        },
        {
          id: 2,
          username: 'avantika_01',
          msg: 'looking good',
        },
      ],
      likes: [
        {id: 1, username: 'aarav_44'},
        {
          id: 2,
          username: 'avantika_01',
        },
      ],
    },
  ];

  const getPosts = async () => {
    try {
      let asyncUser = [];
      const asyncData = await AsyncStorage.getItem('user');
      asyncUser = JSON.parse(asyncData).user;
      // console.log(asyncUser.id);
      const res = await axios.post(`${API_URL}/get_posts`, {
        userid: asyncUser.id,
      });
      setAllPosts(res.data.posts);
      console.log(res.data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      getPosts();
      setRefreshing(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <TopNavBar navigation={navigation} />
      {allPosts ? (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={allPosts}
          keyExtractor={item => {
            return item.postimage;
          }}
          renderItem={({item}) => {
            return (
              <PostBigcard
                username={item.caption}
                profile_pic={item.postimage}
                post_image={item.postimage}
                comments={item.comments}
                likes={item.likes}
              />
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
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 50,
  },
});
