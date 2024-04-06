import OpenAI from 'openai'; // Importa o SDK da OpenAI.

import { AiGateway } from "@/domain/essay/application/gateways/ai-gateway";

export class ChatptAiGateway implements AiGateway {
  private openai: OpenAI

  constructor() {
    this.openai = new OpenAI();
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