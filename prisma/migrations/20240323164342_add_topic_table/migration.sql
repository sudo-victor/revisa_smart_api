/*
  Warnings:

  - Added the required column `topic_id` to the `essay-assessments` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ExamKind" AS ENUM ('ENEM', 'PUC', 'UERJ');

-- AlterTable
ALTER TABLE "essay-assessments" ADD COLUMN     "topic_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "topics" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "was_used_in_exam" BOOLEAN NOT NULL,
    "exam_kind" "ExamKind" NOT NULL,

    CONSTRAINT "topics_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "essay-assessments" ADD CONSTRAINT "essay-assessments_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
