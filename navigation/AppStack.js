import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Home from '../screens/Home';
import About from '../screens/About';
import Notifications from '../screens/Notifications';
import Profile from '../screens/Profile';
import Explorer from '../screens/Explorer';
import Users from '../screens/Users';
import DrawerContent from '../screens/DrawerContent';
// import io from 'socket.io-client';
import Icon from 'react-native-vector-icons';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();


// const temp = "http://192.168.18.155:3000";
// const socket = io(temp);

const HomeStackScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="About" component={About} />
    </Stack.Navigator>
  );
};

const ChatStackScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Users" component={Users} />
      <Stack.Screen name="Explorer" component={Explorer} />
    </Stack.Navigator>
  );
};

// const NotificationsScreen = () => {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}>
//       <Stack.Screen name="Notifications" component={Notifications} />
//     </Stack.Navigator>
//   );
// };

const AppStack = (myProps) => {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props}/>}>
      <Drawer.Screen name="Welcome to the App" component={MainBottomTabStack} />
      {/* <Drawer.Screen name="Notifications" component={NotificationsScreen} /> */}
    </Drawer.Navigator>
  );
};

const MainBottomTabStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
      style={{backgroundColor: 'tomato'}}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#FF9900',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarLabel: 'Updates',
          tabBarColor: '#FF6699',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor: '#CC33FF',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="ChatStackScreen"
        component={ChatStackScreen}
        options={{
          tabBarLabel: 'Users',
          tabBarColor: '#CC0000',
          tabBarIcon: ({color}) => (
            <MaterialIcons name="explore" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppStack;
