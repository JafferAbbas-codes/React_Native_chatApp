import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app.gateways';
import { AuthModule } from './auth/auth.module';

import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
