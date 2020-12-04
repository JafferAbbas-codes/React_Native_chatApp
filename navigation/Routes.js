import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack.android';
import AppStack from './AppStack';
import { connect } from "react-redux";

const Routes = (props) => {
  // const [initializing, setInitializing] = useState(true);


  useEffect(() => {
    console.log("props.user",props.user)
    console.log('initializing')
    // if (initializing) setInitializing(false);
  }, [props.user.isloggedIn]);

  // if (initializing)
  //   return null;

  return (
    <NavigationContainer>
      {props.loading ? (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="yellow" />
        </View>
      ) : props.user.isloggedIn ? (
        <AppStack />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

const mapStateToProps = (state) => ({
  user: state.userDetails,
  loading:state.userDetails.loading
});

export default connect(mapStateToProps)(Routes);