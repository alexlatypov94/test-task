import { NewUserReqDataDto } from '../dto/users.dto';
import UserRepo from '../repository/user';
import { PaginationReqQuery } from '../types/types';
import CustomError from '../utils/CustomError';
import { validateIsraeliID } from '../utils/israelIdValidator';

export default class UserService {
  static async getUsers({ page, limit, name }: PaginationReqQuery) {
    try {
      const offset = (page - 1) * limit;
      const users = await UserRepo.getAllUsers({ limit, offset, name });

      return users;
    } catch (error) {
      throw error;
    }
  }
  static async getUserById(idNumber: number) {
    try {
      if (!validateIsraeliID(idNumber))
        throw new CustomError('Israel ID is not valid', 400);

      const user = await UserRepo.getUserById(idNumber);

      return user;
    } catch (error) {
      throw error;
    }
  }
  static async createUser(newUserData: NewUserReqDataDto) {
    try {
      if (!validateIsraeliID(newUserData.idNumber))
        throw new CustomError('Israel ID is not valid', 400);

      const user = await UserRepo.getUserById(newUserData.idNumber);

      if (user) throw new CustomError('This user already exist', 404);

      const { city, country } = await this.getCountryInfoByIp(newUserData.ip);

      const newUser = await UserRepo.createUser({
        ...newUserData,
        city,
        country,
      });
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  static async deleteUser(idNumber: number) {
    try {
      if (!validateIsraeliID(idNumber))
        throw new CustomError('Israel ID is not valid', 400);

      const user = await UserRepo.getUserById(idNumber);

      if (!user) throw new CustomError('User not found', 404);

      await UserRepo.deleteUser(idNumber);
    } catch (error) {
      throw error;
    }
  }

  static async getCountryInfoByIp(ip: string) {
    try {
      const resIpInfo = await fetch(`http://ip-api.com/json/${ip}`);
      const { country, city } = await resIpInfo.json();

      return { country, city };
    } catch (error) {
      throw new CustomError('Error while getting country info', 500);
    }
  }
}
