import { CarImage } from "../infra/typeorm/entities/CarImage";

interface ICarsImagesDTO {
  car_id: string;
  image_name: string;
}

interface ICarsImagesRepository {
  create({ car_id, image_name }: ICarsImagesDTO): Promise<CarImage>;
}

export { ICarsImagesRepository, ICarsImagesDTO };
