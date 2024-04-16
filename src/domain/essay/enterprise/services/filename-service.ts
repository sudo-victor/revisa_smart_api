export class FilenameService {
  static generate(mimetype: string) {
    return new Date().getTime()  + "." + mimetype.split("/")[1]
  }
}