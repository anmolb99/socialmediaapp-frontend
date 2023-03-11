import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {API_URL} from '../../api/Api';

const PostBigcard = ({username, profile_pic, post_image, comments, likes}) => {
  // console.log(post_image);
  return (
    <View style={styles.container}>
      <View style={styles.post_header}>
        {/* <Image source={{uri: profile_pic}} style={styles.user_pic} /> */}
        <Text style={styles.username_text}>{username}</Text>
      </View>
      <Image
        style={styles.post_pic_style}
        source={{uri: `${API_URL}/${post_image}`}}
      />
      <View style={styles.post_bottom}>
        <TouchableOpacity style={styles.like_post_button}>
          <Icon name="favorite" style={styles.like_icon} />

          <Text style={styles.like_count_text}>1</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.like_post_button}>
          <Icon name="comment" style={styles.comment_icon} />
          <Text style={styles.like_count_text}>1</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostBigcard;

const styles = StyleSheet.create({
  container: {
    height: 'auto',
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: 20,
  },
  post_header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  user_pic: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
    borderRadius: 20,
    marginHorizontal: 10,
  },
  username_text: {
    fontWeight: '500',
    fontSize: 15,
  },
  post_pic_style: {
    // height: 400,

    resizeMode: 'stretch',
    aspectRatio: 1,
  },
  post_bottom: {
    height: 49,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  like_icon: {
    fontSize: 28,
    paddingLeft: 20,
  },
  comment_icon: {
    fontSize: 26,
    paddingLeft: 20,
  },
  like_count_text: {
    fontSize: 17,
    paddingLeft: 5,
  },
  like_post_button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
