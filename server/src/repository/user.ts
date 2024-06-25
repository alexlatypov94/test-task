import { QueryParams } from '../types/types';
import UserModel from '../models/User';
import { NewUserDto, NewUserResDto } from '../dto/users.dto';

export default class UserRepo {
  static async getAllUsers({ limit, offset, name }: QueryParams) {
    try {
      console.log(name);
      const users = await UserModel.find({ name: new RegExp(name ?? '', 'i') })
        .skip(offset)
        .limit(limit);
      const totalUsers = await UserModel.countDocuments({
        name: new RegExp(name ?? '', 'i'),
      });

      return {
        users: users.map((user) => new NewUserResDto(user)),
        totalUsers,
      };
    } catch (error) {
      throw new Error('Error while getting all users');
    }
  }

  static async getUserById(idNumber: number) {
    try {
      const user = await UserModel.findOne({ idNumber });

      return user;
    } catch (error) {
      throw new Error('Error while getting user by id');
    }
  }

  static async createUser(newUserData: NewUserDto) {
    try {
      const newUser = await new UserModel(newUserData).save();

      return new NewUserResDto(newUser);
    } catch (error) {
      throw new Error('Error while getting user by id');
    }
  }

  static async deleteUser(idNumber: number) {
    try {
      await UserModel.deleteOne({ idNumber });
    } catch (error) {
      throw new Error('Error while getting user by id');
    }
  }
}
