import { Optional } from "@/@types/optional";
import { Entity } from "@/core/domain/entity-base";
import { EntityId } from "@/core/domain/entity-id";
import { FilenameService } from "@/domain/essay/enterprise/services/filename-service";

export interface FileProps {
  filename: string
  mimetype: string
}

export class File extends Entity<FileProps> {
  get filename() {
    return this.props.filename
  }

  get mimetype() {
    return this.props.mimetype
  }

  static create(props: Optional<FileProps, 'filename'>, id?: EntityId) {
    const file = new File({
      filename: props.filename ?? FilenameService.generate(props.mimetype),
      ...props
    }, id)
    return file
  }
}