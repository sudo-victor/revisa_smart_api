import { EntityId } from "@/core/domain/entity-id"
import { Category } from "../../enterprise/entities/category"
import { CategoryRepository } from "../repositories/category-repository"

export class CreateCategoryUsecase {

  constructor(
    private categoryRepository: CategoryRepository
  ) {}

  async execute(props: Input): Promise<Output> {
    const category = Category.create({
      name: props.name,
      description: props.description,
      parent_id: props.parent_id ? new EntityId(props.parent_id) : undefined
    })
    await this.categoryRepository.save(category)
    return {
      id: category.id.value
    }
  }
}

type Input = {
  name: string
  description?: string
  parent_id?: string
}

type Output = {
  id: string
}