export class FilenameService {
  static generate(mimetype: string) {
    return new Date().getTime()  + "." + mimetype.split("/")[1]
  }

  static toS3Url(filename: string) {
    return `${process.env.AWS_BUCKET_URL}${filename}`
  }
}