-- DropForeignKey
ALTER TABLE "quiz-requests" DROP CONSTRAINT "quiz-requests_quiz_id_fkey";

-- AlterTable
ALTER TABLE "quiz-requests" ALTER COLUMN "quiz_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "quiz-requests" ADD CONSTRAINT "quiz-requests_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "quizzes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
