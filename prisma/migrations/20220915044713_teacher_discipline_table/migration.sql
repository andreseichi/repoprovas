-- CreateTable
CREATE TABLE "teachers_disciplines" (
    "id" SERIAL NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "disciplineId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "teachers_disciplines_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "teachers_disciplines" ADD CONSTRAINT "teachers_disciplines_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachers_disciplines" ADD CONSTRAINT "teachers_disciplines_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "disciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
