import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able to list all available cars", async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: "Car 1",
      description: "Car 1 description",
      daily_rate: 180.0,
      license_plate: "AAA-8080",
      fine_amount: 130,
      brand: "Honda",
      category_id: "category_id",
    });

    const car2 = await carsRepositoryInMemory.create({
      name: "Car 2",
      description: "Car 2 description",
      daily_rate: 180.0,
      license_plate: "BBB-8080",
      fine_amount: 130,
      brand: "Honda",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute();

    expect(cars).toEqual([car1, car2]);
  });

  it("should be able to list all available cars by brand", async () => {
    await carsRepositoryInMemory.create({
      name: "Car 1",
      description: "Car 1 description",
      daily_rate: 180.0,
      license_plate: "AAA-8080",
      fine_amount: 130,
      brand: "Honda",
      category_id: "category_id",
    });

    const car2 = await carsRepositoryInMemory.create({
      name: "Car 2",
      description: "Car 2 description",
      daily_rate: 180.0,
      license_plate: "BBB-8080",
      fine_amount: 130,
      brand: "Chevrolet",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({ brand: "Chevrolet" });

    expect(cars).toEqual([car2]);
  });

  it("should be able to list all available cars by name", async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: "Car 1",
      description: "Car 1 description",
      daily_rate: 180.0,
      license_plate: "AAA-8080",
      fine_amount: 130,
      brand: "Honda",
      category_id: "category_id",
    });

    await carsRepositoryInMemory.create({
      name: "Car 2",
      description: "Car 2 description",
      daily_rate: 180.0,
      license_plate: "BBB-8080",
      fine_amount: 130,
      brand: "Chevrolet",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({ name: "Car 1" });

    expect(cars).toEqual([car1]);
  });

  it("should be able to list all available cars by category", async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: "Car 1",
      description: "Car 1 description",
      daily_rate: 180.0,
      license_plate: "AAA-8080",
      fine_amount: 130,
      brand: "Honda",
      category_id: "category_id",
    });

    const car2 = await carsRepositoryInMemory.create({
      name: "Car 2",
      description: "Car 2 description",
      daily_rate: 180.0,
      license_plate: "BBB-8080",
      fine_amount: 130,
      brand: "Chevrolet",
      category_id: "category_id",
    });

    await carsRepositoryInMemory.create({
      name: "Car 3",
      description: "Car 3 description",
      daily_rate: 10.0,
      license_plate: "TTT-7070",
      fine_amount: 1,
      brand: "AAAA",
      category_id: "cat",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "category_id",
    });

    expect(cars).toEqual([car1, car2]);
  });
});
