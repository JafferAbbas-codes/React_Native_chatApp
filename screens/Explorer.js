import React, {useContext, useState, useEffect, useCallback} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, Text, Button} from 'react-native';
// import { AuthContext } from '../navigation/AuthProvider.android';
import {globalStyles} from '../styles/global';
import {GiftedChat} from 'react-native-gifted-chat';
import {URL, connectToChat,sendMessageToServer} from '../const';
import axios from 'axios';
import io from 'socket.io-client';

let socket = io(URL);
let roomId = ""

const Explorer = (props) => {
  const [messages, setMessages] = useState([]);
  // const [roomId,setRoomId]=useState("")
  //  console.log("props.navigation.getParams",props.navigation.getParams())
  //  const [receiver,setReceiver]= useState(props.route.params.reciever)
  const joinRoom = async () => {
    try {
      let response = await axios.post(`${URL}${connectToChat}`, {
        sender: props.user,
        receiver: props.route.params.receiver,
      });
      console.log('joinRoom --->', response.data.result);
      roomId=response.data.result[0]._id
      setMessages(
        response.data.result[0].messages
      );
      socket.emit('JoinRoom', {
        roomId:response.data.result[0]._id,
        sender: props.user,
        receiver: props.route.params.receiver,
      });
    } catch (error) {
      console.log('error in joinRoom', error);
    }
  };
  const sendMessage = async (messages) => {
    try {
      // console.log("roomId ---->   ",roomId)
      // console.log(`${URL}${sendMessageToServer}`)
      let response = await axios.post(`${URL}${sendMessageToServer}`, {
        messages,
        roomId,
        sender: props.user,
        receiver: props.route.params.receiver,
      });
      console.log('sendMessage --->', response.data.result);
      // setRoomId(response.data.result[0]._id)

      socket.emit('msgToServer', {
        roomId,
        messages,
        sender: props.user,
        receiver: props.route.params.receiver,
      });
    } catch (error) {
      console.log('error in msgToServer', error);
    }
  };

  useEffect(() => {
    //  console.log("-------------------------->",props.route.params.receiver)
    joinRoom();
    
    socket.on('msgToClient', (message) => {
      console.log('message received -->', message);
      let temp;
      //= messages;
      temp = {
        _id: message.messages[0]._id,
        text: message.messages[0].text,
        createdAt: message.messages[0].createdAt,
        user: message.messages[0].user,
      };
      // console.log("temp.text ------>   " ,temp.text)
      setMessages(previousMessages => GiftedChat.append(previousMessages, temp))
    });
    // setMessages([
    //   {
    //     _id: 1,
    //     text: 'Hello developer',
    //     createdAt: new Date(),
    //     user: {
    //       _id: props.route.params.receiver,
    //       name: 'React Native',
    //       avatar: 'https://placeimg.com/140/140/any',
    //     },
    //   },
    // ]);
  }, []);

  const onSend = useCallback((messagess = []) => {
    console.log('onSend  ------>', messagess);
    // setMessages(previousMessages => GiftedChat.append(previousMessages, messagess))
    console.log("messages are   ---->   ",messages)
    sendMessage(messagess);

  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: props.user._id,
      }}
    />
  );
};

// export default Explorer;
const mapStateToProps = (state) => ({
  user: state.userDetails.user,
});

export default connect(mapStateToProps)(Explorer);
