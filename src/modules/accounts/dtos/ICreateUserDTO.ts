export interface ICreateUserDTO {
  id?: string;

  name: string;

  email: string;

  password: string;

  driverLicense: string;

  admin?: boolean;

  avatarId?: string;

  avatarSrc?: string;

  createdAt?: Date;

  updatedAt?: Date;
}

export interface ICreateSessionDTO {
  email: string;

  password: string;
}

export interface IUpdateAvatar {
  avatarId: string;
  avatarSrc: string;
}
