import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Req,
  Res
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request,Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(
    @Req() req: Request,
    @Res() res: Response
    // @Body('email') email: string,
    // @Body('password') password: string,
  ) {
    try {
      const user = await this.authService.login(req.body);
      res.status(200).send({
        responseCode: 200,
        result: user,
      });
    } catch (error) {
      res.status(error.responseCode).send({
        responseCode: error.responseCode,
        result: error.message,
      });
    }
  }

  @Post('/signup')
  async signup(@Req() req: Request,@Res() res: Response) {
    try {
      // console.log("signup 1")
      const user = await this.authService.signup(req.body);
      res.status(200).send({
        responseCode: 200,
        result: user,
      });
    } catch (error) {
      res.status(error.responseCode).send({
        responseCode: error.responseCode,
        result: error.message,
      });
    }
  }
}
