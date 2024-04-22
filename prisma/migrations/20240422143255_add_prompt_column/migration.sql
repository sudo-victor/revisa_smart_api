/*
  Warnings:

  - Added the required column `prompt` to the `questions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "questions" ADD COLUMN     "prompt" TEXT NOT NULL;
