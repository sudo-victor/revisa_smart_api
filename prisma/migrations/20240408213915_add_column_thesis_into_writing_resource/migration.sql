-- AlterEnum
ALTER TYPE "ResourceReferenceKind" ADD VALUE 'TV_SHOW';

-- AlterTable
ALTER TABLE "writing-resources" ADD COLUMN     "thesis" TEXT;
