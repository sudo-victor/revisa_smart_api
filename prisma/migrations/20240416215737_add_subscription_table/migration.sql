-- CreateTable
CREATE TABLE "subscriptions" (
    "id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "sub_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "gateway" TEXT NOT NULL,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
