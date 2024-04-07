-- CreateEnum
CREATE TYPE "ResourceReferenceKind" AS ENUM ('QUOTE', 'BOOK', 'MOVIE', 'HISTORICAL_FACT');

-- CreateTable
CREATE TABLE "writing-resources" (
    "id" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "writing-resources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resource-references" (
    "id" TEXT NOT NULL,
    "kind" "ResourceReferenceKind" NOT NULL,
    "title" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "writing_resource_id" TEXT NOT NULL,

    CONSTRAINT "resource-references_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "writing-resources" ADD CONSTRAINT "writing-resources_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resource-references" ADD CONSTRAINT "resource-references_writing_resource_id_fkey" FOREIGN KEY ("writing_resource_id") REFERENCES "writing-resources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
