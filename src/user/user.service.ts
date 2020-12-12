import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from '../auth/auth.model';
@Injectable()
export class UserService {
  constructor(@InjectModel('Auth') private readonly userModel: Model<Auth>) {}

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async getAllUsers(){
    try {
        console.log("here")
      const users = await this.userModel.find().exec();
      console.log("found users",users)
      if (users.length !== 0) {
        return users;
      } else {
        throw { statusCode: 404, message: 'No users found!' };
      }
    } catch (error) {
      throw error;
    }
  }
}
