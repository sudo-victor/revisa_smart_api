import { Optional } from "@/@types/optional";
import { Entity } from "@/core/domain/entity-base";
import { EntityId } from "@/core/domain/entity-id";

export interface StudentProps {
  fullname: string;
  email: string;
  cpf: string;
  phone: string;
  password: string;
  created_at: Date;
}

export class Student extends Entity<StudentProps> {
  get fullname() {
    return this.props.fullname
  }

  get email() {
    return this.props.email
  }

  get cpf() {
    return this.props.cpf
  }

  get phone() {
    return this.props.phone
  }

  get password() {
    return this.props.password
  }

  get createdAt() {
    return this.props.created_at
  }

  static create(props: Optional<StudentProps, 'created_at'>, id?: EntityId) {
    const student = new Student({
      ...props,
      created_at: new Date()
    }, id)
    return student
  }
}