import {View, Text, StyleSheet, TextInput, FlatList} from 'react-native';
import React from 'react';
import ChatCard from '../../components/chats/ChatCard';

const ChatBoxScreen = ({navigation}) => {
  const chats = [
    {
      id: '1',
      username: 'avantika_01',
      profile_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHgaAQ6p_qNb64ut8Uus795ODmVlLbjk0krg&usqp=CAU',
      last_msg: 'bye, take care',
      time: '12:10',
    },
    {
      id: '2',
      username: 'priya_0155',
      profile_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHgaAQ6p_qNb64ut8Uus795ODmVlLbjk0krg&usqp=CAU',
      last_msg: 'hello',
      time: '12:10',
    },
    {
      id: '3',
      username: 'rakesh_verma',
      profile_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDj_181UeVmuUwFz0PWUGc1bRTfcHfoFNmog&usqp=CAU',
      last_msg: 'how are you',
      time: '12:10',
    },
    {
      id: '4',
      username: 'varsha_sharma',
      profile_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHgaAQ6p_qNb64ut8Uus795ODmVlLbjk0krg&usqp=CAU',
      last_msg: 'good bye',
      time: '12:10',
    },
    {
      id: '5',
      username: 'radha',
      profile_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHgaAQ6p_qNb64ut8Uus795ODmVlLbjk0krg&usqp=CAU',
      last_msg: 'hi',
      time: '12:10',
    },
    {
      id: '6',
      username: 'devika_56',
      profile_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDj_181UeVmuUwFz0PWUGc1bRTfcHfoFNmog&usqp=CAU',
      last_msg: 'hi bro',
      time: '12:10',
    },
    {
      id: '7',
      username: 'shivani_81',
      profile_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHgaAQ6p_qNb64ut8Uus795ODmVlLbjk0krg&usqp=CAU',
      last_msg: 'i"ll text you',
      time: '12:10',
    },
    {
      id: '8',
      username: 'swati_780',
      profile_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHgaAQ6p_qNb64ut8Uus795ODmVlLbjk0krg&usqp=CAU',
      last_msg: 'bruh',
      time: '12:10',
    },
    {
      id: '9',
      username: 'laura_66',
      profile_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDj_181UeVmuUwFz0PWUGc1bRTfcHfoFNmog&usqp=CAU',
      last_msg: 'yeah',
      time: '12:10',
    },
    {
      id: '10',
      username: 'gauri_891',
      profile_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHgaAQ6p_qNb64ut8Uus795ODmVlLbjk0krg&usqp=CAU',
      last_msg: 'bye',
      time: '12:10',
    },
    {
      id: '11',
      username: 'unknown_98',
      profile_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDj_181UeVmuUwFz0PWUGc1bRTfcHfoFNmog&usqp=CAU',
      last_msg: 'abhe jaa',
      time: '12:10',
    },
    {
      id: '12',
      username: 'rashika_01',
      profile_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHgaAQ6p_qNb64ut8Uus795ODmVlLbjk0krg&usqp=CAU',
      last_msg: 'laa la',
      time: '12:10',
    },
  ];
  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        keyExtractor={item => {
          return item.id;
        }}
        ListHeaderComponent={
          <TextInput style={styles.search_chats} placeholder="Search" />
        }
        renderItem={({item}) => {
          return (
            <ChatCard
              profile_image={item.profile_image}
              username={item.username}
              last_msg={item.last_msg}
              time={item.time}
              navigation={navigation}
            />
          );
        }}
      />
    </View>
  );
};

export default ChatBoxScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  search_chats: {
    height: 50,
    width: '90%',
    borderWidth: 0.5,
    marginVertical: 20,
    borderRadius: 5,
    paddingHorizontal: 20,
    marginHorizontal: '5%',
  },
});
