import { Quiz } from "@/domain/quiz/enterprise/entities/quiz";
import { Quiz as PrismaQuiz } from "@prisma/client";

export abstract class PrismaQuizMapper {
  static toPrisma(quiz: Quiz): PrismaQuiz & { questions: any } {
    return {
      id: quiz.id.value,
      title: quiz.title,
      creator_id: quiz.creatorId.value,
      created_at: quiz.createdAt,
      questions: {
        createMany: {
          data: quiz.questions.map((question) => ({
            id: question.id.value,
            prompt: question.prompt,
            options: question.options,
            correct_answer: question.correctAnswer,
            difficulty: question.difficulty,
            quiz_id: quiz.id.value
          }))
        }
      }
    }
  }
}