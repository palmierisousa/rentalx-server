import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createSpecificationUseCase = container.resolve(
      CreateSpecificationUseCase
    );

    // FIXME improve error catch
    try {
      await createSpecificationUseCase.execute({ name, description });

      return response.status(201).send();
    } catch (error) {
      return response.status(500).send({ error: error.message });
    }
  }
}

export { CreateSpecificationController };
