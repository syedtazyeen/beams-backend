// src/users/users.service.ts
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongoError } from 'mongodb';
import { Model } from 'mongoose';
import { IPropUser, User } from 'src/mongoose/models/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email : email }).exec();
  }

  async findById(id: string): Promise<User | undefined> {
    return this.userModel.findById(id).exec();
  }
  async create(user: IPropUser): Promise<User> {
    const createdUser = new this.userModel(user);
    try {
      return await createdUser.save();
    } catch (error) {
      if (error instanceof MongoError && error.code === 11000) {
        throw new ConflictException('Username or email already exists.');
      }
      throw error; 
    }
  }

  async update(id: string, user: IPropUser): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();
  }

  async delete(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
