import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Request, Response } from 'express';
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Here we get all users
  @Get()
  async getAllUsers(@Req() req: Request, @Res() res: Response) {
    try {
      const users = await this.userService.getAllUsers();
      console.log("sending users ",users)
      res.status(200).send({
        responseCode: 200,
        result: users,
      });
    } catch (error) {
      res.status(error.statusCode).send({
        responseCode: error.statusCode,
        result: error.message,
      });
    }
  }
}
