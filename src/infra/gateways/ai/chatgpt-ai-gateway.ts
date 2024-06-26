import OpenAI from 'openai';

import { AiGateway } from "@/domain/essay/application/gateways/ai-gateway";
import { ResourceReferenceProps } from '@/domain/essay/enterprise/entities/resource-reference';

export class ChatptAiGateway implements AiGateway {
  private openai: OpenAI

  constructor() {
    this.openai = new OpenAI();
  }

  async adjustExtractedText(question: string): Promise<{ content: string; }> {
    const { choices } = await this.openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an educational assistant designed to help students enhance their essays for academic standards. Provide detailed, constructive feedback, identify exactly where errors are in the text, and offer clear, actionable suggestions for each identified issue. In addition, based on the specific criteria of the type of essay (e.g., ENEM), critically evaluate the essay and assign a score according to established standards, explaining the reasons for the scores for each criterion."
        },
        {
          role: "user",
          content: question
        },
      ],
      model: "gpt-4-0125-preview",
    });
    const result = choices[0]?.message.content ?? ""
    return { content: result }
  }

  async enhanceWritingResources(question: string): Promise<{ references: ResourceReferenceProps[]; }> {
    const { choices } = await this.openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are an educational assistant designed to help students enhance their essays for academic standards. Provide detailed, constructive feedback, identify exactly where errors are in the text, and offer clear, actionable suggestions for each identified issue. In addition, based on the specific criteria of the type of essay (e.g., ENEM), critically evaluate the essay and assign a score according to established standards, explaining the reasons for the scores for each criterion."
          },
          {
            role: "user",
            content: question
          },
        ],
        model: "gpt-4-0125-preview",
      });
      const result = this.parseAnswerToJson(choices[0]?.message.content ?? "{}")
      return { references: result }
  }

  async evaluateEssay(question: string): Promise<any> {
    const { choices } = await this.openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are an educational assistant designed to help students enhance their essays for academic standards. Provide detailed, constructive feedback, identify exactly where errors are in the text, and offer clear, actionable suggestions for each identified issue. In addition, based on the specific criteria of the type of essay (e.g., ENEM), critically evaluate the essay and assign a score according to established standards, explaining the reasons for the scores for each criterion."
          },
          {
            role: "user",
            content: question
          },
        ],
        model: "gpt-4-0125-preview",
      });
    
      const result = this.parseAnswerToJson(choices[0]?.message.content ?? "{}")
      return result
  }

  private parseAnswerToJson(answer: string) {
    return JSON.parse(
      answer
        .replace("json", "")
        .replaceAll("```", "")
    )
  }
}