-- DropForeignKey
ALTER TABLE "essay-assessments" DROP CONSTRAINT "essay-assessments_topic_id_fkey";

-- AlterTable
ALTER TABLE "essay-assessments" ALTER COLUMN "topic_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "essay-assessments" ADD CONSTRAINT "essay-assessments_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topics"("id") ON DELETE SET NULL ON UPDATE CASCADE;
