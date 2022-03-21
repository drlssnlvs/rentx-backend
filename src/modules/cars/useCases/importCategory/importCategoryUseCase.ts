import csvParser from "csv-parse";
import fs from "fs";

import CategoryRepository from "../../repositories/implementations/categoriesRepository";

interface ICategory {
  name: string;
  description: string;
}

export default class CraeteSpceificationService {
  constructor(private categoryRepository: CategoryRepository) {}

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
        .on("end", () => resolve(categories))
        .on("error", (err) => reject(err));
    });
  }

  async execute(file: any): Promise<void> {
    const categories: any = await this.loadCategories(file);

    categories.map(async ({ name, description }: ICategory) => {
      const checkIfCategoryAlreadyRegister =
        this.categoryRepository.findByName(name);

      if (!checkIfCategoryAlreadyRegister) {
        this.categoryRepository.create({ name, description });
      }
    });
  }
}
