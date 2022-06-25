import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { User, UserSchema } from './user/user.schema';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://username:password@cluster0.rfho1.mongodb.net/User?retryWrites=true&w=majority'),
            MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
