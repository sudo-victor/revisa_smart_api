-- CreateTable
CREATE TABLE "api-key" (
    "id" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "secret" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "api-key_pkey" PRIMARY KEY ("id")
);
