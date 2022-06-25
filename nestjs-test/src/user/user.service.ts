import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  private user: User[] = [];

  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async register(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async getUsers(): Promise<User[]> {
    let users: User[] | PromiseLike<User[]>;

    try {
      users = await this.userModel.find().exec();
    } catch (error) {
      throw new NotFoundException('Failed to retrieve user(s) list.');
    }

    if (!users) {
      throw new NotFoundException('User list is empty.');
    }

    return users;
  }

  async getUserById(id: string): Promise<User> {
    let user: User | PromiseLike<User>;

    try {
      user = await this.userModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Failed to get user.');
    }

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }

  async update(id: string, user: User): Promise<User> {
    try {
      user = await this.userModel.findByIdAndUpdate(id, user, {new: true});
    } catch (error) {
      throw new NotFoundException('Failed to update user.');
    }

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }

  async delete(id: string): Promise<any> {
    let user: User | PromiseLike<User>;

    try {
      user = await this.userModel.findByIdAndRemove(id);
    } catch (error) {
      throw new NotFoundException('Failed to delete user.');
    }

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }
}
