import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from '../chat/chat.model';
@Injectable()
export class ChatService {
  constructor(@InjectModel('Chat') private readonly chatModel: Model<Chat>) {}

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async connectToChat(req) {
    try {
      console.log('in connectToChat service', req);
      const Allchats = await this.chatModel.find().sort({createdAt: -1}).populate('messages.user').exec();
      console.log('Allchats', Allchats);
      const requiredChat = Allchats.filter(
        (chat: any) =>
          chat.users.includes(req.receiver._id) &&
          chat.users.includes(req.sender._id),
      );
      if (requiredChat.length == 0) {
        const chatObject = {
          users: [req.receiver, req.sender],
        };
        const newChat = new this.chatModel(chatObject);
        const chatCreated = await this.chatModel.create(newChat)
        console.log('chatCreated', chatCreated);
        return [chatCreated];
      }
      console.log('requiredChat before sort', requiredChat[0].messages)

      let temp=requiredChat[0].messages.sort((a, b) =>{  
        var dateA = new Date(a.createdAt); 
        var dateB = new Date(b.createdAt); 
        return dateB > dateA ? 1 : -1;  
    } )
    requiredChat[0].messages=temp;

    console.log('requiredChat after sort', requiredChat)

      return requiredChat;
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }
  async sendMessage(req) {
    try {
      console.log('in sendMessage service', req);
      const result = await this.chatModel.findByIdAndUpdate(
        req.roomId,
        {
          $push: {
            messages: {
              user:req.sender,  
            //   sender: req.sender,
            //   receiver: req.receiver,
              text: req.messages[0].text,
            },
          },
        },
        { runValidators: true, new: true },
      ).populate('messages.user');
      console.log('result sendMessage ', result);
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }
}
