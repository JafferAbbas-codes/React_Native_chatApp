// import SplashScreen from 'react-native-splash-screen'
import React,{useEffect } from 'react';
import Providers from './navigation';
import { store } from "./redux/configureStore"
import {URL} from "./const"


const App = () => {
  return <Providers store={store} />;
}

export default App;

