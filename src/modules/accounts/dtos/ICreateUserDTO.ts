export interface IcreateUserDTO {
  id?: string;

  name: string;

  email: string;

  password: string;

  driverLicense: string;

  admin?: boolean;

  createdAt?: Date;

  updatedAt?: Date;
}
