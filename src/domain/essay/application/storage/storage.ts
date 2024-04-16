export abstract class Storage {
  abstract upload(params: { filename: string, mimetype: string, content: Buffer }): Promise<any>
}