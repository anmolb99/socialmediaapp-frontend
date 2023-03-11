import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';

const EditProfile = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.edit_profile}
        onPress={() => {
          navigation.navigate('EditProfilePic');
        }}>
        <Text style={styles.text_style}>Edit Profile Picture</Text>
        <Icon name="keyboard-arrow-right" style={styles.icon_style} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.edit_profile}
        onPress={() => {
          navigation.navigate('EditBio');
        }}>
        <Text style={styles.text_style}>Edit Bio</Text>
        <Icon name="keyboard-arrow-right" style={styles.icon_style} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.edit_profile}
        onPress={() => {
          navigation.navigate('ChangeUsername');
        }}>
        <Text style={styles.text_style}>Change Username</Text>
        <Icon name="keyboard-arrow-right" style={styles.icon_style} />
      </TouchableOpacity>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  edit_profile: {
    height: 60,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderColor: 'gray',
    flexDirection: 'row',
  },
  text_style: {
    fontSize: 18,
  },
  icon_style: {
    fontSize: 25,
    position: 'absolute',
    right: 0,
    paddingRight: 20,
  },
});
