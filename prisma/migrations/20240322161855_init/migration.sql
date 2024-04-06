-- CreateTable
CREATE TABLE "essay-assessments" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "total_score" INTEGER NOT NULL,

    CONSTRAINT "essay-assessments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "competences" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "score_achieved" INTEGER NOT NULL,
    "possible_score" INTEGER NOT NULL,
    "essay_assessment_id" INTEGER NOT NULL,

    CONSTRAINT "competences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "suggestions" (
    "id" SERIAL NOT NULL,
    "kind" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "tip" TEXT NOT NULL,
    "competence_id" INTEGER NOT NULL,

    CONSTRAINT "suggestions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "competences" ADD CONSTRAINT "competences_essay_assessment_id_fkey" FOREIGN KEY ("essay_assessment_id") REFERENCES "essay-assessments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "suggestions" ADD CONSTRAINT "suggestions_competence_id_fkey" FOREIGN KEY ("competence_id") REFERENCES "competences"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
