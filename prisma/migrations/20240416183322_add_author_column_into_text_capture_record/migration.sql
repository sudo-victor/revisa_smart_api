-- AlterTable
ALTER TABLE "text-capture-records" ADD COLUMN     "author_id" TEXT;

-- AddForeignKey
ALTER TABLE "text-capture-records" ADD CONSTRAINT "text-capture-records_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
