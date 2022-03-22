import csvParser from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import BaseUseCase from "@shared/commons/BaseUseCase";
import { files } from "@shared/commons/constants";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface ICategory {
  name: string;
  description: string;
}

@injectable()
export default class CraeteSpceificationService extends BaseUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {
    super();
  }

  loadCategories(file: any) {
    return new Promise((resolve, reject) => {
      const categories: ICategory[] = [];

      const stream = fs.createReadStream(file.path);

      const parserFile = csvParser();

      stream.pipe(parserFile);

      parserFile
        .on("data", (line) =>
          categories.push({ name: line[0], description: line[1] })
        )
        .on("end", async () => {
          await files.delete(file.path);
          return resolve(categories);
        })
        .on("error", (err) => reject(err));
    });
  }

  async execute(file: any): Promise<boolean> {
    const categories: any = await this.loadCategories(file);

    categories.map(async ({ name, description }: ICategory) => {
      const checkIfCategoryAlreadyRegister =
        this.categoriesRepository.findByName(name);

      if (!checkIfCategoryAlreadyRegister) {
        this.categoriesRepository.create({ name, description });
      }
    });

    return true;
  }
}
