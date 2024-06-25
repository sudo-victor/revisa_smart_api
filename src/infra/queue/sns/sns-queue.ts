import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";
import { env } from "@/infra/env";
import { Queue } from "@/domain/essay/application/queue/queue";

export class SNSQueue extends Queue {
  private static instance: SNSQueue | null = null;
  private snsClient: SNSClient;
  private topicArn: string;

  private constructor() {
    super();
    const isLocal = env.ENV === 'dev';
    this.snsClient = new SNSClient({
      region: env.AWS_REGION,
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY as string,
        secretAccessKey: env.AWS_SECRET_KEY as string,
      },
      endpoint: isLocal ? env.AWS_ENDPOINT : undefined,
    });
    this.topicArn = `arn:aws:sns:${env.AWS_REGION}:${isLocal ? '000000000000' : env.AWS_ACCOUNT_ID}:GenerateQuizFromFileEvent`;
  }

  static getInstance(): SNSQueue {
    if (!this.instance) {
      this.instance = new SNSQueue();
    }
    return this.instance;
  }

  async publish(name: string, data: any): Promise<void> {
    const params = {
      TopicArn: this.topicArn,
      Message: JSON.stringify(data),
    };

    try {
      const command = new PublishCommand(params);
      const response = await this.snsClient.send(command);
      console.log("Mensagem publicada com sucesso:", response.MessageId);
    } catch (error) {
      console.error("Erro ao publicar mensagem:", error);
      if (error.$response) {
        console.error("Resposta bruta do erro:", error.$response);
      }
    }
  }

  async consume(name: string, callback: Function): Promise<void> {
    console.warn("SNS não suporta consumo direto de mensagens.");
  }
}
