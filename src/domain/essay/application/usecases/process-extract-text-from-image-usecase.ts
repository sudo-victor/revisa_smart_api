import { createWorker } from "tesseract.js";
import { TextCaptureRecordRepository } from "../repositories/text-capture-record-repository"
import { AiTemplateService } from "../../enterprise/services/ai-template-service";
import { AiGateway } from "../gateways/ai-gateway";
import { sleep } from "@/core/utils/sleep";

export class ProcessExtractTextFromImageUsecase {
  constructor(
    private textCaptureRecordRepository: TextCaptureRecordRepository,
    private aiGateway: AiGateway
  ) {}

  async execute(props: Input): Promise<Output> {
    console.log(`Start extract text: `, props)
    await sleep(500)
    const textCaptureRecord = await this.textCaptureRecordRepository.getById(props.id)
    if (!textCaptureRecord) throw new Error('TextCaptureRecord not found')
    const worker = await createWorker('eng');
    const { data: { text: content }} = await worker.recognize(props.image_buffer);
    await worker.terminate();
    const question = AiTemplateService.getAdjustExtractedTextQuestion({ content });
    const answer = await this.aiGateway.adjustExtractedText(question);
    textCaptureRecord.putContent(answer.content);
    await this.textCaptureRecordRepository.save(textCaptureRecord);
    console.log(`Finish process to extract text`)
    return {};
  }
}

export type Input = {
  id: string,
  image_buffer: Buffer
}

export type Output = {}