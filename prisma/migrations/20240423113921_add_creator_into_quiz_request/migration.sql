/*
  Warnings:

  - Added the required column `creator_id` to the `quiz-requests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "quiz-requests" ADD COLUMN     "creator_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "quiz-requests" ADD CONSTRAINT "quiz-requests_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
