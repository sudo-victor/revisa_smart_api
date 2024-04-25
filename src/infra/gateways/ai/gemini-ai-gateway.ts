import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios"

import { AiGateway } from "@/domain/essay/application/gateways/ai-gateway";
import { EssayAssessmentCreate } from "@/domain/essay/enterprise/entities/essay-assessment";
import { ResourceReferenceProps } from "@/domain/essay/enterprise/entities/resource-reference";
import { File } from "@/domain/quiz/enterprise/entities/file";

export class GeminiAiGateway implements AiGateway {
  model: GenerativeModel
  genAI: GoogleGenerativeAI

  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_kEY as string);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-pro-vision" });
  }

  async generateQuiz(question: string, file: File): Promise<any> {
    const url = `${process.env.AWS_BUCKET_URL}${file.filename}`
    const responseFile = await axios.get(url, { responseType: "arraybuffer" });
    const data = Buffer.from(responseFile.data).toString('base64');
    const result = await this.model.generateContent([
      question,
      this.fileToGenerativePart(data, file.mimetype),
    ]);
    const response = result.response.text();
    return this.parseAnswerToJson(response)
  }

  async evaluateEssay(question: string): Promise<{ essay_assessment: EssayAssessmentCreate; }> {
    const result = await this.model.generateContent(question);
    const response = result.response.text();
    return this.parseAnswerToJson(response)
  }

  enhanceWritingResources(question: string): Promise<{ references: ResourceReferenceProps[]; }> {
    throw new Error("Method not implemented.");
  }

  adjustExtractedText(question: string): Promise<{ content: string; }> {
    throw new Error("Method not implemented.");
  }

  private parseAnswerToJson(answer: string) {
    return JSON.parse(
      answer
        .replace("json", "")
        .replaceAll("```", "")
    )
  }

  private fileToGenerativePart(data: string, mimeType: string) {
    return {
      inlineData: {
        data,
        mimeType
      },
    };
  }
}