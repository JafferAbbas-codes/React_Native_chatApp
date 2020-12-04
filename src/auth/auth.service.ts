import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from './auth.model';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
@Injectable()
export class AuthService {
  constructor(@InjectModel('Auth') private readonly authModel: Model<Auth>) {}

  async login(req) {
    try {
        console.log("hello")
      const { email, password } = req;
      const userExist = await this.authModel.findOne({ email: 'jaffer@gmail.com' });
      if (!userExist) {
        throw {
          responseCode: 404,
          message: 'User with this email doesnot exist',
        };
      }
      if (!bcrypt.compareSync('12345', userExist.hash))
        throw {
          responseCode: 400,
          message: 'Wrong password',
        };
      // const newUser = new this.authModel({ email, pass });
      const token = jwt.sign({ email: userExist.email }, 'secret', {
        expiresIn: '1d',
      });
      const user = {
        userExist,
        token,
      };
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async signup(req) {
    try {
      const uniqueMail = await this.authModel.findOne({ email: req.email });
      console.log("uniqueMail",uniqueMail);
      if (!uniqueMail) {
        req.hash = bcrypt.hashSync(req.password, 8);

        delete req.password;

        const newUser = new this.authModel(req);
        const userCreated = await this.authModel.create(newUser);
        const token = jwt.sign({ email: userCreated.email }, 'secret', {
          expiresIn: '1d',
        });
        const user = {
          userCreated,
          token,
        };
        return user;
      } else {
        throw {
          responseCode: 400,
          message: 'User with this email already exist',
        };
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
