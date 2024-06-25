import axios, { AxiosResponse } from 'axios';
import { UserResponse } from '../interfaces/UserInterface';

const baseUrl = 'http://localhost:3001/api/users';

export default class Api {
  public static async getIPAdress() {
    return axios({ method: 'GET', url: 'https://api.ipify.org?format=json' });
  }

  public static async createUser(data: any) {
    return axios({ method: 'POST', url: baseUrl, data });
  }

  public static async getUsers({
    page,
    limit,
    name,
  }: {
    page: number;
    limit: number;
    name: string;
  }): Promise<AxiosResponse<UserResponse, any>> {
    return axios({
      method: 'GET',
      url: baseUrl,
      params: {
        page,
        limit,
        name,
      },
    });
  }

  public static async deleteUser({ id }: { id: number }) {
    return axios({ method: 'DELETE', url: `${baseUrl}/${id}` });
  }
}
