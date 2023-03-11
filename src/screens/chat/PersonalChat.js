import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  BackHandler,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {io} from 'socket.io-client';
import {API_URL, SOCKET_API} from '../../api/Api';
import {FlatList, HStack} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {back_icon, back_text} from '../../commonStyles/PagesStyle';
import nopic from '../../assets/images/nopic.jpg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';
import {ScrollView} from 'react-native';

const socket = io(SOCKET_API);

const PersonalChat = ({navigation, route}) => {
  const {userid, uname, userpic} = route.params;
  const isFocused = useIsFocused();
  const [msgText, setMsgText] = useState('');
  const [myChat, setmyChat] = useState(null);
  const [tempRoomId, setTempRoomId] = useState(null);
  const [asyncData, setAsyncData] = useState(null);

  // let tempRoomId;

  const sortRoomId = (id1, id2) => {
    if (id1 > id2) {
      return id1 + id2;
    } else {
      return id2 + id1;
    }
  };

  const loadData = async () => {
    // let asyncData = [];

    // AsyncStorage.getItem('user')
    //   .then(usr => {
    //     asyncData = JSON.parse(usr).user;
    //   })
    //   .catch(err => console.log('err asyncstorage', err));

    try {
      let localAsyncData = [];
      // let localtemproomid = [];

      const usr = await AsyncStorage.getItem('user');
      setAsyncData(JSON.parse(usr).user);
      localAsyncData = JSON.parse(usr).user;
      // console.log(localAsyncData.id);
      let localtemproomid = await sortRoomId(localAsyncData.id, userid);
      setTempRoomId(localtemproomid);
      // if (localAsyncData.id > userid) {
      //   setTempRoomId(localAsyncData.id + userid);
      //   localtemproomid = localAsyncData.id + userid;
      // } else {
      //   setTempRoomId(localAsyncData.id + userid);
      //   localtemproomid = localAsyncData.id + userid;
      // }
      console.log(localtemproomid, localAsyncData.id);

      socket.emit('join_room', {roomid: localtemproomid, user: 'ksk'});

      getMessages(localtemproomid);

      // const res = await axios.post(`${API_URL}/getmessages`, {
      //   roomid: localtemproomid,
      // });

      // console.log(res.data.ourChat);
      // setmyChat(res.data.ourChat);
    } catch (error) {
      console.log(error);
    }
  };

  const getMessages = async roomid => {
    try {
      const res = await axios.post(`${API_URL}/getmessages`, {
        roomid: roomid,
      });
      console.log('msg on send', res.data.ourChat);
      setmyChat(res.data.ourChat);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMsg = async () => {
    const msgdata = {
      message: msgText,
      senderid: asyncData.id,
      receiverid: userid,
      roomid: tempRoomId,
    };

    // console.log(msgdata);

    const res = await axios.post(`${API_URL}/savemessagetodb`, msgdata);
    console.log(res.data);
    if (res.data == 'message saved') {
      socket.emit('send_message', msgdata);
      getMessages(tempRoomId);
      setMsgText('');
    } else {
      Alert.alert(null, 'something went wrong');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    socket.on('receive_message', data => {
      console.log('received msg is - ', data);
      getMessages(tempRoomId);
    });
  }, [socket]);

  const scrollViewRef = useRef();

  return (
    <View style={styles.container}>
      <View style={styles.chat_header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <HStack space={1} style={{paddingTop: 20, paddingLeft: 20}}>
            <Icon name="arrow-back-ios" style={back_icon} />
            <Text style={back_text}></Text>
          </HStack>
        </TouchableOpacity>

        <TouchableOpacity style={styles.uname_style}>
          {userpic.length > 0 ? (
            <Image
              source={{uri: `${API_URL}/${userpic}`}}
              style={styles.img_user}
            />
          ) : (
            <Image source={nopic} style={styles.img_user} />
          )}
          <Text style={styles.uname_text}>{uname}</Text>
        </TouchableOpacity>
      </View>

      {/* <View style={styles.chatbox}>
        <Text style={styles.sentmsg}>hiii</Text>
        <Text style={styles.recmsg}>hello</Text>
      </View> */}

      {myChat ? (
        <FlatList
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({animated: true})
          }
          style={styles.chatbox}
          data={myChat}
          keyExtractor={item => {
            return item._id;
          }}
          renderItem={({item}) => {
            return (
              <Text
                style={
                  userid == item.senderid ? styles.recmsg : styles.sentmsg
                }>
                {item.message}
              </Text>
            );
          }}
        />
      ) : (
        // <ScrollView
        //   ref={scrollViewRef}
        //   onContentSizeChange={() =>
        //     scrollViewRef.current.scrollToEnd({animated: true})
        //   }>
        //   {myChat.map((item, index) => {
        //     return (
        //       <Text
        //         key={item.id}
        //         style={
        //           userid == item.senderid ? styles.recmsg : styles.sentmsg
        //         }>
        //         {item.message}
        //       </Text>
        //     );
        //   })}
        // </ScrollView>
        <ActivityIndicator
          style={{flex: 1, alignItems: 'center'}}
          size={50}
          color={'#242424'}
        />
      )}

      <View style={styles.input_box}>
        <TextInput
          style={styles.txt_input}
          placeholder="Message..."
          onChangeText={txt => {
            setMsgText(txt);
          }}
          value={msgText}
        />
        {msgText.length > 0 ? (
          <TouchableOpacity onPress={() => sendMsg()}>
            <Icon name="send" style={styles.send_icon} />
          </TouchableOpacity>
        ) : (
          <Icon name="send" style={styles.send_icon} />
        )}
      </View>
    </View>
  );
};

export default PersonalChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chat_header: {
    height: 60,
    width: '100%',
    backgroundColor: '#f0f0f0',
    flexDirection: 'row',
  },
  uname_style: {
    alignSelf: 'center',
    flexDirection: 'row',
  },
  uname_text: {
    fontSize: 17,
    alignSelf: 'center',
    paddingLeft: 10,
  },
  img_user: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  input_box: {
    flexDirection: 'row',
    height: 50,
    width: '95%',
    alignItems: 'center',
    // borderWidth: 1,
    justifyContent: 'center',
    marginHorizontal: '2.5%',
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    // position: 'absolute',
    bottom: 0,
    marginBottom: 10,
  },
  txt_input: {
    height: 40,
    width: '86%',
    paddingHorizontal: 13,
  },
  send_icon: {
    fontSize: 25,
    color: '#097de2',
    padding: 5,
  },
  chatbox: {
    // backgroundColor: 'aqua',
    height: '100%',
  },
  sentmsg: {
    backgroundColor: '#e8e6e6',
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
    borderRadius: 15,
    fontSize: 15,
    marginVertical: 5,
  },
  recmsg: {
    alignSelf: 'flex-start',
    backgroundColor: '#097de2',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
    borderRadius: 15,
    fontSize: 15,
    marginVertical: 5,
    color: '#fff',
  },
});
