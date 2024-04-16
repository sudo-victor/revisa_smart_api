export abstract class Storage {
  abstract upload(params: { filename: string, mimetype: string, content: Buffer }): Promise<any>
  abstract get(params: { filename: string }): Promise<any>
}