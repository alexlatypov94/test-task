export class UserQueryParams {
  page: number;
  limit: number;
  name?: string;

  constructor(page: string, limit: string, name?: string) {
    this.page = parseInt(page) || 1;
    this.limit = parseInt(limit) || 10;
    this.name = name;
  }
}

export class NewUserReqDataDto {
  name: string;
  email: string;
  idNumber: number;
  phone: string;
  ip: string;

  constructor(data: any) {
    this.name = data.name;
    this.email = data.email;
    this.idNumber = data.idNumber;
    this.phone = data.phone;
    this.ip = data.ip;
  }
}

export class NewUserDto extends NewUserReqDataDto {
  country: string | null;
  city: string | null;

  constructor(data: any) {
    super(data);
    this.city = data?.city || null;
    this.country = data?.country || null;
  }
}

export class NewUserResDto extends NewUserDto {
  '_id': string;

  constructor(data: any) {
    super(data);
    this._id = data._id;
  }
}
