export interface UserInterface {
  city: string;
  country: string;
  email: string;
  idNumber: 640928958;
  ip: string;
  name: string;
  phone: string;
}

export interface UserResponse {
  users: UserInterface[];
  totalUsers: number;
}
