import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const ChatCard = ({profile_image, username, last_msg, time, navigation}) => {
  const openChat = () => {
    navigation.navigate('PersonalChat');
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        openChat();
      }}>
      <Image style={styles.profile_img} source={{uri: profile_image}} />
      <View>
        <Text style={styles.username_style}>{username}</Text>
        <Text style={styles.last_msg_style}>{last_msg}</Text>
      </View>
      <Text style={styles.time_style}>{time}</Text>
    </TouchableOpacity>
  );
};

export default ChatCard;

const styles = StyleSheet.create({
  container: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profile_img: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
    borderRadius: 25,
    marginHorizontal: 20,
  },
  time_style: {
    position: 'absolute',
    right: 0,
    marginRight: 20,
  },
  username_style: {
    fontSize: 17,
    fontWeight: '600',
    paddingBottom: 3,
  },
});
