export interface Test {
  id: number;
  name: string;
  pdfUrl: string;
  category: string;
  disciplineId: number;
  teacherId: number;
  createdAt: Date;
  updatedAt?: Date;
}

export interface TestData {
  name: string;
  pdfUrl: string;
  category: string;
  disciplineId: number;
  teacherId: number;
}

export interface TestInsertData {
  name: string;
  pdfUrl: string;
  categoryId: number;
  teacherDisciplineId: number;
}
