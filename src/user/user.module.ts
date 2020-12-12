import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthSchema } from '../auth/auth.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Auth', schema: AuthSchema }])],

  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
