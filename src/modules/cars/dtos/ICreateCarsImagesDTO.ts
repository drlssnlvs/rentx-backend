export interface IFiles {
  filename: string;
  path: string;
}

export interface ICreateCarsImagesDTO {
  carId: string;
  carImageId?: string;
  carImageSrc?: string;
  images?: IFiles[];
}
