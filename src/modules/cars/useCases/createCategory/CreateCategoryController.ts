import "reflect-metadata";
import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createCategoryUseCase = container.resolve(CreateCategoryUseCase);
    // FIXME improve error catch
    try {
      await createCategoryUseCase.execute({ name, description });

      return response.status(201).send();
    } catch (error) {
      return response.status(500).send({ error: error.message });
    }
  }
}

export { CreateCategoryController };
