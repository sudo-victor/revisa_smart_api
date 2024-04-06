/*
  Warnings:

  - The primary key for the `competences` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `essay-assessments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `suggestions` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "competences" DROP CONSTRAINT "competences_essay_assessment_id_fkey";

-- DropForeignKey
ALTER TABLE "suggestions" DROP CONSTRAINT "suggestions_competence_id_fkey";

-- AlterTable
ALTER TABLE "competences" DROP CONSTRAINT "competences_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "essay_assessment_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "competences_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "competences_id_seq";

-- AlterTable
ALTER TABLE "essay-assessments" DROP CONSTRAINT "essay-assessments_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "essay-assessments_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "essay-assessments_id_seq";

-- AlterTable
ALTER TABLE "suggestions" DROP CONSTRAINT "suggestions_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "competence_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "suggestions_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "suggestions_id_seq";

-- AddForeignKey
ALTER TABLE "competences" ADD CONSTRAINT "competences_essay_assessment_id_fkey" FOREIGN KEY ("essay_assessment_id") REFERENCES "essay-assessments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "suggestions" ADD CONSTRAINT "suggestions_competence_id_fkey" FOREIGN KEY ("competence_id") REFERENCES "competences"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
