/*
  Warnings:

  - A unique constraint covering the columns `[teacherId,disciplineId]` on the table `teachers_disciplines` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "teachers_disciplines_teacherId_disciplineId_key" ON "teachers_disciplines"("teacherId", "disciplineId");
