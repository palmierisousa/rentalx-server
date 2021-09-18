import { getRepository, Repository } from "typeorm";

import {
  ICarsImagesDTO,
  ICarsImagesRepository,
} from "@modules/cars/repositories/ICarsImagesRepository";

import { CarImage } from "../entities/CarImage";

class CarsImagesRepository implements ICarsImagesRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }

  create({ car_id, image_name }: ICarsImagesDTO): Promise<CarImage> {
    const carImage = this.repository.create({
      car_id,
      image_name,
    });

    return this.repository.save(carImage);
  }
}

export { CarsImagesRepository };
