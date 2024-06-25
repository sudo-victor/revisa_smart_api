import { Queue } from "@/domain/essay/application/queue/queue";
import { env } from "@/infra/env";
import { SQSClient, SendMessageCommand, ReceiveMessageCommand, DeleteMessageCommand } from "@aws-sdk/client-sqs";

export class SQSQueue implements Queue {
  private static instance: SQSQueue | null = null;
  private sqsClient: SQSClient;
  private queueUrl: string;

  private constructor() {
    const isLocal = env.ENV === 'dev';
    this.sqsClient = new SQSClient({
      region: env.AWS_REGION,
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY as string,
        secretAccessKey: env.AWS_SECRET_KEY as string,
      },
      endpoint: isLocal ? env.AWS_ENDPOINT : undefined,
    });
    this.queueUrl = `${isLocal ? `${env.AWS_ENDPOINT}/000000000000` : `https://sqs.${env.AWS_REGION}.amazonaws.com`}/${env.AWS_QUEUE_NAME}`;
  }

  static getInstance(): SQSQueue {
    if (!this.instance) {
      this.instance = new SQSQueue();
    }
    return this.instance;
  }

  async consume(name: string, callback: any): Promise<void> {
    const params = {
      QueueUrl: this.queueUrl,
      MaxNumberOfMessages: 10,
    };

    const receiveMessages = async () => {
      try {
        const data = await this.sqsClient.send(new ReceiveMessageCommand(params));
        if (data.Messages) {
          for (const message of data.Messages) {
            await callback(JSON.parse(JSON.parse(message.Body as string).Message));
            await this.sqsClient.send(new DeleteMessageCommand({
              QueueUrl: this.queueUrl,
              ReceiptHandle: message.ReceiptHandle!,
            }));
          }
        }
      } catch (error) {
        console.error("Erro ao receber mensagens:", error);
        if (error.$response) {
          console.error("Resposta bruta do erro:", error.$response);
        }
      }
    };

    setInterval(receiveMessages, 5000);
  }

  async publish(name: string, data: string): Promise<void> {
    const params = {
      QueueUrl: this.queueUrl,
      MessageBody: data,
    };

    try {
      const command = new SendMessageCommand(params);
      const response = await this.sqsClient.send(command);
      console.log("Mensagem enviada com sucesso:", response.MessageId);
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      if (error.$response) {
        console.error("Resposta bruta do erro:", error.$response);
      }
    }
  }
}