import { Storage } from "@/domain/essay/application/storage/storage";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"

export class S3Storage implements Storage {
  s3: S3Client
  
  constructor() {
    this.s3 = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY as string,
        secretAccessKey: process.env.AWS_SECRET_KEY as string,
      }
    })
  }

  async get(params: { filename: string; }): Promise<any> {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME as string,
      Key: params.filename,
      
    });
    const { Body } = await this.s3.send(command);
    return Body
  }

  async upload(params: { filename: string, mimetype: string; content: Buffer; }): Promise<any> {
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME as string,
      Key: params.filename,
      Body: params.content,
      ContentType: params.mimetype,
    })
    const response = await this.s3.send(command)
    return response
  }
}