import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";

import { AiGateway } from "@/domain/essay/application/gateways/ai-gateway";
import { EssayAssessmentCreate } from "@/domain/essay/enterprise/entities/essay-assessment";
import { ResourceReferenceProps } from "@/domain/essay/enterprise/entities/resource-reference";

export class GeminiAiGateway implements AiGateway {
  model: GenerativeModel

  constructor() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_kEY as string);
    this.model = genAI.getGenerativeModel({ model: "gemini-pro" });
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
}