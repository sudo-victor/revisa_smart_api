-- CreateTable
CREATE TABLE "quiz-requests" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "file_path" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quiz_id" TEXT NOT NULL,

    CONSTRAINT "quiz-requests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "quiz-requests" ADD CONSTRAINT "quiz-requests_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "quizzes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
