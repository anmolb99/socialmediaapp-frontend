import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

//components
import Login from './src/screens/LoginSignup/Login/Login';
import Signup_Username from './src/screens/LoginSignup/Signup/Signup_Username';
import Signup_Email from './src/screens/LoginSignup/Signup/Signup_Email';
import Signup_Password from './src/screens/LoginSignup/Signup/Signup_Password';
import Signup_Code from './src/screens/LoginSignup/Signup/Signup_Code';
import Signup_AccountCreated from './src/screens/LoginSignup/Signup/Signup_AccountCreated';
import ForgotPassword_AccountRecovered from './src/screens/LoginSignup/ForgotPassword/ForgotPassword_AccountRecovered';
import ForgotPassword_ChoosePassword from './src/screens/LoginSignup/ForgotPassword/ForgotPassword_ChoosePassword';
import ForgotPassword_Code from './src/screens/LoginSignup/ForgotPassword/ForgotPassword_Code';
import ForgotPassword_EnterEmail from './src/screens/LoginSignup/ForgotPassword/ForgotPassword_EnterEmail';
import BottomTab from './src/components/pages/BottomTab';
import ChatBoxScreen from './src/screens/chat/ChatBoxScreen';
import PersonalChat from './src/screens/chat/PersonalChat';
import ProfileSetting from './src/screens/Profile/ProfileSetting';
import ChangePassword from './src/screens/Profile/ChangePassword';
import EditProfile from './src/screens/Profile/EditProfile';
import EditProfilePic from './src/screens/Profile/EditProfilePic';
import EditBio from './src/screens/Profile/EditBio';
import UserProfile from './src/screens/Profile/UserProfile';
import ChangeUsername from './src/screens/Profile/ChangeUsername';
import Followers from './src/screens/follow/Followers';
import Following from './src/screens/follow/Following';

const Routing = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MainPage"
        screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup_Username" component={Signup_Username} />
        <Stack.Screen name="Signup_Email" component={Signup_Email} />
        <Stack.Screen name="Signup_Password" component={Signup_Password} />
        <Stack.Screen name="Signup_Code" component={Signup_Code} />
        <Stack.Screen
          name="Signup_AccountCreated"
          component={Signup_AccountCreated}
        />
        <Stack.Screen
          name="ForgotPassword_AccountRecovered"
          component={ForgotPassword_AccountRecovered}
        />
        <Stack.Screen
          name="ForgotPassword_ChoosePassword"
          component={ForgotPassword_ChoosePassword}
        />
        <Stack.Screen
          name="ForgotPassword_EnterEmail"
          component={ForgotPassword_EnterEmail}
        />
        <Stack.Screen
          name="ForgotPassword_Code"
          component={ForgotPassword_Code}
        />
        <Stack.Screen name="MainPage" component={BottomTab} />
        <Stack.Screen
          name="ChatBox"
          component={ChatBoxScreen}
          options={{
            headerShown: true,
            headerTitleAlign: 'center',
            headerTitle: 'Chats',
          }}
        />
        <Stack.Screen name="PersonalChat" component={PersonalChat} />
        <Stack.Screen
          name="ProfileSetting"
          component={ProfileSetting}
          options={{
            headerShown: true,
            headerTitle: 'Settings',
          }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            headerShown: true,
            headerTitle: 'Edit Profile',
          }}
        />
        <Stack.Screen name="EditProfilePic" component={EditProfilePic} />
        <Stack.Screen name="EditBio" component={EditBio} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="UserProfileAgain" component={UserProfile} />
        <Stack.Screen name="ChangeUsername" component={ChangeUsername} />
        <Stack.Screen
          name="Followers"
          component={Followers}
          options={{
            headerShown: true,
            headerTitle: 'Followers',
          }}
        />
        <Stack.Screen
          name="Following"
          component={Following}
          options={{
            headerShown: true,
            headerTitle: 'Following',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routing;
