export interface ICreateUserDTO {
  id?: string;

  name: string;

  email: string;

  password: string;

  driverLicense: string;

  admin?: boolean;

  createdAt?: Date;

  updatedAt?: Date;
}

export interface ICreateSessionDTO {
  email: string;

  password: string;
}
