import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/Main/HomeScreen';
import NotificationsScreen from '../../screens/Main/NotificationsScreen';
import SearchScreen from '../../screens/Main/SearchScreen';
import MyProfile from '../../screens/Profile/MyProfile';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AddPost from '../../screens/Post/AddPost';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="home"
              style={{
                color: focused ? 'black' : 'gray',
                fontSize: focused ? 28 : 25,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="search"
              style={{
                color: focused ? 'black' : 'gray',
                fontSize: focused ? 28 : 25,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AddPost"
        component={AddPost}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="add-box"
              style={{
                color: focused ? 'black' : 'gray',
                fontSize: focused ? 28 : 25,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="notifications"
              style={{
                color: focused ? 'black' : 'gray',
                fontSize: focused ? 28 : 25,
              }}
            />
          ),
          headerShown: true,
          headerTitleAlign: 'center',
          headerTitle: 'Notifications',
        }}
      />
      <Tab.Screen
        name="MyProfile"
        component={MyProfile}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="person"
              style={{
                color: focused ? 'black' : 'gray',
                fontSize: focused ? 28 : 25,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
