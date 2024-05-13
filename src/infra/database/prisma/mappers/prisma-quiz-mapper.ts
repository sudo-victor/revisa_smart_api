import { EntityId } from "@/core/domain/entity-id";
import { Question } from "@/domain/quiz/enterprise/entities/question";
import { Quiz } from "@/domain/quiz/enterprise/entities/quiz";
import { Quiz as PrismaQuiz, Question as PrismaQuestion } from "@prisma/client";

export abstract class PrismaQuizMapper {
  static toDomain(quiz: PrismaQuiz & { questions: PrismaQuestion[] }): Quiz {
    return Quiz.create({
      title: quiz.title,
      creator_id: new EntityId(quiz.creator_id),
      created_at: quiz.created_at,
      questions: quiz.questions.map((question) => {
        return Question.create({
          prompt: question.prompt,
          options: question.options,
          correct_answer: question.correct_answer,
          difficulty: question.difficulty,
        }, new EntityId(question.id))
      })
    }, new EntityId(quiz.id))
  }

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
          }))
        }
      }
    }
  }
}