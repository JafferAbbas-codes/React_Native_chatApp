// import SplashScreen from 'react-native-splash-screen'
import React,{useEffect } from 'react';
import Providers from './navigation';
import { store } from "./redux/configureStore"
// import io from 'socket.io-client'; 
// const socket = io();

const App = () => {
  return <Providers store={store} />;
}

export default App;

