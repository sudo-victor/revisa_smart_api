/*
  Warnings:

  - You are about to drop the column `file_path` on the `quiz-requests` table. All the data in the column will be lost.
  - You are about to drop the column `photo_path` on the `text-capture-records` table. All the data in the column will be lost.
  - Added the required column `file_id` to the `quiz-requests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `file_id` to the `text-capture-records` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "quiz-requests" DROP COLUMN "file_path",
ADD COLUMN     "file_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "text-capture-records" DROP COLUMN "photo_path",
ADD COLUMN     "file_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "files" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "text-capture-records" ADD CONSTRAINT "text-capture-records_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz-requests" ADD CONSTRAINT "quiz-requests_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
