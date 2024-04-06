import { Category } from "../../enterprise/entities/category";

export abstract class CategoryRepository {
  abstract save(category: Category): Promise<void>
}