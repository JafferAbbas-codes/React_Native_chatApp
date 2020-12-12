import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Request, Response } from 'express';
@Controller('/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // Here we connect to chat
  @Post('/join')
  async connectToChat(@Req() req: Request, @Res() res: Response) {
    try {
      const result = await this.chatService.connectToChat(req.body);
    //   console.log("connectToChat result",result)
      res.status(200).send({
        responseCode: 200,
        result
      });
    } catch (error) {
      res.status(400).send({
        responseCode: error.statusCode,
        result: error.message,
      });
    }
  }
  @Post('/sendMessage')
  async sendMessage(@Req() req: Request, @Res() res: Response) {
    try {
      const result = await this.chatService.sendMessage(req.body);
    //   console.log("sendMessage result ",result)
      res.status(200).send({
        responseCode: 200,
        result
      });
    } catch (error) {
      res.status(400).send({
        responseCode: error.statusCode,
        result: error.message,
      });
    }
  }
  
}
