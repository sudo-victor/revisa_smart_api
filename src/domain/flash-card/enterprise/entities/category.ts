import { Entity } from "@/core/domain/entity-base";
import { EntityId } from "@/core/domain/entity-id";

export interface CategoryProps {
  name: string;
  description?: string;
  parent_id?: EntityId;
}

export class Category extends Entity<CategoryProps> {
  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  get parentId() {
    return this.props.parent_id;
  }

  static create(props: CategoryProps, id?: EntityId) {
    const categoryId = id ?? new EntityId();
    const category = new Category(props, categoryId);
    return category;
  }
}
