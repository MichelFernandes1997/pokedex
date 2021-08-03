import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    const user = await new this.userModel(createUserDto);

    return await user.save();
  }

  async findAll() {
    return await this.userModel.find({}, { _id: 1, nickname: 1 });
  }

  async findOne(id: string) {
    return await this.userModel.findById(id);
  }

  async findByMail(mail: string) {
    return await this.userModel.findOne({ mail }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: updateUserDto,
      },
      {
        new: true,
      },
    );
  }

  async remove(id: string) {
    return await this.userModel
      .deleteOne({
        _id: id,
      })
      .exec();
  }
}
