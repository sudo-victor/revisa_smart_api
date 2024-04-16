-- CreateTable
CREATE TABLE "text-capture-records" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "content" TEXT,
    "photo_path" TEXT,

    CONSTRAINT "text-capture-records_pkey" PRIMARY KEY ("id")
);
