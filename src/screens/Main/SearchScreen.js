import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Keyboard,
  TouchableNativeFeedbackBase,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';

import nopic from '../../assets/images/nopic.jpg';
import axios from 'axios';
import {API_URL} from '../../api/Api';
import {FlatList} from 'native-base';

const SearchScreen = ({navigation}) => {
  const [usersList, setUsersList] = useState(null);
  const [words, setWords] = useState(null);

  const searchUser = async text => {
    setWords(text);
    try {
      const usersGet = await axios.post(`${API_URL}/searchuser`, {
        keyword: text,
      });
      // console.log(usersGet.data.users);
      setUsersList(usersGet.data.users);
      if (text) {
        setWords(true);
      }
    } catch (error) {
      if (error.response.data.error == 'server error') {
        Alert.alert(null, 'server error');
      } else if (error.response.data.error == 'No users found') {
        setWords(null);
      }
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search_accounts}
        placeholder="Search  Accounts"
        autoFocus={true}
        onChangeText={text => searchUser(text)}
      />

      {words ? (
        <FlatList
          data={usersList}
          keyExtractor={item => {
            return item.username;
          }}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.profile_button}
              accessible={false}
              onPress={() =>
                navigation.navigate('UserProfile', {userid: item.id})
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
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.no_user}>No Users Found</Text>
      )}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  search_accounts: {
    height: 45,
    width: '90%',
    // borderWidth: 0.5,
    marginVertical: 20,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginHorizontal: '5%',
    backgroundColor: '#ebebeb',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profile_button: {
    height: 60,
    backgroundColor: '#ebebeb',
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 5,
    width: '94%',
    marginLeft: '3%',
    borderRadius: 10,
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
  no_user: {
    alignSelf: 'center',
  },
});
