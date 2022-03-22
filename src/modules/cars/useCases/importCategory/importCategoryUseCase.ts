import csvParser from "csv-parse";
import fs from "fs";

import CategoriesRepository from "../../repositories/implementations/CategoriesRepository";

interface ICategory {
  name: string;
  description: string;
}

export default class CraeteSpceificationService {
  constructor(private categoriesRepository: CategoriesRepository) {}

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
        .on("end", () => {
          fs.promises.unlink(file.path);
          return resolve(categories);
        })
        .on("error", (err) => reject(err));
    });
  }

  async execute(file: any): Promise<void> {
    const categories: any = await this.loadCategories(file);

    categories.map(async ({ name, description }: ICategory) => {
      const checkIfCategoryAlreadyRegister =
        this.categoriesRepository.findByName(name);

      if (!checkIfCategoryAlreadyRegister) {
        this.categoriesRepository.create({ name, description });
      }
    });
  }
}
